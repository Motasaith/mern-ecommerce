const axios = require('axios');

async function testSMS77Only() {
  const phoneNumber = '+923363855120';
  const message = 'Your verification code is: 123456. This code will expire in 10 minutes. Do not share this code with anyone.';
  const rapidApiKey = process.env.RAPIDAPI_KEY || '98a62ec97dmsh6939d0adc295ef0p19d612jsnf9616a8531a0';
  
  console.log('📱 Testing SMS77 API Only...\n');
  console.log('Phone:', phoneNumber);
  console.log('Message:', message);
  console.log('API Key:', rapidApiKey ? 'Present' : 'Missing');
  console.log('=' .repeat(60));

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
    
    // SMS77 returns "900" for success
    if (sms77Response.data && (sms77Response.data === '900' || sms77Response.data === 900)) {
      console.log('🎉 SUCCESS! SMS should be sent to your phone!');
      console.log('📱 Please check your Ufone number for the SMS');
    } else {
      console.log('❌ SMS may not have been sent. Response code:', sms77Response.data);
    }
    
  } catch (error) {
    console.log('❌ SMS77 Error:', error.response?.data || error.message);
  }

  console.log('\n' + '=' .repeat(60));
  console.log('✨ SMS77 Test completed!');
}

testSMS77Only();
