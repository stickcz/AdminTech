const request = require('supertest');
const app = require('../../app');
const User = require('../../models/user');
const db = require('../../config/database');

describe('Authentication Controller Tests', () => {
    let agent;

    beforeAll(async () => {
        agent = request.agent(app);
        await new Promise((resolve, reject) => {
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    });

    beforeEach(async () => {
        await User.deleteAll();
    });

    afterAll(async () => {
        await new Promise((resolve) => {
            db.close(() => resolve());
        });
    });

    test('should get login page', async () => {
        const response = await agent.get('/login');
        expect(response.status).toBe(200);
    });

    test('should register a new user', async () => {
        const response = await agent
            .post('/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'Test123!',
                confirmPassword: 'Test123!'
            });

        expect(response.status).toBe(302); // Redirección
        expect(response.headers.location).toBe('/login');

        const user = await User.findByEmail('test@example.com');
        expect(user).toBeTruthy();
        expect(user.username).toBe('testuser');
    });

    test('should login existing user', async () => {
        await User.create('testuser', 'test@example.com', 'Test123!');

        const response = await agent
            .post('/login')
            .send({
                email: 'test@example.com',
                password: 'Test123!'
            });

        expect(response.status).toBe(302);
        expect(response.headers.location).toBe('/dashboard');
    });

    test('should fail login with incorrect password', async () => {
        await User.create('testuser', 'test@example.com', 'Test123!');

        const response = await agent
            .post('/login')
            .send({
                email: 'test@example.com',
                password: 'WrongPassword123!'
            });

        expect(response.status).toBe(302);
        expect(response.headers.location).toBe('/login');
    });
});