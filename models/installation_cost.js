// models/installation_cost.js
const db = require('../config/database');

class InstallationCost {
    constructor(condition, price) {
        this.condition = condition;
        this.price = price;
    }

    static getAll(callback) {
        db.all('SELECT * FROM installation_costs', [], callback);
    }

    static getById(id, callback) {
        db.get('SELECT * FROM installation_costs WHERE id = ?', [id], callback);
    }

    save(callback) {
        db.run(
            'INSERT INTO installation_costs (condition, price) VALUES (?, ?)',
            [this.condition, this.price],
            callback
        );
    }

    static update(id, condition, price, callback) {
        db.run(
            'UPDATE installation_costs SET condition = ?, price = ? WHERE id = ?',
            [condition, price, id],
            callback
        );
    }

    static delete(id, callback) {
        db.run('DELETE FROM installation_costs WHERE id = ?', [id], callback);
    }
}

module.exports = InstallationCost;