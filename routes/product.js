const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/dashboard/products', productController.getProducts);
router.post('/dashboard/products/add', productController.addProduct);
router.get('/dashboard/products/get/:id', productController.getProductById);
router.get('/dashboard/products/edit/:id', productController.getEditProduct);
router.post('/dashboard/products/update/:id', productController.updateProduct);
router.post('/dashboard/products/delete/:id', productController.deleteProduct);

module.exports = router;