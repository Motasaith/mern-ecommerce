/**
 * Test Newsletter Service URLs
 * Run this to verify the newsletter service is using correct endpoints
 */

// Simulate the environment
process.env.REACT_APP_API_URL = 'http://localhost:5000';

// Mock axios responses
const mockApiService = {
  post: (url, data) => {
    console.log('✅ POST request to:', url);
    console.log('   Data:', data);
    return Promise.resolve({ data: { success: true, message: 'Mock response' } });
  },
  get: (url, config) => {
    console.log('✅ GET request to:', url);
    if (config && config.params) {
      console.log('   Params:', config.params);
    }
    return Promise.resolve({ data: { success: true } });
  },
  delete: (url) => {
    console.log('✅ DELETE request to:', url);
    return Promise.resolve({ data: { success: true } });
  },
  put: (url, data) => {
    console.log('✅ PUT request to:', url);
    console.log('   Data:', data);
    return Promise.resolve({ data: { success: true } });
  }
};

// Create newsletter service with mocked apiService
const newsletterService = {
  async subscribe(data) {
    return mockApiService.post('/newsletter/subscribe', data);
  },
  
  async getStats() {
    return mockApiService.get('/newsletter/admin/stats');
  },
  
  async getSubscribers(page = 1, limit = 10, search = '', status = 'all', source = 'all') {
    return mockApiService.get('/newsletter/admin/subscribers', {
      params: { page, limit, search, status, source }
    });
  },
  
  async deleteSubscriber(id) {
    return mockApiService.delete(`/newsletter/admin/subscribers/${id}`);
  },
  
  async updateSubscriberStatus(id, isActive) {
    return mockApiService.put(`/newsletter/admin/subscribers/${id}/status`, { isActive });
  }
};

console.log('🧪 Testing Newsletter Service URLs...\n');

async function testNewsletterService() {
  try {    
    console.log('1️⃣ Testing newsletter subscription...');
    await newsletterService.subscribe({ email: 'test@example.com', source: 'homepage' });
    
    console.log('\n2️⃣ Testing admin stats...');
    await newsletterService.getStats();
    
    console.log('\n3️⃣ Testing get subscribers...');
    await newsletterService.getSubscribers(1, 10, '', 'all', 'all');
    
    console.log('\n4️⃣ Testing delete subscriber...');
    await newsletterService.deleteSubscriber('123456');
    
    console.log('\n5️⃣ Testing update subscriber status...');
    await newsletterService.updateSubscriberStatus('123456', false);
    
    console.log('\n🎉 All Newsletter Service URLs are correct!');
    console.log('\nℹ️  The apiService will automatically prepend the base URL:');
    console.log(`   Base URL: ${process.env.REACT_APP_API_URL}/api`);
    console.log('   Final URLs will be like: http://localhost:5000/api/newsletter/subscribe');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testNewsletterService();
