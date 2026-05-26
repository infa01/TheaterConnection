const db = require('../config/db');

const createHttpError = (message, statusCode = 500, code = null) => {
    const error = new Error(message);
    error.statusCode = statusCode;

    if (code) {
        error.code = code;
    }

    return error;
};

const createReservation = async ({ userId, showtime_id, seat_ids }) => {
    let connection;

    try {
        connection = await db.getConnection();

        await connection.beginTransaction();

        const [showtimes] = await connection.query(`
        SELECT
            showtimes.showtime_id,
            showtimes.show_date,
            showtimes.show_time,
            shows.theatre_id
        FROM showtimes
        JOIN shows
            ON showtimes.show_id = shows.show_id
        WHERE showtimes.showtime_id = ?
        FOR UPDATE
        `, [showtime_id]);

        if (showtimes.length === 0) {
        throw createHttpError('Showtime not found', 404);
        }

        const showtime = showtimes[0];

        const [futureCheck] = await connection.query(`
        SELECT showtime_id
        FROM showtimes
        WHERE showtime_id = ?
        AND CONCAT(show_date, ' ', show_time) > NOW()
        `, [showtime_id]);

        if (futureCheck.length === 0) {
        throw createHttpError('Cannot reserve seats for a past showtime', 400);
        }

        const [validSeats] = await connection.query(`
        SELECT seat_id
        FROM seats
        WHERE theatre_id = ?
        AND seat_id IN (?)
        `, [showtime.theatre_id, seat_ids]);

        if (validSeats.length !== seat_ids.length) {
        throw createHttpError('One or more selected seats are invalid for this theatre', 400);
        }

        const [existingSeats] = await connection.query(`
        SELECT *
        FROM reservation_seats
        WHERE showtime_id = ?
        AND seat_id IN (?)
        FOR UPDATE
        `, [showtime_id, seat_ids]);

        if (existingSeats.length > 0) {
        throw createHttpError('One or more seats are already reserved', 400);
        }

        const [reservationResult] = await connection.query(`
        INSERT INTO reservations (user_id, showtime_id)
        VALUES (?, ?)
        `, [userId, showtime_id]);

        const reservationId = reservationResult.insertId;

        for (const seatId of seat_ids) {
        await connection.query(`
            INSERT INTO reservation_seats (
            reservation_id,
            seat_id,
            showtime_id
            )
            VALUES (?, ?, ?)
        `, [reservationId, seatId, showtime_id]);
        }

        await connection.commit();

        return {
        reservation_id: reservationId
        };

    } catch (error) {
        if (connection) {
        await connection.rollback();
        }

        if (error.code === 'ER_DUP_ENTRY') {
        throw createHttpError('One or more selected seats are no longer available', 400, error.code);
        }

        throw error;

    } finally {
        if (connection) {
        connection.release();
        }
    }
};

const getUserReservations = async (userId) => {
    const [reservations] = await db.query(`
        SELECT
        reservations.reservation_id,
        reservations.status,
        reservations.created_at,

        shows.show_id,
        shows.title,
        shows.description,
        shows.duration,
        shows.age_rating,

        theatres.theatre_id,
        theatres.name AS theatre_name,
        theatres.location,

        showtimes.showtime_id,
        showtimes.show_date,
        showtimes.show_time,
        showtimes.hall,
        showtimes.price

        FROM reservations

        JOIN showtimes
        ON reservations.showtime_id = showtimes.showtime_id

        JOIN shows
        ON showtimes.show_id = shows.show_id

        JOIN theatres
        ON shows.theatre_id = theatres.theatre_id

        WHERE reservations.user_id = ?

        ORDER BY reservations.created_at DESC
    `, [userId]);

    const enhancedReservations = [];

    for (const reservation of reservations) {
        const [seats] = await db.query(`
        SELECT
            seats.seat_id,
            seats.seat_row,
            seats.seat_number,
            seats.category
        FROM reservation_seats
        JOIN seats
            ON reservation_seats.seat_id = seats.seat_id
        WHERE reservation_seats.reservation_id = ?
        ORDER BY seats.seat_row, seats.seat_number
        `, [reservation.reservation_id]);

        const bookedSeats = seats
        .map(seat => `${seat.seat_row}${String(seat.seat_number).padStart(2, '0')}`)
        .join(', ');

        const seatCount = seats.length;
        const totalCost = seatCount * Number(reservation.price);

        enhancedReservations.push({
        ...reservation,
        seats,
        seat_ids: seats.map(seat => seat.seat_id),
        seat_count: seatCount,
        booked_seats: bookedSeats,
        total_cost: totalCost.toFixed(2)
        });
    }

    return enhancedReservations;
};

