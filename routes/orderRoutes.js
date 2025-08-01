const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  placeOrder,
  getUserOrders
} = require('../controllers/orderController');

// 📦 Order Routes (Protected)
router.post('/', protect, placeOrder);       // Place order from cart
router.get('/', protect, getUserOrders);     // View user's orders

module.exports = router;
