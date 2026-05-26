const db = require('../config/db');

const getSeatsByShowtimeId = async (showtimeId) => {
    const [seats] = await db.query(`
        SELECT
        seats.hall,
        seats.seat_id,
        seats.seat_row,
        seats.seat_number,
        seats.category,

        CASE
            WHEN reservation_seats.seat_id IS NOT NULL
            THEN true
            ELSE false
        END AS is_reserved

        FROM seats

        JOIN showtimes
        ON showtimes.showtime_id = ?

        JOIN shows
        ON shows.show_id = showtimes.show_id

        LEFT JOIN reservation_seats
        ON reservation_seats.seat_id = seats.seat_id
        AND reservation_seats.showtime_id = showtimes.showtime_id

        WHERE seats.theatre_id = shows.theatre_id
        AND seats.hall = showtimes.hall

        ORDER BY
            CASE
                WHEN seats.seat_row REGEXP '[0-9]' THEN 1
                ELSE 0
            END ASC,
            CASE
                WHEN seats.seat_row REGEXP '[0-9]'
                THEN CAST(REGEXP_REPLACE(seats.seat_row, '[^0-9]', '') AS UNSIGNED)
                ELSE 0
            END ASC,
            seats.seat_row ASC,
            seats.seat_number ASC
    `, [showtimeId]);

    return seats;
};

module.exports = {
     getSeatsByShowtimeId
};