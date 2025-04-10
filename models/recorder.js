// models/recorder.js
const db = require('../config/database');

class Recorder {
    constructor(model, channels, resolution, technology, price) {
        this.model = model;
        this.channels = channels;
        this.resolution = resolution;
        this.technology = technology;
        this.price = price;
    }

    static getAll(callback) {
        db.all('SELECT * FROM recorders', [], callback);
    }

    static getById(id, callback) {
        db.get('SELECT * FROM recorders WHERE id = ?', [id], callback);
    }

    save(callback) {
        db.run(
            'INSERT INTO recorders (model, channels, resolution, technology, price) VALUES (?, ?, ?, ?, ?)',
            [this.model, this.channels, this.resolution, this.technology, this.price],
            callback
        );
    }

    static update(id, model, channels, resolution, technology, price, callback) {
        db.run(
            'UPDATE recorders SET model = ?, channels = ?, resolution = ?, technology = ?, price = ? WHERE id = ?',
            [model, channels, resolution, technology, price, id],
            callback
        );
    }

    static delete(id, callback) {
        db.run('DELETE FROM recorders WHERE id = ?', [id], callback);
    }
}

module.exports = Recorder;