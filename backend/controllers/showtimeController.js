const showtimeService = require('../services/showtimeService');

const getShowtimesByShow = async (req, res) => {
  try {
    const { showId } = req.query;

    if (!showId) {
      return res.status(400).json({
        success: false,
        message: 'showId query parameter is required'
      });
    }

    const showtimes = await showtimeService.getShowtimesByShowId(showId);

    res.status(200).json({
      success: true,
      count: showtimes.length,
      data: showtimes
    });

  } catch (error) {
    console.error('Error fetching showtimes:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch showtimes',
      error: error.message
    });
  }
};

module.exports = {
  getShowtimesByShow
};