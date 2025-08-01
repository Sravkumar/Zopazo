const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// POST: Add item to cart
router.post('/', protect, addToCart);

// GET: Get user's cart
router.get('/', protect, getCart);

// DELETE: Remove item from cart
router.delete('/:itemId', protect, removeFromCart);

module.exports = router;
