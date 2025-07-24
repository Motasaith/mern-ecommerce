require('dotenv').config();
const emailService = require('./services/emailService');

async function testBrevoEmailService() {
  console.log('🚀 Testing Brevo Email Service');
  console.log('==============================\n');

  const testUser = {
    name: 'ABDUL RAUF AZHAR',
    email: 'saithmota@gmail.com'
  };

  console.log('📧 Testing email functionality for:', testUser.email);
  console.log('');

  // Test 1: Welcome Email
  console.log('1️⃣ Testing Welcome Email...');
  try {
    const welcomeResult = await emailService.sendWelcomeEmail(testUser, 'welcome-token-123');
    if (welcomeResult.success) {
      console.log('   ✅ Welcome email sent successfully!');
      console.log('   📧 Message ID:', welcomeResult.messageId);
    } else {
      console.log('   ❌ Welcome email failed:', welcomeResult.error);
    }
  } catch (error) {
    console.log('   💥 Welcome email error:', error.message);
  }
  console.log('');

  // Test 2: Email Verification
  console.log('2️⃣ Testing Email Verification...');
  try {
    const verificationResult = await emailService.sendEmailVerification(testUser, 'verify-token-456');
    if (verificationResult.success) {
      console.log('   ✅ Email verification sent successfully!');
      console.log('   📧 Message ID:', verificationResult.messageId);
    } else {
      console.log('   ❌ Email verification failed:', verificationResult.error);
    }
  } catch (error) {
    console.log('   💥 Email verification error:', error.message);
  }
  console.log('');

  // Test 3: Password Reset
  console.log('3️⃣ Testing Password Reset Email...');
  try {
    const resetResult = await emailService.sendPasswordResetEmail(testUser, 'reset-token-789');
    if (resetResult.success) {
      console.log('   ✅ Password reset email sent successfully!');
      console.log('   📧 Message ID:', resetResult.messageId);
    } else {
      console.log('   ❌ Password reset email failed:', resetResult.error);
    }
  } catch (error) {
    console.log('   💥 Password reset error:', error.message);
  }
  console.log('');

  // Test 4: Order Confirmation
  console.log('4️⃣ Testing Order Confirmation Email...');
  try {
    const mockOrder = {
      _id: 'ORDER123456',
      items: [
        {
          product: { name: 'Smartphone Case' },
          quantity: 2,
          price: 29.99
        },
        {
          product: { name: 'Wireless Headphones' },
          quantity: 1,
          price: 149.99
        }
      ],
      totalAmount: 209.97
    };

    const orderResult = await emailService.sendOrderConfirmation(testUser, mockOrder);
    if (orderResult.success) {
      console.log('   ✅ Order confirmation email sent successfully!');
      console.log('   📧 Message ID:', orderResult.messageId);
    } else {
      console.log('   ❌ Order confirmation email failed:', orderResult.error);
    }
  } catch (error) {
    console.log('   💥 Order confirmation error:', error.message);
  }
  console.log('');

  // Test 5: Order Shipped
  console.log('5️⃣ Testing Order Shipped Email...');
  try {
    const mockOrder = {
      _id: 'ORDER123456'
    };
    const mockTracking = {
      trackingNumber: 'TRK123456789',
      carrier: 'FedEx',
      trackingUrl: 'https://www.fedex.com/track?trknbr=TRK123456789'
    };

    const shippedResult = await emailService.sendOrderShipped(testUser, mockOrder, mockTracking);
    if (shippedResult.success) {
      console.log('   ✅ Order shipped email sent successfully!');
      console.log('   📧 Message ID:', shippedResult.messageId);
    } else {
      console.log('   ❌ Order shipped email failed:', shippedResult.error);
    }
  } catch (error) {
    console.log('   💥 Order shipped error:', error.message);
  }
  console.log('');

  // Test 6: Marketing Email
  console.log('6️⃣ Testing Marketing Email...');
  try {
    const marketingContent = `
      <h2>🛍️ Special Offer Just for You!</h2>
      <p>Hi ${testUser.name}!</p>
      <p>We have an exclusive offer just for you - <strong>20% OFF</strong> on all electronics!</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="#" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
          🛒 Shop Now
        </a>
      </div>
      <p>This offer expires in 48 hours. Don't miss out!</p>
    `;

    const marketingResult = await emailService.sendMarketingEmail({
      to: testUser.email,
      subject: '🎉 Exclusive 20% OFF Electronics Sale',
      content: marketingContent,
      campaignName: 'Electronics Sale 2024'
    });

    if (marketingResult.success) {
      console.log('   ✅ Marketing email sent successfully!');
      console.log('   📧 Message ID:', marketingResult.messageId);
    } else {
      console.log('   ❌ Marketing email failed:', marketingResult.error);
    }
  } catch (error) {
    console.log('   💥 Marketing email error:', error.message);
  }
  console.log('');

  console.log('🎉 Brevo Email Service Test Completed!');
  console.log('=====================================');
  console.log('');
  console.log('📧 Check your email inbox:', testUser.email);
  console.log('💡 All email types are now integrated into your MERN e-commerce app!');
  console.log('');
  console.log('🔧 Integration Points:');
  console.log('   • User Registration → Welcome Email');
  console.log('   • Email Verification → Verification Email');
  console.log('   • Password Reset → Reset Email');
  console.log('   • Order Placed → Confirmation Email');
  console.log('   • Order Shipped → Shipping Email');
  console.log('   • Marketing Campaigns → Promotional Emails');
}

if (require.main === module) {
  testBrevoEmailService().catch(console.error);
}

module.exports = { testBrevoEmailService };
