require('dotenv').config();
const mailerSendService = require('./services/mailersend');

async function testEmailVerification() {
  console.log('🧪 Testing Email Verification with your email...\n');

  const testUser = {
    name: 'ABDUL RAUF AZHAR',
    email: 'saithmota@gmail.com'
  };

  const verificationToken = 'test-verification-token-' + Date.now();

  console.log('📧 Sending email verification to:', testUser.email);
  console.log('🔗 Verification token:', verificationToken);

  try {
    const result = await mailerSendService.sendEmailVerification(testUser, verificationToken);
    
    if (result.success) {
      console.log('✅ Email verification sent successfully!');
      console.log('📧 Message ID:', result.messageId);
      console.log('📊 Response:', result.response);
      
      console.log('\n🎉 SUCCESS! Email verification is working!');
      console.log('\n📝 In your frontend, you can now:');
      console.log('1. Call POST /api/users/send-email-verification to send verification');
      console.log('2. Call GET /api/users/email-verification-status to check status');
      console.log('3. Show verification status in user profile');
      
    } else {
      console.log('❌ Email verification failed');
      console.log('🔍 Error:', result.error);
      console.log('📋 Details:', result.details);
    }
  } catch (error) {
    console.error('💥 Test failed with error:', error.message);
  }
}

// Test welcome email too
async function testWelcomeEmail() {
  console.log('\n📧 Testing Welcome Email...');

  const testUser = {
    name: 'ABDUL RAUF AZHAR',
    email: 'saithmota@gmail.com'
  };

  const verificationToken = 'welcome-token-' + Date.now();

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

async function runTests() {
  console.log('🚀 Email Verification Test for MERN E-commerce');
  console.log('===============================================\n');
  
  await testEmailVerification();
  await testWelcomeEmail();
  
  console.log('\n✨ Test completed! Check your email: saithmota@gmail.com');
}

if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testEmailVerification, testWelcomeEmail };
