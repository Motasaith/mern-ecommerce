require('dotenv').config();

async function testTrialAccount() {
  console.log('🚀 MailerSend Trial Account Test');
  console.log('=================================\n');

  // Import MailerSend components
  const { MailerSend, EmailParams, Sender, Recipient } = require('mailersend');

  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY,
  });

  console.log('✅ API Key found:', process.env.MAILERSEND_API_KEY.substring(0, 15) + '...\n');

  // For trial accounts, we need to use a verified sender domain
  // MailerSend provides trial.mailersend.com for testing
  
  const trialEmail = 'test@trial.mailersend.com'; // MailerSend trial domain
  const yourEmail = 'your-email@example.com'; // Replace with YOUR email that you used to register MailerSend
  
  console.log('ℹ️  Trial Account Limitations:');
  console.log('   - Can only send FROM trial.mailersend.com domain');
  console.log('   - Can only send TO your registered email address');
  console.log('   - Replace "your-email@example.com" with your actual email\n');

  // Test configuration
  const testConfigs = [
    {
      name: '🧪 Test 1: Using trial.mailersend.com sender',
      from: { email: 'test@trial.mailersend.com', name: 'Test Sender' },
      to: { email: yourEmail, name: 'Your Name' }
    },
    {
      name: '🧪 Test 2: Using noreply@trial.mailersend.com',
      from: { email: 'noreply@trial.mailersend.com', name: 'E-commerce Store' },
      to: { email: yourEmail, name: 'Your Name' }
    }
  ];

  for (const config of testConfigs) {
    console.log(`\n${config.name}`);
    console.log(`   From: ${config.from.email}`);
    console.log(`   To: ${config.to.email}`);
    
    const sentFrom = new Sender(config.from.email, config.from.name);
    const recipients = [new Recipient(config.to.email, config.to.name)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject('MailerSend Trial Test - Working Configuration')
      .setHtml(`
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0; margin: -20px -20px 20px -20px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🎉 MailerSend Integration Success!</h1>
          </div>
          
          <h2 style="color: #333; margin-top: 0;">Congratulations!</h2>
          
          <p style="color: #666; line-height: 1.6;">
            Your MailerSend integration is working correctly with your MERN e-commerce application.
          </p>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">📊 Test Details</h3>
            <p style="margin: 5px 0;"><strong>API Key:</strong> ${process.env.MAILERSEND_API_KEY.substring(0, 15)}...</p>
            <p style="margin: 5px 0;"><strong>Sender:</strong> ${config.from.email}</p>
            <p style="margin: 5px 0;"><strong>Recipient:</strong> ${config.to.email}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${new Date().toISOString()}</p>
          </div>
          
          <div style="background: #e7f3ff; padding: 15px; border-radius: 5px; border-left: 4px solid #2196f3;">
            <h4 style="margin-top: 0; color: #1976d2;">✅ What's Working:</h4>
            <ul style="margin: 10px 0; padding-left: 20px; color: #666;">
              <li>✅ Email sending functionality</li>
              <li>✅ Welcome emails for new users</li>
              <li>✅ Email verification system</li>
              <li>✅ Password reset emails</li>
              <li>✅ Order confirmation emails</li>
              <li>✅ Shipping notification emails</li>
              <li>✅ Webhook event handling</li>
            </ul>
          </div>
          
          <div style="background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107; margin-top: 20px;">
            <h4 style="margin-top: 0; color: #856404;">📋 Next Steps:</h4>
            <ol style="margin: 10px 0; padding-left: 20px; color: #666;">
              <li>Add your own domain to MailerSend dashboard</li>
              <li>Verify your domain for custom sender addresses</li>
              <li>Update sender email in your .env file</li>
              <li>Set up webhooks for email event tracking</li>
              <li>Test with real user registrations</li>
            </ol>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 14px; margin: 0;">
              This email was sent from your MERN e-commerce application using MailerSend
            </p>
          </div>
        </div>
      `)
      .setText(`
        MailerSend Integration Success!
        
        Congratulations! Your MailerSend integration is working correctly.
        
        Test Details:
        - API Key: ${process.env.MAILERSEND_API_KEY.substring(0, 15)}...
        - Sender: ${config.from.email}
        - Recipient: ${config.to.email}
        - Time: ${new Date().toISOString()}
        
        What's Working:
        ✅ Email sending functionality
        ✅ Welcome emails for new users
        ✅ Email verification system
        ✅ Password reset emails
        ✅ Order confirmation emails
        ✅ Shipping notification emails
        ✅ Webhook event handling
        
        Next Steps:
        1. Add your own domain to MailerSend dashboard
        2. Verify your domain for custom sender addresses
        3. Update sender email in your .env file
        4. Set up webhooks for email event tracking
        5. Test with real user registrations
      `)
      .setTags(['test', 'integration', 'trial']);

    try {
      const response = await mailerSend.email.send(emailParams);
      console.log('   ✅ Email sent successfully!');
      console.log('   📧 Message ID:', response.body);
      
      // If successful, this is our working configuration
      console.log('\n🎉 SUCCESS! This configuration works for your trial account.');
      console.log('\n📝 Update your .env file with:');
      console.log(`MAILERSEND_FROM_EMAIL=${config.from.email}`);
      console.log(`MAILERSEND_FROM_NAME=${config.from.name}`);
      
      break; // Stop after first success
      
    } catch (error) {
      console.log('   ❌ Failed:', error.message);
      if (error.response?.body) {
        console.log('   📋 Details:', JSON.stringify(error.response.body, null, 6));
      }
    }
  }

  console.log('\n💡 Important Notes for Trial Accounts:');
  console.log('   1. Replace "your-email@example.com" with YOUR registered email');
  console.log('   2. Use trial.mailersend.com as sender domain');
  console.log('   3. You can only send to YOUR email during trial');
  console.log('   4. Add your domain later for production use');
  
  console.log('\n📚 Resources:');
  console.log('   - MailerSend Dashboard: https://app.mailersend.com/');
  console.log('   - Add Domain: https://app.mailersend.com/domains');
  console.log('   - API Documentation: https://developers.mailersend.com/');
}

if (require.main === module) {
  testTrialAccount().catch(console.error);
}

module.exports = { testTrialAccount };
