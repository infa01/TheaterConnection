const seatService = require('../services/seatService');

const getSeatsByShowtime = async (req, res) => {
  try {
    const { showtimeId } = req.query;

    if (!showtimeId) {
      return res.status(400).json({
        success: false,
        message: 'showtimeId query parameter is required'
      });
    }

    const seats = await seatService.getSeatsByShowtimeId(showtimeId);

    res.status(200).json({
      success: true,
      count: seats.length,
      data: seats
    });

  } catch (error) {
    console.error('Error fetching seats:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch seats',
      error: error.message
    });
  }
};

module.exports = {
  getSeatsByShowtime
};