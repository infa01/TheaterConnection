const db = require('../config/db');

const createShow = async ({
    theatre_id,
    title,
    description,
    duration,
    age_rating
}) => {
    const [result] = await db.query(`
        INSERT INTO shows (
        theatre_id,
        title,
        description,
        duration,
        age_rating
        )
        VALUES (?, ?, ?, ?, ?)
    `, [
        theatre_id,
        title,
        description || null,
        duration,
        age_rating || null
    ]);

    return result.insertId;
};

const createShowtime = async ({
    show_id,
    show_date,
    show_time,
    hall,
    price
}) => {
    const [result] = await db.query(`
        INSERT INTO showtimes (
        show_id,
        show_date,
        show_time,
        hall,
        price
        )
        VALUES (?, ?, ?, ?, ?)
    `, [
        show_id,
        show_date,
        show_time,
        hall,
        price
    ]);

    return result.insertId;
};

const updateShowStatus = async (showId, status) => {
    const [result] = await db.query(`
        UPDATE shows
        SET status = ?
        WHERE show_id = ?
    `, [status, showId]);

    return result.affectedRows;
};

const updateShowtimeStatus = async (showtimeId, status) => {
    const [result] = await db.query(`
        UPDATE showtimes
        SET status = ?
        WHERE showtime_id = ?
    `, [status, showtimeId]);

    return result.affectedRows;
};

const getAllShowsAdmin = async () => {
    const [shows] = await db.query(`
        SELECT 
        shows.show_id,
        shows.title,
        shows.description,
        shows.duration,
        shows.age_rating,
        shows.status,
        theatres.theatre_id,
        theatres.name AS theatre_name,
        theatres.location
        FROM shows
        JOIN theatres 
        ON shows.theatre_id = theatres.theatre_id
        ORDER BY 
        CASE WHEN shows.status = 'active' THEN 0 ELSE 1 END,
        shows.show_id ASC
    `);

    return shows;
};

const getAllShowtimesAdmin = async () => {
    const [showtimes] = await db.query(`
        SELECT
        showtimes.showtime_id,
        showtimes.show_id,
        showtimes.show_date,
        showtimes.show_time,
        showtimes.hall,
        showtimes.price,
        showtimes.status,

        shows.title,
        theatres.name AS theatre_name,
        theatres.location

        FROM showtimes

        JOIN shows
        ON showtimes.show_id = shows.show_id

        JOIN theatres
        ON shows.theatre_id = theatres.theatre_id

        ORDER BY
        CASE WHEN showtimes.status = 'active' THEN 0 ELSE 1 END,
        showtimes.show_date ASC,
        showtimes.show_time ASC
    `);

    return showtimes;
};

module.exports = {
    createShow,
    createShowtime,
    updateShowStatus,
    updateShowtimeStatus,
    getAllShowsAdmin,
    getAllShowtimesAdmin
};