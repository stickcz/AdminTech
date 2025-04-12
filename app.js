const helmet = require('helmet');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const SQLiteStore = require('connect-sqlite3')(session);
const shopRoutes = require('./routes/shop');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const { ensureAuthenticated } = require('./middleware/auth');

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Express-ejs-layouts middleware (keep only this one)
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// Make sure you have a layouts directory with main.ejs

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Session configuration (must be before CSRF)
app.use(session({
    store: new SQLiteStore({
        db: 'sessions.db',
        dir: './'
    }),
    secret: 'your-secret-key',
    resave: false,  // Cambiado a false para evitar problemas de sesión
    saveUninitialized: false,  // Cambiado a false para evitar problemas de sesión
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// Passport configuration
require('./config/passport')(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use(flash());

// CSRF protection
app.use(csrf({ cookie: true }));

// Error handler for CSRF
app.use((err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    
    // Handle CSRF token errors
    req.flash('error_msg', 'La sesión ha expirado. Por favor, vuelva a intentarlo.');
    res.redirect('/login');
});

// Make CSRF token available to all views
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

// Global variables
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Static files
app.use(express.static('public'));

// Configuración de rutas
app.use('/', require('./routes/public'));
// Configuración de rutas
const dashboardRoutes = require('./routes/dashboard');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const quoteRoutes = require('./routes/quote');
const homeRoutes = require('./routes/home');

// Rutas principales - orden corregido
app.use('/shop', shopRoutes);
app.use('/', authRoutes);  // Rutas de autenticación
app.use('/dashboard', ensureAuthenticated, dashboardRoutes);
app.use('/', quoteRoutes);
app.use('/', indexRoutes);  // Ruta principal debe ir después de las específicas

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;