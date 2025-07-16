const axios = require('axios');

const API_URL = 'http://localhost:5000';

const testAdmin = async () => {
  try {
    console.log('Testing admin functionality...\n');

    // Test login
    console.log('1. Testing admin login...');
    const loginResponse = await axios.post(`${API_URL}/api/auth/login`, {
      email: 'admin@ecommerce.com',
      password: 'admin123'
    });
    
    console.log('✅ Login successful');
    console.log('User role:', loginResponse.data.user.role);
    console.log('Token received:', loginResponse.data.token ? 'Yes' : 'No');
    
    const token = loginResponse.data.token;
    
    // Test admin dashboard
    console.log('\n2. Testing admin dashboard...');
    const dashboardResponse = await axios.get(`${API_URL}/api/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Dashboard access successful');
    console.log('Stats:', dashboardResponse.data);
    
    // Test admin products
    console.log('\n3. Testing admin products...');
    const productsResponse = await axios.get(`${API_URL}/api/admin/products`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Products access successful');
    console.log('Products found:', productsResponse.data.products.length);
    
    console.log('\n🎉 All admin tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
};

testAdmin();
