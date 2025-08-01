const Cart = require('../models/cart');
const Product = require('../models/product');

// 📥 Add item to cart
const addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const existingItemIndex = cart.items.findIndex(item =>
      item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

// 🗑️ Remove item from cart
const removeFromCart = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    cart.items = cart.items.filter(item =>
      item.product.toString() !== productId
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
};

// 👁️ View cart
const getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) return res.status(200).json({ items: [] });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
};
