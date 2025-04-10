// models/camera.js
const db = require('../config/database');

class Camera {
    static initialize() {
        const sql = `CREATE TABLE IF NOT EXISTS cameras (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            model TEXT NOT NULL,
            mp INTEGER,
            usage TEXT,
            material TEXT,
            type TEXT,
            ir_color TEXT,
            audio TEXT,
            ir_range INTEGER,
            connection TEXT,
            ai TEXT,
            price REAL NOT NULL
        )`;
        
        return new Promise((resolve, reject) => {
            db.run(sql, (err) => {
                if (err) {
                    console.error('Error al crear la tabla cameras:', err);
                    reject(err);
                } else {
                    console.log('Tabla cameras creada o ya existente');
                    resolve();
                }
            });
        });
    }

    constructor(model, mp, usage, material, type, ir_color, audio, ir_range, connection, ai, price) {
        this.model = model;
        this.mp = mp;
        this.usage = usage;
        this.material = material;
        this.type = type;
        this.ir_color = ir_color;
        this.audio = audio;
        this.ir_range = ir_range;
        this.connection = connection;
        this.ai = ai;
        this.price = price;
    }

    static getAll(callback) {
        db.all('SELECT * FROM cameras', [], (err, rows) => {
            if (err) {
                console.error('Error en getAll:', err);
                return callback(err);
            }
            callback(null, rows);
        });
    }

    static getById(id, callback) {
        db.get('SELECT * FROM cameras WHERE id = ?', [id], callback);
    }

    save(callback) {
        db.run(
            'INSERT INTO cameras (model, mp, usage, material, type, ir_color, audio, ir_range, connection, ai, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this.model, this.mp, this.usage, this.material, this.type, this.ir_color, this.audio, this.ir_range, this.connection, this.ai, this.price],
            callback
        );
    }

    update(id, callback) {
        db.run(
            'UPDATE cameras SET model = ?, mp = ?, usage = ?, material = ?, type = ?, ir_color = ?, audio = ?, ir_range = ?, connection = ?, ai = ?, price = ? WHERE id = ?',
            [this.model, this.mp, this.usage, this.material, this.type, this.ir_color, this.audio, this.ir_range, this.connection, this.ai, this.price, id],
            callback
        );
    }

    static delete(id, callback) {
        db.run('DELETE FROM cameras WHERE id = ?', [id], callback);
    }
}

// Inicializar la tabla al importar el modelo
Camera.initialize()
    .catch(err => console.error('Error al inicializar la tabla cameras:', err));

module.exports = Camera;