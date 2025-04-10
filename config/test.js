process.env.NODE_ENV = 'test';
process.env.PORT = 3001;
process.env.DB_NAME = ':memory:';
process.env.SESSION_SECRET = 'test-secret-key';

module.exports = {
    database: {
        memory: true,
        logging: false
    },
    session: {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    },
    csrf: false // Disable CSRF for tests
};