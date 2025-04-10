module.exports = (req, res, next) => {
    // Set default variables for all views
    res.locals.title = 'Sistema de Cotizaciones';
    res.locals.user = req.user;
    res.locals.error = null;
    next();
};