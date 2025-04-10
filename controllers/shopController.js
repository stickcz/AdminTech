const db = require('../config/database');

exports.getShop = (req, res) => {
    // Consulta directa sin Promise
    db.all('SELECT * FROM products', [], (err, products) => {
        if (err) {
            console.error('Error en la base de datos:', err);
            return res.status(500).render('error', {
                message: 'Error al cargar los productos'
            });
        }
        
        console.log('Productos encontrados:', products); // Para debug
        
        res.render('shop', {
            title: 'Tienda',
            products: products || []
        });
    });
};