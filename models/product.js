const db = require('../config/database');

class Product {
    constructor(name, description, price, image, category, status, discount) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.category = category;
        this.status = status;
        this.discount = discount;
    }

    save(callback) {
        const sql = `INSERT INTO products (name, description, price, image, category, status, discount) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.run(sql, 
            [this.name, this.description, this.price, this.image, this.category, this.status, this.discount],
            function(err) {
                if (err) return callback(err);
                callback(null, this.lastID);
            }
        );
    }

    update(id, callback) {
        const sql = `UPDATE products 
                    SET name = ?, description = ?, price = ?, image = ?, 
                        category = ?, status = ?, discount = ?
                    WHERE id = ?`;
        db.run(sql, 
            [this.name, this.description, this.price, this.image, 
             this.category, this.status, this.discount, id],
            callback
        );
    }

    static getById(id, callback) {
        const sql = 'SELECT * FROM products WHERE id = ?';
        db.get(sql, [id], callback);
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM products';
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static deleteById(id, callback) {
        const sql = 'DELETE FROM products WHERE id = ?';
        db.run(sql, [id], callback);
    }
}

module.exports = Product;