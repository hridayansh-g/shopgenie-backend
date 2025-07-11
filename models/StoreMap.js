const mongoose = require('mongoose');

const storeMapSchema = new mongoose.Schema({
  storeId: { type: String, required: true },
  floor: Number,
  layout: [
    {
      row: Number,
      columns: [
        {
          column: Number,
          drawers: Number,
        },
      ],
    },
  ],
});

module.exports = mongoose.model('StoreMap', storeMapSchema);