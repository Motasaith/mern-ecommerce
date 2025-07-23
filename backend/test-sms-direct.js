const axios = require('axios');

async function testSMSAPIs() {
  const phoneNumber = '+923363855120';
  const message = 'Test SMS: Your verification code is 123456';
  const rapidApiKey = process.env.RAPIDAPI_KEY || '98a62ec97dmsh6939d0adc295ef0p19d612jsnf9616a8531a0';
  
  console.log('🧪 Testing Free RapidAPI SMS Services...\n');
  console.log('Phone:', phoneNumber);
  console.log('Message:', message);
  console.log('API Key:', rapidApiKey ? 'Present' : 'Missing');
  console.log('=' .repeat(50));

  // Test 1: SMS77 API
  console.log('\n📱 Testing SMS77 API...');
  try {
    const sms77Response = await axios.post('https://sms77io.p.rapidapi.com/sms', {
      to: phoneNumber,
      text: message,
      from: 'Verify'
    }, {
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'sms77io.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ SMS77 Response:', sms77Response.data);
  } catch (error) {
    console.log('❌ SMS77 Error:', error.response?.data || error.message);
  }

  // Test 2: D7SMS API
  console.log('\n📱 Testing D7SMS API...');
  try {
    const d7Response = await axios.post('https://d7sms.p.rapidapi.com/messages/v1/send', {
      messages: [{
        channel: 'sms',
        recipients: [phoneNumber],
        content: message,
        msg_type: 'text'
      }]
    }, {
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'd7sms.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ D7SMS Response:', d7Response.data);
  } catch (error) {
    console.log('❌ D7SMS Error:', error.response?.data || error.message);
  }

  // Test 3: SMSala API
  console.log('\n📱 Testing SMSala API...');
  try {
    const smsalaResponse = await axios.post('https://smsala.p.rapidapi.com/api/send-sms', {
      number: phoneNumber,
      message: message
    }, {
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'smsala.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ SMSala Response:', smsalaResponse.data);
  } catch (error) {
    console.log('❌ SMSala Error:', error.response?.data || error.message);
  }

  // Test 4: Global SMS API
  console.log('\n📱 Testing Global SMS API...');
  try {
    const globalSmsResponse = await axios.post('https://global-sms-sender.p.rapidapi.com/send', {
      to: phoneNumber,
      message: message
    }, {
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'global-sms-sender.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Global SMS Response:', globalSmsResponse.data);
  } catch (error) {
    console.log('❌ Global SMS Error:', error.response?.data || error.message);
  }

  console.log('\n' + '=' .repeat(50));
  console.log('✨ SMS API Testing completed!');
}

testSMSAPIs();
