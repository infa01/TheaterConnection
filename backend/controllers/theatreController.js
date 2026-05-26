const theatreService = require('../services/theatreService');

const getAllTheatres = async (req, res) => {
  try {
    const theatres = await theatreService.getAllTheatres();

    res.status(200).json({
      success: true,
      count: theatres.length,
      data: theatres
    });

  } catch (error) {
    console.error('Error fetching theatres:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch theatres',
      error: error.message
    });
  }
};

module.exports = {
  getAllTheatres
};