const updateReservation = async ({
    userId,
    reservationId,
    showtime_id,
    seat_ids
}) => {
    let connection;

    try {
        connection = await db.getConnection();

        await connection.beginTransaction();

        const [reservations] = await connection.query(`
        SELECT
            reservations.reservation_id,
            reservations.user_id,
            reservations.showtime_id,
            reservations.status,
            showtimes.show_date,
            showtimes.show_time
        FROM reservations
        JOIN showtimes
            ON reservations.showtime_id = showtimes.showtime_id
        WHERE reservations.reservation_id = ?
        AND reservations.user_id = ?
        FOR UPDATE
        `, [reservationId, userId]);

        if (reservations.length === 0) {
        throw createHttpError('Reservation not found or unauthorized', 404);
        }

        const reservation = reservations[0];

        if (reservation.status !== 'active') {
        throw createHttpError('Only active reservations can be modified', 400);
        }

        const [futureCheck] = await connection.query(`
        SELECT showtime_id
        FROM showtimes
        WHERE showtime_id = ?
        AND CONCAT(show_date, ' ', show_time) > NOW()
        `, [reservation.showtime_id]);

        if (futureCheck.length === 0) {
        throw createHttpError('Past reservations cannot be modified', 400);
        }

        const [newShowtimes] = await connection.query(`
        SELECT
            showtimes.showtime_id,
            shows.theatre_id
        FROM showtimes
        JOIN shows
            ON showtimes.show_id = shows.show_id
        WHERE showtimes.showtime_id = ?
        FOR UPDATE
        `, [showtime_id]);

        if (newShowtimes.length === 0) {
        throw createHttpError('Showtime not found', 404);
        }

        const newShowtime = newShowtimes[0];

        const [validSeats] = await connection.query(`
        SELECT seat_id
        FROM seats
        WHERE theatre_id = ?
        AND seat_id IN (?)
        `, [newShowtime.theatre_id, seat_ids]);

        if (validSeats.length !== seat_ids.length) {
        throw createHttpError('One or more selected seats are invalid for this theatre', 400);
        }

        const [existingSeats] = await connection.query(`
        SELECT *
        FROM reservation_seats
        WHERE showtime_id = ?
        AND seat_id IN (?)
        AND reservation_id <> ?
        FOR UPDATE
        `, [showtime_id, seat_ids, reservationId]);

        if (existingSeats.length > 0) {
        throw createHttpError('One or more selected seats are already reserved', 400);
        }

        await connection.query(`
        DELETE FROM reservation_seats
        WHERE reservation_id = ?
        `, [reservationId]);

        await connection.query(`
        UPDATE reservations
        SET showtime_id = ?
        WHERE reservation_id = ?
        `, [showtime_id, reservationId]);

        for (const seatId of seat_ids) {
        await connection.query(`
            INSERT INTO reservation_seats (
            reservation_id,
            seat_id,
            showtime_id
            )
            VALUES (?, ?, ?)
        `, [reservationId, seatId, showtime_id]);
        }

        await connection.commit();

        return {
        reservation_id: Number(reservationId)
        };

    } catch (error) {
        if (connection) {
        await connection.rollback();
        }

        if (error.code === 'ER_DUP_ENTRY') {
        throw createHttpError('One or more selected seats are no longer available', 400, error.code);
        }

        throw error;

    } finally {
        if (connection) {
        connection.release();
        }
    }
};

const cancelReservation = async ({ userId, reservationId }) => {
    let connection;

    try {
        connection = await db.getConnection();

        await connection.beginTransaction();

        const [reservations] = await connection.query(`
        SELECT *
        FROM reservations
        WHERE reservation_id = ?
        AND user_id = ?
        FOR UPDATE
        `, [reservationId, userId]);

        if (reservations.length === 0) {
        throw createHttpError('Reservation not found or unauthorized', 404);
        }

        await connection.query(`
        DELETE FROM reservation_seats
        WHERE reservation_id = ?
        `, [reservationId]);

        await connection.query(`
        DELETE FROM reservations
        WHERE reservation_id = ?
        `, [reservationId]);

        await connection.commit();

        return true;

    } catch (error) {
        if (connection) {
        await connection.rollback();
        }

        throw error;

    } finally {
        if (connection) {
        connection.release();
        }
    }
};

module.exports = {
    createReservation,
    getUserReservations,
    updateReservation,
    cancelReservation
};