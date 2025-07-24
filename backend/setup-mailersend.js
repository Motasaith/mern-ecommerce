require('dotenv').config();
const { MailerSend } = require('mailersend');

async function setupMailerSend() {
  console.log('🚀 MailerSend Setup & Configuration Helper');
  console.log('==========================================\n');

  if (!process.env.MAILERSEND_API_KEY) {
    console.error('❌ MAILERSEND_API_KEY not found in environment variables');
    process.exit(1);
  }

  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY,
  });

  console.log('✅ API Key found:', process.env.MAILERSEND_API_KEY.substring(0, 15) + '...\n');

  try {
    // Check account details
    console.log('📊 Fetching account information...');
    const accountInfo = await mailerSend.others.getApiQuota();
    console.log('📈 API Quota Info:', JSON.stringify(accountInfo.body, null, 2));
    
  } catch (error) {
    console.error('❌ Error fetching account info:', error.message);
  }

  try {
    // Get domains
    console.log('\n🌐 Fetching your domains...');
    const domains = await mailerSend.domains.list();
    
    if (domains.body.data && domains.body.data.length > 0) {
      console.log('✅ Found domains:');
      domains.body.data.forEach((domain, index) => {
        console.log(`   ${index + 1}. ${domain.name}`);
        console.log(`      Status: ${domain.domain_settings.send_paused ? '⏸️  Paused' : '✅ Active'}`);
        console.log(`      Verified: ${domain.domain_settings.custom_tracking_enabled ? '✅' : '❌'}`);
        console.log(`      ID: ${domain.id}`);
        console.log('');
      });
      
      // Update .env with first domain
      const firstDomain = domains.body.data[0];
      console.log(`💡 Recommended sender email: noreply@${firstDomain.name}`);
      console.log(`💡 Domain ID for webhooks: ${firstDomain.id}`);
      
    } else {
      console.log('⚠️  No domains found. You need to add a domain in your MailerSend dashboard.');
      console.log('   Go to: https://app.mailersend.com/domains');
    }
  } catch (error) {
    console.error('❌ Error fetching domains:', error.message);
  }

  // Check if this is a trial account
  console.log('\n🔍 Checking account limitations...');
  console.log('ℹ️  Trial accounts have the following limitations:');
  console.log('   - Can only send to verified email addresses');
  console.log('   - Need to verify your domain');
  console.log('   - Limited sending volume');
  
  console.log('\n📋 Next Steps:');
  console.log('1. 🌐 Add and verify your domain at: https://app.mailersend.com/domains');
  console.log('2. 📧 Add your email address as a verified recipient');
  console.log('3. 🔧 Update your .env file with:');
  console.log('   - MAILERSEND_FROM_EMAIL=noreply@yourdomain.com');
  console.log('   - MAILERSEND_DOMAIN_ID=your_domain_id');
  console.log('4. 🧪 Test with your verified email address');
  
  console.log('\n💡 For immediate testing, you can:');
  console.log('   - Use your registered MailerSend account email as both sender and recipient');
  console.log('   - This bypasses trial restrictions for testing');
}

// Function to test with a specific email
async function testWithEmail(email) {
  console.log(`\n🧪 Testing MailerSend with email: ${email}`);
  
  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY,
  });

  const { MailerSend: MS, EmailParams, Sender, Recipient } = require('mailersend');
  
  const sentFrom = new Sender(email, 'Test Sender'); // Use same email as sender
  const recipients = [new Recipient(email, 'Test Recipient')];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject('MailerSend Test - Same Email')
    .setHtml(`
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #667eea;">MailerSend Test Email</h2>
        <p>✅ This is a test email sent using the same email as sender and recipient.</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        <p><strong>API Key:</strong> ${process.env.MAILERSEND_API_KEY.substring(0, 10)}...</p>
      </div>
    `)
    .setText('MailerSend test email - your integration is working!');

  try {
    const response = await mailerSend.email.send(emailParams);
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', response.body);
    return true;
  } catch (error) {
    console.error('❌ Test email failed:', error.message);
    if (error.response) {
      console.log('📋 Error details:', JSON.stringify(error.response.body, null, 2));
    }
    return false;
  }
}

// Interactive setup
async function interactiveSetup() {
  await setupMailerSend();
  
  console.log('\n❓ Would you like to test with a specific email address?');
  console.log('   Enter your verified email address to test sending:');
  
  // For now, let's test with a common setup
  console.log('\n🔧 Creating a working test configuration...');
  
  // Test with mailersend sandbox domain (if available)
  const testEmails = [
    'test@mailersend.com', // MailerSend test domain
    'noreply@mailersend.com',
  ];
  
  for (const email of testEmails) {
    console.log(`\n🧪 Trying with ${email}...`);
    const success = await testWithEmail(email);
    if (success) {
      console.log(`✅ Success with ${email}!`);
      break;
    }
  }
}

if (require.main === module) {
  interactiveSetup().catch(console.error);
}

module.exports = { setupMailerSend, testWithEmail };
