// controllers/quoteController.js
const Camera = require('../models/camera');
const Recorder = require('../models/recorder');
const Installation = require('../models/installation');
const Accessory = require('../models/accessory');
const Cable = require('../models/cable');
const Protection = require('../models/cable_protection');
const Customer = require('../models/customer');
const Quote = require('../models/quote');
const Company = require('../models/company');

exports.getCreateQuote = async (req, res) => {
    try {
        const [cameras, recorders, installation_costs, accessories, cables, protection, customers] = await Promise.all([
            dbAll('SELECT * FROM cameras'),
            dbAll('SELECT * FROM recorders'),
            dbAll('SELECT * FROM installation_costs'),
            dbAll('SELECT * FROM accessories'),
            dbAll('SELECT * FROM cables'),
            dbAll('SELECT * FROM cable_protection'),
            dbAll('SELECT * FROM customers')
        ]);
        res.render('create_quote', { 
            title: 'Crear Cotización',
            cameras, 
            recorders, 
            installation_costs, 
            accessories, 
            cables, 
            protection, 
            customers 
        });
    } catch (err) {
        throw err;
    }
};

exports.postCreateQuote = (req, res) => {
    const { customer_id, new_customer_name, new_customer_id_number, new_customer_phone, new_customer_address, new_customer_email,
            cameras, recorders, installation_costs, accessories, cables, cable_protection, quantities } = req.body;
    const date = new Date().toLocaleDateString('es-ES');

    let finalCustomerId;
    if (customer_id) {
        finalCustomerId = customer_id;
        createQuote(finalCustomerId);
    } else {
        const newCustomer = {
            name: new_customer_name,
            id_number: new_customer_id_number,
            phone: new_customer_phone,
            address: new_customer_address,
            email: new_customer_email
        };
        Customer.create(newCustomer, function (err) {
            if (err) throw err;
            finalCustomerId = this.lastID;
            createQuote(finalCustomerId);
        });
    }

    function createQuote(customerId) {
        const quote = { date, customer_id: customerId };
        Quote.create(quote, function (err) {
            if (err) throw err;
            const quoteId = this.lastID;
            const items = [];

            const cameraIds = Array.isArray(cameras) ? cameras : cameras ? [cameras] : [];
            const recorderIds = Array.isArray(recorders) ? recorders : recorders ? [recorders] : [];
            const installationIds = Array.isArray(installation_costs) ? installation_costs : installation_costs ? [installation_costs] : [];
            const accessoryIds = Array.isArray(accessories) ? accessories : accessories ? [accessories] : [];
            const cableIds = Array.isArray(cables) ? cables : cables ? [cables] : [];
            const protectionIds = Array.isArray(cable_protection) ? cable_protection : cable_protection ? [cable_protection] : [];

            const cameraQuantities = Array.isArray(quantities?.cameras) ? quantities.cameras : [];
            const recorderQuantities = Array.isArray(quantities?.recorders) ? quantities.recorders : [];
            const installationQuantities = Array.isArray(quantities?.installation_costs) ? quantities.installation_costs : [];
            const accessoryQuantities = Array.isArray(quantities?.accessories) ? quantities.accessories : [];
            const cableQuantities = Array.isArray(quantities?.cables) ? quantities.cables : [];
            const protectionQuantities = Array.isArray(quantities?.cable_protection) ? quantities.cable_protection : [];

            cameraIds.forEach((id, i) => items.push([quoteId, 'camera', id, cameraQuantities[i] || 1]));
            recorderIds.forEach((id, i) => items.push([quoteId, 'recorder', id, recorderQuantities[i] || 1]));
            installationIds.forEach((id, i) => items.push([quoteId, 'installation', id, installationQuantities[i] || 1]));
            accessoryIds.forEach((id, i) => items.push([quoteId, 'accessory', id, accessoryQuantities[i] || 1]));
            cableIds.forEach((id, i) => items.push([quoteId, 'cable', id, cableQuantities[i] || 1]));
            protectionIds.forEach((id, i) => items.push([quoteId, 'protection', id, protectionQuantities[i] || 1]));

            if (items.length === 0) return res.status(400).send('Selecciona al menos un ítem');

            Quote.addItems(items, (err) => {
                if (err) throw err;
                res.redirect(`/quote/${quoteId}`);
            });
        });
    }
};

exports.getQuoteById = (req, res) => {
    const quoteId = req.params.id;
    Quote.getById(quoteId, (err, quote) => {
        if (err || !quote) return res.status(404).send('Cotización no encontrada');
        Quote.getItemsByQuoteId(quoteId, (err, items) => {
            if (err) throw err;
            Company.getById(1, (err, company) => {
                if (err) throw err;
                res.render('view_quote', { 
                    title: 'Ver Cotización',
                    quote, 
                    items, 
                    company 
                });
            });
        });
    });
};

exports.getQuotes = (req, res) => {
    Quote.getAll((err, quotes) => {
        if (err) throw err;
        res.render('quotes_list', { 
            title: 'Lista de Cotizaciones',
            quotes: quotes || [] 
        });
    });
};

function dbAll(query) {
    return new Promise((resolve, reject) => {
        const db = require('../config/database');
        db.all(query, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}