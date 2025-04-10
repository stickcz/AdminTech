module.exports = {
    ensureAuthenticated: function(req, res, next) {
        console.log('Verificando autenticación:', req.isAuthenticated(), req.user);
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Por favor inicie sesión para acceder a esta página');
        res.redirect('/login');
    }
};