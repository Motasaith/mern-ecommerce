const express = require('express');
const crypto = require('crypto');
const User = require('../models/User');
const router = express.Router();

// Middleware to verify MailerSend webhook signature
const verifyMailerSendWebhook = (req, res, next) => {
  const signature = req.headers['x-mailersend-signature'];
  const timestamp = req.headers['x-mailersend-timestamp'];
  
  if (!signature || !timestamp) {
    return res.status(401).json({ error: 'Missing webhook signature or timestamp' });
  }

  // Create the signature payload
  const payload = timestamp + '.' + JSON.stringify(req.body);
  
  // Generate expected signature
  const expectedSignature = crypto
    .createHmac('sha256', process.env.MAILERSEND_WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');

  // Compare signatures
  if (signature !== expectedSignature) {
    console.error('Invalid webhook signature');
    return res.status(401).json({ error: 'Invalid signature' });
  }

  next();
};

// @route    POST api/webhooks/mailersend
// @desc     Handle MailerSend webhook events
// @access   Public (but verified)
router.post('/mailersend', express.raw({ type: 'application/json' }), verifyMailerSendWebhook, async (req, res) => {
  try {
    const events = Array.isArray(req.body) ? req.body : [req.body];
    
    console.log(`Received ${events.length} webhook event(s) from MailerSend`);

    for (const event of events) {
      await processMailerSendEvent(event);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Process individual MailerSend events
async function processMailerSendEvent(event) {
  const { type, data } = event;
  
  console.log(`Processing MailerSend event: ${type}`, {
    messageId: data.message_id,
    email: data.email,
    timestamp: data.timestamp
  });

  try {
    switch (type) {
      case 'sent':
        await handleEmailSent(data);
        break;
      case 'delivered':
        await handleEmailDelivered(data);
        break;
      case 'opened':
        await handleEmailOpened(data);
        break;
      case 'clicked':
        await handleEmailClicked(data);
        break;
      case 'bounced':
        await handleEmailBounced(data);
        break;
      case 'complaints':
        await handleEmailComplaint(data);
        break;
      case 'unsubscribed':
        await handleEmailUnsubscribed(data);
        break;
      default:
        console.log(`Unhandled event type: ${type}`);
    }
  } catch (error) {
    console.error(`Error processing ${type} event:`, error);
  }
}

// Handle email sent event
async function handleEmailSent(data) {
  console.log(`Email sent successfully to ${data.email}`, {
    messageId: data.message_id,
    subject: data.subject
  });
  
  // You could store this in a separate EmailLog model if needed
  // For now, just log it
}

// Handle email delivered event
async function handleEmailDelivered(data) {
  console.log(`Email delivered successfully to ${data.email}`, {
    messageId: data.message_id,
    timestamp: data.timestamp
  });
}

// Handle email opened event
async function handleEmailOpened(data) {
  console.log(`Email opened by ${data.email}`, {
    messageId: data.message_id,
    timestamp: data.timestamp,
    userAgent: data.user_agent
  });
  
  // You could track open rates per user
  try {
    const user = await User.findOne({ email: data.email });
    if (user) {
      // Could add email engagement tracking fields to user model
      console.log(`Email engagement recorded for user: ${user.name}`);
    }
  } catch (error) {
    console.error('Error tracking email open:', error);
  }
}

// Handle email clicked event
async function handleEmailClicked(data) {
  console.log(`Email link clicked by ${data.email}`, {
    messageId: data.message_id,
    url: data.url,
    timestamp: data.timestamp
  });
}

// Handle email bounced event
async function handleEmailBounced(data) {
  console.log(`Email bounced for ${data.email}`, {
    messageId: data.message_id,
    reason: data.reason,
    type: data.type // hard_bounce or soft_bounce
  });
  
  try {
    const user = await User.findOne({ email: data.email });
    if (user && data.type === 'hard_bounce') {
      // For hard bounces, you might want to mark the email as invalid
      console.log(`Hard bounce detected for user ${user.name}, consider marking email as invalid`);
      // user.emailValid = false;
      // await user.save();
    }
  } catch (error) {
    console.error('Error handling email bounce:', error);
  }
}

// Handle email complaint (spam report) event
async function handleEmailComplaint(data) {
  console.log(`Spam complaint received for ${data.email}`, {
    messageId: data.message_id,
    timestamp: data.timestamp
  });
  
  try {
    const user = await User.findOne({ email: data.email });
    if (user) {
      console.log(`Spam complaint from user ${user.name}, consider adding to suppression list`);
      // You might want to automatically add to suppression list
      // await mailerSendService.suppressEmail(data.email, 'spam');
    }
  } catch (error) {
    console.error('Error handling spam complaint:', error);
  }
}

// Handle unsubscribe event
async function handleEmailUnsubscribed(data) {
  console.log(`User unsubscribed: ${data.email}`, {
    messageId: data.message_id,
    timestamp: data.timestamp
  });
  
  try {
    const user = await User.findOne({ email: data.email });
    if (user) {
      // You could add an unsubscribed flag to the user model
      console.log(`User ${user.name} unsubscribed from emails`);
      // user.emailSubscribed = false;
      // await user.save();
    }
  } catch (error) {
    console.error('Error handling unsubscribe:', error);
  }
}

// @route    GET api/webhooks/mailersend/test
// @desc     Test endpoint for webhook setup
// @access   Public
router.get('/mailersend/test', (req, res) => {
  res.json({ 
    status: 'MailerSend webhook endpoint is active',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
