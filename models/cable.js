// models/cable.js
const db = require('../config/database');

const Cable = {
    getAll: (callback) => {
        db.all('SELECT * FROM cables', [], callback);
    },
    create: (cable, callback) => {
        const { type, category, price_per_meter } = cable;
        db.run(
            'INSERT INTO cables (type, category, price_per_meter) VALUES (?, ?, ?)',
            [type, category, price_per_meter],
            callback
        );
    }
};

module.exports = Cable;