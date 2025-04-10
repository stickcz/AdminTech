// models/cable_protection.js
const db = require('../config/database');

class CableProtection {
    constructor(type, capacity, price_per_2m) {
        this.type = type;
        this.capacity = capacity;
        this.price_per_2m = price_per_2m;
    }

    static getAll(callback) {
        db.all('SELECT * FROM cable_protection', [], callback);
    }

    static getById(id, callback) {
        db.get('SELECT * FROM cable_protection WHERE id = ?', [id], callback);
    }

    save(callback) {
        db.run(
            'INSERT INTO cable_protection (type, capacity, price_per_2m) VALUES (?, ?, ?)',
            [this.type, this.capacity, this.price_per_2m],
            callback
        );
    }

    static update(id, type, capacity, price_per_2m, callback) {
        db.run(
            'UPDATE cable_protection SET type = ?, capacity = ?, price_per_2m = ? WHERE id = ?',
            [type, capacity, price_per_2m, id],
            callback
        );
    }

    static delete(id, callback) {
        db.run('DELETE FROM cable_protection WHERE id = ?', [id], callback);
    }
}

module.exports = CableProtection;