require('dotenv').config();
const mailerSendService = require('./services/mailersend');

async function testMailerSend() {
  console.log('🚀 Testing MailerSend Integration...\n');
  
  // Test basic email sending
  console.log('📧 Testing basic email sending...');
  
  const testEmail = {
    to: 'test@example.com', // Replace with your test email
    toName: 'Test User',
    subject: 'MailerSend Test Email',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: #667eea; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">MailerSend Integration Test</h1>
        </div>
        <div style="padding: 30px;">
          <h2>✅ Success!</h2>
          <p>Your MailerSend integration is working correctly.</p>
          <p><strong>API Key:</strong> ${process.env.MAILERSEND_API_KEY ? 'Found' : 'Missing'}</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        </div>
      </div>
    `,
    text: `
      MailerSend Integration Test
      
      Success! Your MailerSend integration is working correctly.
      
      API Key: ${process.env.MAILERSEND_API_KEY ? 'Found' : 'Missing'}
      Time: ${new Date().toISOString()}
    `,
    tags: ['test', 'integration']
  };

  try {
    const result = await mailerSendService.sendEmail(testEmail);
    
    if (result.success) {
      console.log('✅ Email sent successfully!');
      console.log('📧 Message ID:', result.messageId);
      console.log('📊 Response:', result.response);
    } else {
      console.log('❌ Email sending failed');
      console.log('🔍 Error:', result.error);
      console.log('📋 Details:', result.details);
    }
  } catch (error) {
    console.error('💥 Test failed with error:', error.message);
    console.error('📋 Full error:', error);
  }
  
  console.log('\n🏁 Test completed');
}

// Test user registration email
async function testWelcomeEmail() {
  console.log('\n📧 Testing welcome email...');
  
  const testUser = {
    name: 'Test User',
    email: 'test@example.com' // Replace with your test email
  };
  
  const verificationToken = 'test-token-123';
  
  try {
    const result = await mailerSendService.sendWelcomeEmail(testUser, verificationToken);
    
    if (result.success) {
      console.log('✅ Welcome email sent successfully!');
      console.log('📧 Message ID:', result.messageId);
    } else {
      console.log('❌ Welcome email failed');
      console.log('🔍 Error:', result.error);
    }
  } catch (error) {
    console.error('💥 Welcome email test failed:', error.message);
  }
}

// Test password reset email
async function testPasswordResetEmail() {
  console.log('\n📧 Testing password reset email...');
  
  const testUser = {
    name: 'Test User',
    email: 'test@example.com' // Replace with your test email
  };
  
  const resetToken = 'reset-token-123';
  
  try {
    const result = await mailerSendService.sendPasswordResetEmail(testUser, resetToken);
    
    if (result.success) {
      console.log('✅ Password reset email sent successfully!');
      console.log('📧 Message ID:', result.messageId);
    } else {
      console.log('❌ Password reset email failed');
      console.log('🔍 Error:', result.error);
    }
  } catch (error) {
    console.error('💥 Password reset email test failed:', error.message);
  }
}

// Run all tests
async function runAllTests() {
  console.log('🧪 MailerSend Integration Test Suite');
  console.log('=====================================\n');
  
  // Check API key
  if (!process.env.MAILERSEND_API_KEY) {
    console.error('❌ MAILERSEND_API_KEY not found in environment variables');
    process.exit(1);
  }
  
  console.log('✅ API Key found in environment');
  console.log('🔑 API Key:', process.env.MAILERSEND_API_KEY.substring(0, 10) + '...');
  console.log('');
  
  await testMailerSend();
  await testWelcomeEmail();
  await testPasswordResetEmail();
  
  console.log('\n🎉 All tests completed!');
  console.log('\n💡 Tips:');
  console.log('   - Replace test@example.com with your actual email to receive test emails');
  console.log('   - Check your MailerSend dashboard for sent email statistics');
  console.log('   - Verify your domain is properly configured in MailerSend');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  testMailerSend,
  testWelcomeEmail,
  testPasswordResetEmail,
  runAllTests
};
