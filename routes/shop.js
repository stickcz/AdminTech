const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

// Ruta pública - sin autenticación requerida
router.get('/', shopController.getShop);

module.exports = router;