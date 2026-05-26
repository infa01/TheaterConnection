const db = require('../config/db');

const getShowtimesByShowId = async (showId) => {
    const [showtimes] = await db.query(`
        SELECT
        showtime_id,
        show_date,
        show_time,
        hall,
        price
        FROM showtimes
        WHERE show_id = ?
        AND status = 'active'
        ORDER BY show_date ASC, show_time ASC
    `, [showId]);

    return showtimes;
};

module.exports = {
    getShowtimesByShowId
};