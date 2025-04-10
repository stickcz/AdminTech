// models/quote.js
const db = require('../config/database');

const Quote = {
    getAll: (callback) => {
        db.all(
            `SELECT q.id, q.date, c.name 
             FROM quotes q 
             JOIN customers c ON q.customer_id = c.id 
             ORDER BY q.id DESC`,
            [],
            callback
        );
    },
    getById: (id, callback) => {
        db.get('SELECT q.*, c.* FROM quotes q JOIN customers c ON q.customer_id = c.id WHERE q.id = ?', [id], callback);
    },
    getItemsByQuoteId: (quoteId, callback) => {
        db.all(
            `SELECT qi.item_type, qi.quantity, 
                    c.model AS camera_model, c.price AS camera_price,
                    r.model AS recorder_model, r.price AS recorder_price,
                    ic.condition AS installation_condition, ic.price AS installation_price,
                    a.name AS accessory_name, a.price AS accessory_price,
                    cb.type AS cable_type, cb.price_per_meter AS cable_price,
                    cp.type AS protection_type, cp.price_per_2m AS protection_price
             FROM quote_items qi
             LEFT JOIN cameras c ON qi.item_type = 'camera' AND qi.item_id = c.id
             LEFT JOIN recorders r ON qi.item_type = 'recorder' AND qi.item_id = r.id
             LEFT JOIN installation_costs ic ON qi.item_type = 'installation' AND qi.item_id = ic.id
             LEFT JOIN accessories a ON qi.item_type = 'accessory' AND qi.item_id = a.id
             LEFT JOIN cables cb ON qi.item_type = 'cable' AND qi.item_id = cb.id
             LEFT JOIN cable_protection cp ON qi.item_type = 'protection' AND qi.item_id = cp.id
             WHERE qi.quote_id = ?`,
            [quoteId],
            callback
        );
    },
    create: (quote, callback) => {
        const { date, customer_id } = quote;
        db.run('INSERT INTO quotes (date, customer_id) VALUES (?, ?)', [date, customer_id], callback);
    },
    addItems: (items, callback) => {
        db.run(
            `INSERT INTO quote_items (quote_id, item_type, item_id, quantity) VALUES ${items.map(() => '(?, ?, ?, ?)').join(',')}`,
            items.flat(),
            callback
        );
    }
};

module.exports = Quote;