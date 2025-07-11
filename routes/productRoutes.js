const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  addProduct,
} = require('../controllers/productController');

router.get('/', getAllProducts);        // GET /api/products/
router.post('/add', addProduct);        // POST /api/products/add

module.exports = router;