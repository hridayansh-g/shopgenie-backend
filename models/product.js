const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  floor: Number,
  row: Number,
  column: Number,
  drawer: Number,
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  category: String,
  price: Number,
  stock: { type: Number, required: true },
  location: locationSchema,
  qrCodeId: { type: String, required: true, unique: true },
  popularity: { type: Number, default: 0 }, // ✅ add this
});

module.exports = mongoose.model('Product', productSchema);