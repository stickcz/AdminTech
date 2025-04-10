const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.getAll((err, products) => {
        if (err) return next(err);
        res.render('manage_products', { title: 'Gestionar Productos', products: products || [], message: null });
    });
};

exports.getProductById = (req, res, next) => {
    const id = req.params.id;
    Product.getById(id, (err, product) => {
        if (err) return next(err);
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(product);
    });
};

exports.addProduct = (req, res, next) => {
    const { name, description, price, image_url, category, status, discount } = req.body;
    Product.create({
        name,
        description,
        price,
        image: image_url,
        category,
        status,
        discount: discount || null
    }, (err) => {
        if (err) return next(err);
        res.redirect('/dashboard/products');
    });
};

exports.getEditProduct = (req, res, next) => {
    const id = req.params.id;
    Product.getById(id, (err, product) => {
        if (err) return next(err);
        if (!product) return res.status(404).render('error', { title: 'Error', message: 'Producto no encontrado' });
        res.render('edit_product', { title: 'Editar Producto', product });
    });
};

exports.updateProduct = (req, res, next) => {
    const id = req.params.id;
    const { name, description, price, image_url, category, status, discount } = req.body;
    Product.update(id, {
        name,
        description,
        price,
        image: image_url,
        category,
        status,
        discount: discount || null
    }, (err) => {
        if (err) return next(err);
        res.redirect('/dashboard/products');
    });
};

exports.deleteProduct = (req, res, next) => {
    const id = req.params.id;
    Product.delete(id, (err) => {
        if (err) return next(err);
        res.redirect('/dashboard/products');
    });
};