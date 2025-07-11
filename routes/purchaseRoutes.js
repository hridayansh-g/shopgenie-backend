const express = require('express');
const router = express.Router();

const {
  scanProduct,
  makePayment,
  getHistory,
  getPopularity,
} = require('../controllers/purchaseController');

const Product = require('../models/product');

// Existing routes
router.post('/scan', scanProduct);
router.post('/pay', makePayment);
router.get('/popularity', getPopularity);
router.get('/history', getHistory);

// ✅ Route to decrease stock + increase popularity
router.post('/complete', async (req, res) => {
  const { qrCodeId } = req.body;
  try {
    const product = await Product.findOne({ qrCodeId });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (product.stock > 0) {
      product.stock -= 1;
      product.popularity = (product.popularity || 0) + 1;
      await product.save();
      return res.json({ success: true, product });
    } else {
      return res.status(400).json({ error: 'Out of stock' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;