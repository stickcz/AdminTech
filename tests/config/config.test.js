const config = require('../../config/test');

describe('Test Configuration', () => {
    test('should have correct test environment settings', () => {
        expect(process.env.NODE_ENV).toBe('test');
        expect(process.env.PORT).toBe('3001');
        expect(process.env.DB_NAME).toBe(':memory:');
        expect(process.env.SESSION_SECRET).toBeDefined();
    });

    test('should have database configuration', () => {
        expect(config.database).toBeDefined();
        expect(config.database.memory).toBe(true);
        expect(config.database.logging).toBe(false);
    });

    test('should have session configuration', () => {
        expect(config.session).toBeDefined();
        expect(config.session.secret).toBeDefined();
    });
});