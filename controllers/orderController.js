const Order = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/product');

// 🧾 Place order from cart
const placeOrder = async (req, res) => {
  const userId = req.user._id;
  const { deliveryAddress } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    const totalAmount = cart.items.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);

    const order = new Order({
      user: userId,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      paymentStatus: 'pending',
      orderStatus: 'processing',
    });

    await order.save();
    await Cart.deleteOne({ user: userId });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
};

// 📋 Get user orders
const getUserOrders = async (req, res) => {
  const userId = req.user._id;

  try {
    const orders = await Order.find({ user: userId }).populate('items.product');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
};
