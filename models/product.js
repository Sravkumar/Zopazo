const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  price: {
    type: Number,
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
