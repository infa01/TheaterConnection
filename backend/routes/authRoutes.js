const express = require('express');

const {
  register,
  login,
  refresh,
  logout
} = require('../controllers/authController');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);

router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Protected profile accessed successfully',
    user: req.user
  });
});

module.exports = router;