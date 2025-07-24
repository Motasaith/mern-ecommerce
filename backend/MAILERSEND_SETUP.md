# MailerSend Setup Guide for MERN E-commerce

## 🚀 Quick Setup Steps

### 1. Domain Verification (Required)
Since you're getting the error "The from.email domain must be verified", you need to:

1. **Go to MailerSend Dashboard**: https://app.mailersend.com/domains
2. **Add Your Domain**: Click "Add domain" 
   - If you have a domain: Use `yourdomain.com`
   - If you don't have a domain: You can use a free service like `netlify.app` or `vercel.app`
3. **Verify DNS Records**: Add the provided DNS records to your domain
4. **Wait for Verification**: Usually takes a few minutes

### 2. Alternative: Use MailerSend's Sandbox Domain
For immediate testing, MailerSend should provide a sandbox domain. Check your dashboard for:
- `sandbox-xxx.mailersend.com` 
- Use this as your sender domain

## 🔧 Current Implementation Status

✅ **What's Already Implemented:**
- Complete MailerSend service integration
- Email verification system
- Welcome emails for new users
- Password reset emails
- Order confirmation emails
- Shipping notification emails
- Webhook handling for email events
- User profile email verification endpoints

## 📧 Email Types Implemented

### 1. Welcome Email (Registration)
- Sent automatically when user registers
- Includes email verification link
- Beautiful HTML template with your branding

### 2. Email Verification
- Separate verification emails
- Available in user profile
- Rate-limited to prevent spam
- Token-based verification

### 3. Password Reset
- Secure token-based reset
- Time-limited (1 hour expiry)
- Professional email template

### 4. Order Confirmation
- Sent automatically after order placement
- Includes order details table
- Professional receipt format

### 5. Shipping Notification
- Sent when order ships
- Includes tracking information
- Tracking URL if provided

## 🔌 API Endpoints Available

### Authentication Endpoints
```
POST /api/auth/register          - Register user (sends welcome email)
POST /api/auth/verify-email      - Verify email with token
POST /api/auth/forgot-password   - Request password reset
POST /api/auth/reset-password    - Reset password with token
```

### User Profile Endpoints
```
GET  /api/users/email-verification-status     - Check verification status
POST /api/users/send-email-verification       - Send verification email
```

### Order Endpoints
```
POST /api/orders                 - Create order (sends confirmation email)
PUT  /api/orders/:id/ship        - Mark as shipped (sends shipping email)
```

### Webhook Endpoints
```
POST /api/webhooks/mailersend    - Handle MailerSend events
GET  /api/webhooks/mailersend/test - Test webhook endpoint
```

## 🎨 Frontend Integration

### User Profile Email Verification UI

Add this to your user profile component:

```jsx
// Email Verification Component
import React, { useState, useEffect } from 'react';

const EmailVerification = ({ user }) => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchVerificationStatus();
  }, []);
  
  const fetchVerificationStatus = async () => {
    try {
      const response = await fetch('/api/users/email-verification-status', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setVerificationStatus(data);
    } catch (error) {
      console.error('Error fetching verification status:', error);
    }
  };
  
  const sendVerificationEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users/send-email-verification', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      
      if (response.ok) {
        alert('Verification email sent successfully!');
        fetchVerificationStatus();
      } else {
        alert(data.errors?.[0]?.msg || 'Failed to send verification email');
      }
    } catch (error) {
      alert('Error sending verification email');
    } finally {
      setLoading(false);
    }
  };
  
  if (!verificationStatus) return <div>Loading...</div>;
  
  return (
    <div className="email-verification-section">
      <h3>Email Verification</h3>
      
      <div className="verification-status">
        <span>Email: {user.email}</span>
        {verificationStatus.emailVerified ? (
          <span className="verified-badge">✅ Verified</span>
        ) : (
          <span className="unverified-badge">⚠️ Not Verified</span>
        )}
      </div>
      
      {!verificationStatus.emailVerified && (
        <div className="verification-actions">
          <p>Verify your email address to receive order updates and secure your account.</p>
          <button 
            onClick={sendVerificationEmail}
            disabled={loading || !verificationStatus.canResendEmail}
            className="send-verification-btn"
          >
            {loading ? 'Sending...' : 'Send Verification Email'}
          </button>
          
          {!verificationStatus.canResendEmail && (
            <p className="rate-limit-msg">
              Please wait before requesting another verification email
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
```

### CSS Styles
```css
.email-verification-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.verification-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.verified-badge {
  background: #d4edda;
  color: #155724;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
}

.unverified-badge {
  background: #fff3cd;
  color: #856404;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
}

.send-verification-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.send-verification-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}
```

## 🧪 Testing After Domain Verification

Once your domain is verified, test with:

```bash
node test-email-verification.js
```

## 📊 Email Analytics

MailerSend provides detailed analytics:
- Delivery rates
- Open rates  
- Click rates
- Bounce rates
- Complaint rates

Access at: https://app.mailersend.com/analytics

## 🔒 Security Features

✅ **Implemented Security:**
- Rate limiting on verification emails (1 per minute)
- Secure token generation (crypto.randomBytes)
- Email verification expiry
- Password reset token expiry (1 hour)
- Webhook signature verification
- Input validation and sanitization

## 🚀 Next Steps

1. **Verify your domain** in MailerSend dashboard
2. **Update** `MAILERSEND_FROM_EMAIL` in `.env` to use your verified domain
3. **Test** email functionality
4. **Add** email verification UI to your frontend
5. **Set up** webhooks for event tracking
6. **Monitor** email delivery in MailerSend dashboard

## 📞 Support

- MailerSend Documentation: https://developers.mailersend.com/
- MailerSend Support: https://app.mailersend.com/support
- Dashboard: https://app.mailersend.com/

---

**Your MailerSend integration is complete and ready to use once domain verification is done!** 🎉
