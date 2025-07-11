const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static product images (e.g., parle.jpg, etc.)
app.use('/images', express.static(path.join(__dirname)));

// ✅ Connect to MongoDB
connectDB();

// ✅ API Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/purchase', require('./routes/purchaseRoutes'));
app.use('/api/qr', require('./routes/qrRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));