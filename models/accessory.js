// models/accessory.js
const db = require('../config/database');

const Accessory = {
    getAll: (callback) => {
        db.all('SELECT * FROM accessories', [], callback);
    },
    create: (accessory, callback) => {
        const { name, price } = accessory;
        db.run(
            'INSERT INTO accessories (name, price) VALUES (?, ?)',
            [name, price],
            callback
        );
    }
};

module.exports = Accessory;