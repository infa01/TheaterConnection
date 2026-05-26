const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const { 
    createShow,
    createShowtime,
    deactivateShow,
    deactivateShowtime,
    getAllShowsAdmin,
    activateShow,
    getAllShowtimesAdmin,
    activateShowtime
} = require('../controllers/adminController');

router.get(
  '/dashboard',
  authMiddleware,
  adminMiddleware,
  (req, res) => {

    res.json({
      success: true,
      message: 'Welcome Admin',
      user: req.user
    });

  }
);

router.post(
  '/shows',
  authMiddleware,
  adminMiddleware,
  createShow
);

router.post(
  '/showtimes',
  authMiddleware,
  adminMiddleware,
  createShowtime
);

router.patch(
  '/shows/:id/deactivate',
  authMiddleware,
  adminMiddleware,
  deactivateShow
);

router.patch(
  '/showtimes/:id/deactivate',
  authMiddleware,
  adminMiddleware,
  deactivateShowtime
);

router.get(
  '/shows',
  authMiddleware,
  adminMiddleware,
  getAllShowsAdmin
);

router.patch(
  '/shows/:id/activate',
  authMiddleware,
  adminMiddleware,
  activateShow
);

router.get(
  '/showtimes',
  authMiddleware,
  adminMiddleware,
  getAllShowtimesAdmin
);

router.patch(
  '/showtimes/:id/activate',
  authMiddleware,
  adminMiddleware,
  activateShowtime
);

module.exports = router;