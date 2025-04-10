// models/protection.js
const db = require('../config/database');

const Protection = {
    getAll: (callback) => {
        db.all('SELECT * FROM cable_protection', [], callback);
    },
    create: (protection, callback) => {
        const { type, capacity, price_per_2m } = protection;
        db.run(
            'INSERT INTO cable_protection (type, capacity, price_per_2m) VALUES (?, ?, ?)',
            [type, capacity, price_per_2m],
            callback
        );
    }
};

module.exports = Protection;