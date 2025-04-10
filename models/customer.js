// models/customer.js
const db = require('../config/database');

const Customer = {
    getAll: (callback) => {
        db.all('SELECT * FROM customers', [], callback);
    },
    create: (customer, callback) => {
        const { name, id_number, phone, address, email } = customer;
        db.run(
            'INSERT INTO customers (name, id_number, phone, address, email) VALUES (?, ?, ?, ?, ?)',
            [name, id_number || null, phone, address || null, email || null],
            callback
        );
    }
};

module.exports = Customer;