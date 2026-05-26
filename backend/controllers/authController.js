const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const result = await authService.registerUser({
      name,
      email,
      password
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId: result.userId
    });

  } catch (error) {
    console.error('Register error:', error);

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Registration failed'
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const result = await authService.loginUser({
      email,
      password
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      user: result.user
    });

  } catch (error) {
    console.error('Login error:', error);

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Login failed'
    });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body || {};

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'refreshToken is required'
      });
    }

    const result = await authService.refreshAccessToken(refreshToken);

    res.status(200).json({
      success: true,
      accessToken: result.accessToken
    });

  } catch (error) {
    console.error('Refresh token error:', error);

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Token refresh failed'
    });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body || {};

    await authService.logoutUser(refreshToken);

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);

    res.status(500).json({
      success: false,
      message: error.message || 'Logout failed'
    });
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout
};