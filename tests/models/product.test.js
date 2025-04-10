const Product = require('../../models/product');
const db = require('../../config/database');

describe('Product Model Tests', () => {
    beforeAll(async () => {
        return new Promise((resolve, reject) => {
            db.run('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, description TEXT, price REAL, image TEXT, category TEXT, status TEXT, discount TEXT)', 
                (err) => {
                    if (err) reject(err);
                    resolve();
                });
        });
    });

    afterAll(async () => {
        return new Promise((resolve, reject) => {
            db.run('DROP TABLE IF EXISTS products', (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    });

    beforeEach(async () => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM products', (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    });

    test('should create a new product', (done) => {
        const product = new Product(
            'Test Product',
            'Test Description',
            99.99,
            'test.jpg',
            'Test Category',
            'available',
            '10%'
        );

        product.save((err, productId) => {
            expect(err).toBeNull();
            expect(productId).toBeDefined();

            Product.getById(productId, (err, savedProduct) => {
                expect(err).toBeNull();
                expect(savedProduct.name).toBe('Test Product');
                expect(savedProduct.price).toBe(99.99);
                done();
            });
        });
    });

    test('should update an existing product', (done) => {
        const product = new Product(
            'Original Name',
            'Original Description',
            99.99,
            'test.jpg',
            'Test Category',
            'available',
            '10%'
        );

        product.save((err, productId) => {
            expect(err).toBeNull();
            product.name = 'Updated Name';
            
            product.update(productId, (err) => {
                expect(err).toBeNull();
                
                Product.getById(productId, (err, updatedProduct) => {
                    expect(err).toBeNull();
                    expect(updatedProduct.name).toBe('Updated Name');
                    done();
                });
            });
        });
    });
});