exports.gettechsoluciones = (req, res) => {
    res.render('public/index', {
        title: 'TechSoluciones Integrales',
        layout: 'layouts/home'
    });
};