const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Load env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5040;

// Connect to DB
connectDB();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json()); // Must be before routes

// ✅ ROUTES
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/test', testRoutes);
app.use('/api/cart', cartRoutes);     // <-- 🔥 Register Cart Routes
app.use('/api/orders', orderRoutes);  // <-- 🔥 Register Order Routes

// ✅ Root route
app.get('/', (req, res) => {
  res.send('Zopazo API is running...');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
