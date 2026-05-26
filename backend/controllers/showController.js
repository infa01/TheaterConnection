const showService = require('../services/showService');

const getAllShows = async (req, res) => {
  try {
    const shows = await showService.getAllShows(req.query);

    res.status(200).json({
      success: true,
      count: shows.length,
      data: shows
    });

  } catch (error) {
    console.error('Error fetching shows:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch shows',
      error: error.message
    });
  }
};

const getShowById = async (req, res) => {
  try {
    const show = await showService.getShowById(req.params.id);

    if (!show) {
      return res.status(404).json({
        success: false,
        message: 'Show not found'
      });
    }

    res.status(200).json({
      success: true,
      data: show
    });

  } catch (error) {
    console.error('Error fetching show:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch show',
      error: error.message
    });
  }
};

module.exports = {
  getAllShows,
  getShowById
};