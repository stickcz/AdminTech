const db = require('../config/database');

class User {
    static initialize() {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('Error creando tabla users:', err);
            } else {
                console.log('Tabla users verificada/creada');
            }
        });
    }

    static create(username, email, password) {
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                [username, email, password],
                function(err) {
                    if (err) reject(err);
                    resolve({ id: this.lastID, username, email });
                }
            );
        });
    }

    static findOne(criteria) {
        return new Promise((resolve, reject) => {
            const { email } = criteria;
            db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }
}

// Inicializar la tabla al cargar el modelo
User.initialize();

module.exports = User;