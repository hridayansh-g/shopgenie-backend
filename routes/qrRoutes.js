const express = require('express');
const QRCode = require('qrcode');
const Product = require('../models/product');
const router = express.Router();

// GET /api/qr/:qrCodeId
router.get('/:qrCodeId', async (req, res) => {
  try {
    const { qrCodeId } = req.params;
    const product = await Product.findOne({ qrCodeId });

    if (!product) return res.status(404).send('❌ Product not found');

    const qrData = JSON.stringify({ qrCodeId: product.qrCodeId });
    const qrImage = await QRCode.toDataURL(qrData);

    const html = `
      <html><body>
        <h2>QR for ${product.name}</h2>
        <img src="${qrImage}" alt="QR Code"/>
      </body></html>
    `;

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Error generating QR code');
  }
});

module.exports = router;