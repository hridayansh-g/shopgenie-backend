const Product = require('../models/product');
const Purchase = require('../models/Purchase');

// 🔍 SCAN PRODUCT
const scanProduct = async (req, res) => {
  try {
    const { qrCodeId } = req.body;

    const product = await Product.findOne({ qrCodeId });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({
      success: true,
      product,
      message: 'Scan successful. Proceed to payment.',
    });
  } catch (err) {
    console.error('Scan error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// 💳 MAKE PAYMENT
const makePayment = async (req, res) => {
  try {
    const { qrCodeId, quantity = 1 } = req.body;

    const product = await Product.findOne({ qrCodeId });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ success: false, message: 'Insufficient stock' });
    }

    // 🔻 Decrease stock
    product.stock -= quantity;

    // 🔺 Increase popularity
    product.popularity = (product.popularity || 0) + quantity;

    await product.save();

    // 🧾 Save to purchase history
    const purchase = new Purchase({
      name: product.name,
      price: product.price * quantity,
    });
    await purchase.save();

    const bill = {
      item: product.name,
      quantity,
      unitPrice: product.price,
      total: product.price * quantity,
      paymentMode: 'Dummy UPI',
      status: 'Success',
      time: new Date().toLocaleString(),
    };

    res.json({ success: true, message: 'Payment successful ✅', bill });
    product.stock -= 1;
    product.popularity += 1;
    await product.save();
  } catch (err) {
    console.error('Payment error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
// 📊 GET POPULARITY (last 30 days)
const getPopularity = async (req, res) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    const result = await Purchase.aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      {
        $group: {
          _id: '$name',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json({ success: true, data: result });
  } catch (err) {
    console.error('Popularity error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// 📋 GET PURCHASE HISTORY
const getHistory = async (req, res) => {
  try {
    const purchases = await Purchase.find().sort({ timestamp: -1 });

    res.json({ success: true, purchases });
  } catch (err) {
    console.error('History error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  scanProduct,
  makePayment,
  getPopularity,
  getHistory,
};