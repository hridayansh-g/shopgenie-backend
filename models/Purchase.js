const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  name: String,
  price: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Purchase', purchaseSchema);