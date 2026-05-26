const express = require('express');

const {
  createReservation,
  getUserReservations,
  updateReservation,
  cancelReservation
} = require('../controllers/reservationController');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createReservation);

router.get(
  '/user',
  authMiddleware,
  getUserReservations
);

router.put(
  '/:id',
  authMiddleware,
  updateReservation
);

router.delete(
  '/:id',
  authMiddleware,
  cancelReservation
);

module.exports = router;