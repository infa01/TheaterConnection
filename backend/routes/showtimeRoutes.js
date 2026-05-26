const express = require('express');

const {
  getShowtimesByShow
} = require('../controllers/showtimeController');

const router = express.Router();

router.get('/', getShowtimesByShow);

module.exports = router;