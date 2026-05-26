const express = require('express');

const {
  getSeatsByShowtime
} = require('../controllers/seatController');

const router = express.Router();

router.get('/', getSeatsByShowtime);

module.exports = router;