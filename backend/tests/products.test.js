const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');
const User = require('../models/User');
const productRoutes = require('../routes/products');
const auth = require('../middleware/auth');

const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);

describe('Product Tests', () => {
  let authToken;
  let adminToken;
  let testProduct;

  beforeEach(async () => {
    // Create test user
    const user = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'hashedpassword',
      phone: '+1234567890',
      isVerified: true
    });

    // Create admin user
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: 'hashedpassword',
      phone: '+1234567891',
      role: 'admin',
      isVerified: true
    });

    // Generate tokens
    authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'test-secret', { expiresIn: '1h' });
    adminToken = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET || 'test-secret', { expiresIn: '1h' });

    // Create test product
    testProduct = await Product.create({
      name: 'Test Product',
      description: 'A test product description',
      price: 99.99,
      category: 'Electronics',
      subcategory: 'Phones',
      brand: 'TestBrand',
      inStock: true,
      stockQuantity: 10,
      images: ['test-image.jpg'],
      specifications: {
        color: 'Black',
        size: 'Medium'
      }
    });
  });

  describe('GET /api/products', () => {
    it('should get all products', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].name).toBe('Test Product');
    });

    it('should filter products by category', async () => {
      // Create another product in different category
      await Product.create({
        name: 'Clothing Item',
        description: 'A clothing item',
        price: 49.99,
        category: 'Clothing',
        subcategory: 'Shirts',
        brand: 'FashionBrand',
        inStock: true,
        stockQuantity: 5,
        images: ['shirt.jpg']
      });

      const response = await request(app)
        .get('/api/products?category=Electronics')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].category).toBe('Electronics');
    });

    it('should search products by name', async () => {
      const response = await request(app)
        .get('/api/products?search=Test')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].name).toBe('Test Product');
    });
  });

  describe('GET /api/products/:id', () => {
    it('should get product by id', async () => {
      const response = await request(app)
        .get(`/api/products/${testProduct._id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Test Product');
      expect(response.body.data.price).toBe(99.99);
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .get(`/api/products/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/products', () => {
    it('should create new product with admin token', async () => {
      const newProduct = {
        name: 'New Product',
        description: 'A new product description',
        price: 199.99,
        category: 'Electronics',
        subcategory: 'Laptops',
        brand: 'TechBrand',
        inStock: true,
        stockQuantity: 5,
        images: ['laptop.jpg'],
        specifications: {
          RAM: '16GB',
          Storage: '512GB SSD'
        }
      };

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newProduct)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(newProduct.name);
      
      // Verify product was created in database
      const product = await Product.findOne({ name: newProduct.name });
      expect(product).toBeTruthy();
    });

    it('should not create product without admin privileges', async () => {
      const newProduct = {
        name: 'Unauthorized Product',
        description: 'Should not be created',
        price: 99.99,
        category: 'Electronics',
        subcategory: 'Phones',
        brand: 'TestBrand',
        inStock: true,
        stockQuantity: 10
      };

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newProduct)
        .expect(403);

      expect(response.body.success).toBe(false);
    });

    it('should validate required fields', async () => {
      const invalidProduct = {
        name: 'Product without price'
        // missing required fields
      };

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(invalidProduct)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update product with admin token', async () => {
      const updates = {
        name: 'Updated Product Name',
        price: 149.99
      };

      const response = await request(app)
        .put(`/api/products/${testProduct._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updates)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updates.name);
      expect(response.body.data.price).toBe(updates.price);
    });

    it('should not update product without admin privileges', async () => {
      const updates = {
        name: 'Unauthorized Update'
      };

      const response = await request(app)
        .put(`/api/products/${testProduct._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updates)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete product with admin token', async () => {
      const response = await request(app)
        .delete(`/api/products/${testProduct._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      
      // Verify product was deleted
      const product = await Product.findById(testProduct._id);
      expect(product).toBeNull();
    });

    it('should not delete product without admin privileges', async () => {
      const response = await request(app)
        .delete(`/api/products/${testProduct._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });
});
