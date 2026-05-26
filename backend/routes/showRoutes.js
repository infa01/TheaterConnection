const express = require('express');

const {
  getAllShows,
  getShowById
} = require('../controllers/showController');

const router = express.Router();

router.get('/', getAllShows);
router.get('/:id', getShowById);

module.exports = router;