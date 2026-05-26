const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const db = require('../config/db');

const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_DAYS = 7;

const hashRefreshToken = (refreshToken) => {
    return crypto
        .createHash('sha256')
        .update(refreshToken)
        .digest('hex');
};

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            userId: user.user_id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRES_IN
        }
    );
};

const generateRefreshToken = () => {
    return crypto.randomBytes(64).toString('hex');
};

const storeRefreshToken = async (userId, refreshToken) => {
    const tokenHash = hashRefreshToken(refreshToken);

    await db.query(
        `
        INSERT INTO refresh_tokens (
            user_id,
            token_hash,
            expires_at
        )
        VALUES (?, ?, DATE_ADD(NOW(), INTERVAL ? DAY))
        `,
        [userId, tokenHash, REFRESH_TOKEN_DAYS]
    );
};

const registerUser = async ({ name, email, password }) => {
    const [existingUsers] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );

    if (existingUsers.length > 0) {
        const error = new Error('User already exists');
        error.statusCode = 400;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
        `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
        `,
        [name, email, hashedPassword]
    );

    return {
        userId: result.insertId
    };
};

const loginUser = async ({ email, password }) => {
    const [users] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );

    if (users.length === 0) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        throw error;
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        throw error;
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();

    await storeRefreshToken(user.user_id, refreshToken);

    return {
        accessToken,
        refreshToken,
        user: {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

const refreshAccessToken = async (refreshToken) => {
    const tokenHash = hashRefreshToken(refreshToken);

    const [tokens] = await db.query(
        `
        SELECT
            refresh_tokens.refresh_token_id,
            refresh_tokens.user_id,
            users.user_id,
            users.name,
            users.email,
            users.role
        FROM refresh_tokens
        JOIN users
            ON refresh_tokens.user_id = users.user_id
        WHERE refresh_tokens.token_hash = ?
        AND refresh_tokens.revoked_at IS NULL
        AND refresh_tokens.expires_at > NOW()
        `,
        [tokenHash]
    );

    if (tokens.length === 0) {
        const error = new Error('Invalid or expired refresh token');
        error.statusCode = 401;
        throw error;
    }

    const user = tokens[0];

    const accessToken = generateAccessToken(user);

    return {
        accessToken
    };
};

const logoutUser = async (refreshToken) => {
    if (!refreshToken) {
        return;
    }

    const tokenHash = hashRefreshToken(refreshToken);

    await db.query(
        `
        UPDATE refresh_tokens
        SET revoked_at = NOW()
        WHERE token_hash = ?
        `,
        [tokenHash]
    );
};

module.exports = {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser
};