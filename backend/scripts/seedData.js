const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Product = require('../models/Product');
const User = require('../models/User');
require('dotenv').config();

// Sample products data
const sampleProducts = [
  {
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system.',
    price: 999.99,
    comparePrice: 1099.99,
    category: 'Electronics',
    brand: 'Apple',
    countInStock: 50,
    images: [
      {
        public_id: 'iphone15pro_1',
        url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop'
      }
    ],
    featured: true,
    rating: 4.8,
    numReviews: 245,
    tags: ['smartphone', 'mobile', 'apple', 'ios'],
    weight: 0.187,
    dimensions: {
      length: 146.6,
      width: 70.6,
      height: 8.25
    }
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Premium Android smartphone with S Pen, 200MP camera, and AI features.',
    price: 1199.99,
    category: 'Electronics',
    brand: 'Samsung',
    countInStock: 35,
    images: [
      {
        public_id: 'galaxy_s24_ultra_1',
        url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'
      }
    ],
    featured: true,
    rating: 4.7,
    numReviews: 189,
    tags: ['smartphone', 'android', 'samsung', 'spen'],
    weight: 0.232,
    dimensions: {
      length: 162.3,
      width: 79.0,
      height: 8.6
    }
  },
  {
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with Max Air unit for all-day comfort.',
    price: 149.99,
    comparePrice: 179.99,
    category: 'Clothing',
    brand: 'Nike',
    countInStock: 120,
    images: [
      {
        public_id: 'nike_air_max_270_1',
        url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop'
      }
    ],
    featured: false,
    rating: 4.5,
    numReviews: 567,
    tags: ['shoes', 'running', 'nike', 'sports'],
    weight: 0.5,
    dimensions: {
      length: 30,
      width: 12,
      height: 10
    }
  },
  {
    name: 'MacBook Pro 14"',
    description: 'Powerful laptop with M3 chip, Liquid Retina XDR display, and all-day battery.',
    price: 1999.99,
    category: 'Electronics',
    brand: 'Apple',
    countInStock: 25,
    images: [
      {
        public_id: 'macbook_pro_14_1',
        url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop'
      }
    ],
    featured: true,
    rating: 4.9,
    numReviews: 123,
    tags: ['laptop', 'computer', 'apple', 'macbook'],
    weight: 1.6,
    dimensions: {
      length: 31.26,
      width: 22.12,
      height: 1.55
    }
  },
  {
    name: 'Levi\'s 501 Original Jeans',
    description: 'Classic straight-leg jeans with authentic style and comfort.',
    price: 69.99,
    comparePrice: 89.99,
    category: 'Clothing',
    brand: 'Levi\'s',
    countInStock: 200,
    images: [
      {
        public_id: 'levis_501_1',
        url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop'
      }
    ],
    featured: false,
    rating: 4.3,
    numReviews: 892,
    tags: ['jeans', 'clothing', 'denim', 'casual'],
    weight: 0.7,
    dimensions: {
      length: 110,
      width: 50,
      height: 2
    }
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise canceling headphones with premium sound quality.',
    price: 399.99,
    category: 'Electronics',
    brand: 'Sony',
    countInStock: 80,
    images: [
      {
        public_id: 'sony_wh1000xm5_1',
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
      }
    ],
    featured: true,
    rating: 4.6,
    numReviews: 334,
    tags: ['headphones', 'audio', 'wireless', 'noise-canceling'],
    weight: 0.25,
    dimensions: {
      length: 21,
      width: 18,
      height: 8
    }
  },
  {
    name: 'The Psychology of Money',
    description: 'Timeless lessons on wealth, greed, and happiness by Morgan Housel.',
    price: 16.99,
    comparePrice: 19.99,
    category: 'Books',
    brand: 'Harriman House',
    countInStock: 150,
    images: [
      {
        public_id: 'psychology_of_money_1',
        url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop'
      }
    ],
    featured: false,
    rating: 4.7,
    numReviews: 1205,
    tags: ['book', 'finance', 'psychology', 'money'],
    weight: 0.3,
    dimensions: {
      length: 23,
      width: 15,
      height: 2
    }
  },
  {
    name: 'Instant Pot Duo 7-in-1',
    description: 'Multi-use pressure cooker, slow cooker, rice cooker, and more.',
    price: 89.99,
    comparePrice: 119.99,
    category: 'Home & Garden',
    brand: 'Instant Pot',
    countInStock: 75,
    images: [
      {
        public_id: 'instant_pot_duo_1',
        url: 'https://images.unsplash.com/photo-1556909114-4c7e60d0f5b4?w=400&h=400&fit=crop'
      }
    ],
    featured: false,
    rating: 4.4,
    numReviews: 2134,
    tags: ['kitchen', 'appliance', 'pressure-cooker', 'cooking'],
    weight: 5.8,
    dimensions: {
      length: 32,
      width: 32,
      height: 31
    }
  },
  {
    name: 'Adidas Ultraboost 22',
    description: 'Premium running shoes with responsive Boost midsole.',
    price: 189.99,
    category: 'Sports',
    brand: 'Adidas',
    countInStock: 95,
    images: [
      {
        public_id: 'adidas_ultraboost_22_1',
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'
      }
    ],
    featured: false,
    rating: 4.6,
    numReviews: 445,
    tags: ['running', 'shoes', 'sports', 'adidas'],
    weight: 0.55,
    dimensions: {
      length: 31,
      width: 12,
      height: 11
    }
  },
  {
    name: 'CeraVe Foaming Facial Cleanser',
    description: 'Gentle cleanser for normal to oily skin with ceramides and niacinamide.',
    price: 12.99,
    comparePrice: 15.99,
    category: 'Beauty',
    brand: 'CeraVe',
    countInStock: 300,
    images: [
      {
        public_id: 'cerave_cleanser_1',
        url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop'
      }
    ],
    featured: false,
    rating: 4.5,
    numReviews: 789,
    tags: ['skincare', 'cleanser', 'beauty', 'face'],
    weight: 0.355,
    dimensions: {
      length: 15,
      width: 5,
      height: 5
    }
  }
];

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Find or create admin user
    let admin = await User.findOne({ email: 'admin@example.com' });
    if (!admin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      admin = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        isActive: true,
        emailVerified: true
      });
      await admin.save();
      console.log('Created admin user');
    }

    // Add createdBy field to products
    const productsWithCreator = sampleProducts.map(product => ({
      ...product,
      createdBy: admin._id
    }));

    // Insert sample products
    await Product.insertMany(productsWithCreator);
    console.log(`Inserted ${productsWithCreator.length} sample products`);

    console.log('Sample data seeded successfully!');
    console.log('Admin credentials: admin@example.com / admin123');
    
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
