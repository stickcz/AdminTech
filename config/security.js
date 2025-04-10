const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const csrf = require('csurf');
const publicRoutes = require('./routes/public');

const securityConfig = (app) => {
    // Configuración básica de Helmet
    app.use(helmet());

    // Configuración detallada de CSP
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", 'code.jquery.com', 'cdn.jsdelivr.net', "'unsafe-inline'"],
            styleSrc: ["'self'", 'cdn.jsdelivr.net', 'cdnjs.cloudflare.com', "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'via.placeholder.com'],
            fontSrc: ["'self'", 'cdnjs.cloudflare.com'],
            connectSrc: ["'self'"],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"]
        }
    }));

    // Rate limiting general
    const generalLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutos
        max: 100,
        message: 'Demasiadas peticiones desde esta IP, por favor intente de nuevo más tarde.'
    });
    app.use(generalLimiter);

    // Rate limiting específico para login
    const loginLimiter = rateLimit({
        windowMs: 60 * 60 * 1000, // 1 hora
        max: 5, // 5 intentos
        message: 'Demasiados intentos de inicio de sesión, por favor intente de nuevo en 1 hora.'
    });
    app.use('/login', loginLimiter);

    // Protección CSRF
    // Deshabilitar CSRF en ambiente de pruebas
    if (process.env.NODE_ENV !== 'test') {
        app.use(csrf({ cookie: false }));
        app.use((req, res, next) => {
            res.locals.csrfToken = req.csrfToken();
            next();
        });
    }

    app.use('/techsoluciones', (req, res, next) => next());
    app.use('/', publicRoutes);
};

module.exports = securityConfig;