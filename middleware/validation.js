const { body, validationResult } = require('express-validator');

exports.validateLogin = [
    body('username').trim().escape().notEmpty(),
    body('password').trim().notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

exports.validateQuote = [
    body('customer_id').isNumeric(),
    body('items.*.quantity').isNumeric(),
    body('items.*.price').isNumeric(),
    // Add more validations as needed
];