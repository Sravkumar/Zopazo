const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
} = require('../controllers/userController');
const protect = require('../middleware/protect');

// 👤 User Registration & Login
router.post('/signup', registerUser);
router.post('/login', loginUser);

// 👤 Get Profile (Protected)
router.get('/profile', protect, getProfile);

module.exports = router;
