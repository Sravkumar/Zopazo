const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shopName: String,
  address: String,
  phone: String,
  email: String,
}, { timestamps: true });

module.exports = mongoose.model('Vendor', vendorSchema);
