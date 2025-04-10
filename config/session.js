const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

module.exports = session({
    store: new SQLiteStore({
        db: 'sessions.db',
        dir: './',
        table: 'sessions'
    }),
    secret: process.env.SESSION_SECRET,
    name: 'sessionId', // Cambia el nombre por defecto de la cookie
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
        sameSite: 'strict'
    }
});