const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['customer', 'vendor', 'rider', 'admin'],
      default: 'customer',
    },
  },
  { timestamps: true }
);

// 🛡️ Prevent OverwriteModelError:
module.exports = mongoose.models.user || mongoose.model('user', userSchema);
