// routes/quote.js
const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/create_quote', ensureAuthenticated, quoteController.getCreateQuote);
router.post('/create_quote', ensureAuthenticated, quoteController.postCreateQuote);
router.get('/quote/:id', quoteController.getQuoteById);
router.get('/quotes', ensureAuthenticated, quoteController.getQuotes);

module.exports = router;