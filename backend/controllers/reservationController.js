const reservationService = require('../services/reservationService');

const createReservation = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      showtime_id,
      seat_ids
    } = req.body;

    if (!showtime_id || !Array.isArray(seat_ids) || seat_ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'showtime_id and seat_ids are required'
      });
    }

    const result = await reservationService.createReservation({
      userId,
      showtime_id,
      seat_ids
    });

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      reservation_id: result.reservation_id
    });

  } catch (error) {
    console.error('Reservation error:', error);

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to create reservation'
    });
  }
};

const getUserReservations = async (req, res) => {
  try {
    const userId = req.user.userId;

    const reservations = await reservationService.getUserReservations(userId);

    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations
    });

  } catch (error) {
    console.error('Error fetching reservations:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch reservations',
      error: error.message
    });
  }
};

const updateReservation = async (req, res) => {
  try {
    const userId = req.user.userId;
    const reservationId = req.params.id;

    const {
      showtime_id,
      seat_ids
    } = req.body;

    if (!showtime_id || !Array.isArray(seat_ids) || seat_ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'showtime_id and seat_ids are required'
      });
    }

    const result = await reservationService.updateReservation({
      userId,
      reservationId,
      showtime_id,
      seat_ids
    });

    res.status(200).json({
      success: true,
      message: 'Reservation updated successfully',
      reservation_id: result.reservation_id
    });

  } catch (error) {
    console.error('Update reservation error:', error);

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to update reservation'
    });
  }
};

const cancelReservation = async (req, res) => {
  try {
    const userId = req.user.userId;
    const reservationId = req.params.id;

    await reservationService.cancelReservation({
      userId,
      reservationId
    });

    res.status(200).json({
      success: true,
      message: 'Reservation cancelled successfully'
    });

  } catch (error) {
    console.error('Cancel reservation error:', error);

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to cancel reservation'
    });
  }
};

module.exports = {
  createReservation,
  getUserReservations,
  updateReservation,
  cancelReservation
};