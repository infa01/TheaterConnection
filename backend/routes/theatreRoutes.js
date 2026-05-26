const express = require('express');

const {
  getAllTheatres
} = require('../controllers/theatreController');

const router = express.Router();

router.get('/', getAllTheatres);

module.exports = router;