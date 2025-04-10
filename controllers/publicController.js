// controllers/publicController.js
const Product = require('../models/product');

exports.getHome = async (req, res) => {
    try {
        res.render('index', {
            title: 'TechSoluciones Integrales - Tu Socio Tecnológico',
            user: req.user || null
        });
    } catch (error) {
        console.error('Error en getHome:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error interno del servidor',
            error: {
                status: 500,
                message: 'Lo sentimos, algo salió mal'
            }
        });
    }
};

// Eliminar getIndex ya que es redundante con getHome

exports.getShop = async (req, res) => {
    try {
        const products = await new Promise((resolve, reject) => {
            Product.getAll((err, products) => {
                if (err) reject(err);
                else resolve(products);
            });
        });

        res.render('shop', {
            title: 'Tienda',
            user: req.user || null,
            products: products || []
        });
    } catch (error) {
        console.error('Error en getShop:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error al cargar los productos',
            error: {
                status: 500,
                message: 'Error al acceder a la base de datos'
            }
        });
    }
};

exports.gettechsoluciones = async (req, res) => {
    try {
        res.render('techsoluciones', {
            title: 'TechSoluciones Integrales',
            user: req.user || null
        });
    } catch (error) {
        console.error('Error en gettechsoluciones:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error al cargar la página de TechSoluciones',
            error: {
                status: 500,
                message: 'Error interno del servidor'
            }
        });
    }
}
