// routes/public.js
const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');
const indexController = require('../controllers/indexController');

router.get('/', publicController.getHome);
router.get('/shop', publicController.getShop);
router.get('/techsoluciones', indexController.gettechsoluciones);

module.exports = router;