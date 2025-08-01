const mongoose = require('mongoose');

const connectDB = async () => {
  const MONGO_URI = process.env.MONGODB_URI;
  console.log("🔗 Connecting to:", MONGO_URI);

  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.name}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;