const axios = require('axios');

async function testSMSRegistration() {
  try {
    console.log('🧪 Testing SMS Registration...\n');
    
    const testUser = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`, // Unique email
      password: 'password123',
      phone: '+923363855120' // Pakistan number
    };
    
    console.log('📝 Registering user:', testUser);
    
    const response = await axios.post('http://localhost:5000/api/auth/register', testUser, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Registration Response (Full):', JSON.stringify(response.data, null, 2));
    console.log('📋 DevCode present:', !!response.data.devCode);
    console.log('📋 NodeEnv:', response.data.nodeEnv);
    
    if (response.data.phoneVerificationRequired) {
      console.log('📱 SMS verification is required');
      console.log('🔑 Check the backend console for the verification code');
      
      if (response.data.devCode) {
        console.log('🚀 Dev Code:', response.data.devCode);
      }
    }
    
  } catch (error) {
    console.error('❌ Registration failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Test phone validation
async function testPhoneValidation() {
  try {
    console.log('\n📞 Testing phone validation...\n');
    
    const testPhone = {
      phone: '+923363855120',
      countryCode: 'PK'
    };
    
    const response = await axios.post('http://localhost:5000/api/auth/test-phone-validation', testPhone, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Phone validation response:', response.data);
    
  } catch (error) {
    console.error('❌ Phone validation failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting SMS Service Tests\n');
  console.log('=' .repeat(50));
  
  await testPhoneValidation();
  
  console.log('\n' + '=' .repeat(50));
  
  await testSMSRegistration();
  
  console.log('\n' + '=' .repeat(50));
  console.log('✨ Tests completed!');
  console.log('Check the backend console for SMS verification codes');
}

runTests();
