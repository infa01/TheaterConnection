const db = require('../config/db');

const getAllShows = async (filters = {}) => {
    const {
        search,
        theatreId,
        title,
        location,
        date
    } = filters;

    let sql = `
        SELECT DISTINCT
        shows.show_id,
        shows.title,
        shows.description,
        shows.duration,
        shows.age_rating,
        theatres.theatre_id,
        theatres.name AS theatre_name,
        theatres.location
        FROM shows
        JOIN theatres
        ON shows.theatre_id = theatres.theatre_id
    `;

    const conditions = [];
    const params = [];

    conditions.push(`shows.status = 'active'`);

    if (date) {
        sql += `
        JOIN showtimes
            ON shows.show_id = showtimes.show_id
        `;

        conditions.push(`showtimes.show_date = ?`);
        params.push(date);
    }

    if (search) {
        conditions.push(`
        (
            shows.title LIKE ?
            OR theatres.name LIKE ?
            OR theatres.location LIKE ?
        )
        `);

        params.push(
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
        );
    }

    if (theatreId) {
        conditions.push(`theatres.theatre_id = ?`);
        params.push(theatreId);
    }

    if (title) {
        conditions.push(`shows.title LIKE ?`);
        params.push(`%${title}%`);
    }

    if (location) {
        conditions.push(`theatres.location LIKE ?`);
        params.push(`%${location}%`);
    }

    if (conditions.length > 0) {
        sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    sql += ` ORDER BY shows.show_id ASC`;

    const [shows] = await db.query(sql, params);

    return shows;
};

const getShowById = async (showId) => {
    const [shows] = await db.query(`
        SELECT 
            shows.show_id,
            shows.title,
            shows.description,
            shows.duration,
            shows.age_rating,
            theatres.theatre_id,
            theatres.name AS theatre_name,
            theatres.location
        FROM shows
        JOIN theatres
            ON shows.theatre_id = theatres.theatre_id
        WHERE shows.show_id = ?
        AND shows.status = 'active'
    `, [showId]);

    return shows[0] || null;
};

module.exports = {
    getAllShows,
    getShowById
};