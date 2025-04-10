// models/company.js
const db = require('../config/database');

// Crear la tabla si no existe
db.run(`
    CREATE TABLE IF NOT EXISTS company_info (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        city TEXT NOT NULL,
        date TEXT NOT NULL,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        website TEXT NOT NULL
    )
`);

class Company {
    constructor(city, date, name, phone, email, website) {
        this.city = city;
        this.date = date;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.website = website;
    }

    static get(callback) {
        db.all('SELECT * FROM company_info', callback);
    }

    static getById(id, callback) {
        db.get('SELECT * FROM company_info WHERE id = ?', [id], callback);
    }

    save(callback) {
        db.run(
            'INSERT INTO company_info (city, date, name, phone, email, website) VALUES (?, ?, ?, ?, ?, ?)',
            [this.city, this.date, this.name, this.phone, this.email, this.website],
            callback
        );
    }

    static update(id, city, date, name, phone, email, website, callback) {
        db.run(
            'UPDATE company_info SET city = ?, date = ?, name = ?, phone = ?, email = ?, website = ? WHERE id = ?',
            [city, date, name, phone, email, website, id],
            callback
        );
    }
}

module.exports = Company;