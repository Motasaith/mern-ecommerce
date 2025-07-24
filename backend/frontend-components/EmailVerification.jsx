import React, { useState, useEffect } from 'react';
import PasswordStrengthValidator from './PasswordStrengthValidator';
import './EmailVerification.css';

const EmailVerification = ({ user, onVerificationUpdate }) => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success', 'error', 'info'
  
  // Password change state
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    fetchVerificationStatus();
  }, []);

  const fetchVerificationStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users/email-verification-status', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setVerificationStatus(data);
      } else {
        console.error('Failed to fetch verification status');
      }
    } catch (error) {
      console.error('Error fetching verification status:', error);
    }
  };

  const sendVerificationEmail = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users/send-email-verification', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Verification email sent successfully! Please check your inbox.');
        setMessageType('success');
        fetchVerificationStatus(); // Refresh status
      } else {
        const errorMsg = data.errors?.[0]?.msg || 'Failed to send verification email';
        setMessage(errorMsg);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
      setMessageType('error');
      console.error('Error sending verification email:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyClick = () => {
    // Clear any existing messages
    setMessage('');
    sendVerificationEmail();
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('New passwords do not match');
      setMessageType('error');
      return;
    }

    if (!passwordValid) {
      setMessage('Please ensure your new password meets all requirements');
      setMessageType('error');
      return;
    }

    setPasswordLoading(true);
    setMessage('');
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users/change-password', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Password updated successfully!');
        setMessageType('success');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setShowPasswordChange(false);
      } else {
        const errorMsg = data.errors?.[0]?.msg || 'Failed to update password';
        setMessage(errorMsg);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
      setMessageType('error');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handlePasswordInputChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordValidityChange = (isValid, requirements) => {
    setPasswordValid(isValid);
  };

  if (!verificationStatus) {
    return (
      <div className="email-verification-section">
        <div className="loading-spinner">Loading verification status...</div>
      </div>
    );
  }

  return (
    <div className="email-verification-section">
      <div className="verification-header">
        <h3>📧 Email Verification</h3>
      </div>
      
      <div className="verification-content">
        <div className="email-info">
          <div className="email-display">
            <span className="email-label">Email Address:</span>
            <span className="email-address">{user.email}</span>
          </div>
          
          <div className="verification-status">
            {verificationStatus.emailVerified ? (
              <div className="status-badge verified">
                <span className="status-icon">✅</span>
                <span className="status-text">Verified</span>
              </div>
            ) : (
              <div className="status-badge unverified">
                <span className="status-icon">⚠️</span>
                <span className="status-text">Not Verified</span>
              </div>
            )}
          </div>
        </div>

        {!verificationStatus.emailVerified && (
          <div className="verification-actions">
            <div className="action-description">
              <p>
                <strong>Verify your email address</strong> to receive order updates, 
                password reset emails, and secure your account.
              </p>
            </div>
            
            <div className="action-buttons">
              <button 
                onClick={handleVerifyClick}
                disabled={loading || !verificationStatus.canResendEmail}
                className={`verify-button ${loading ? 'loading' : ''}`}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <span className="button-icon">📧</span>
                    Send Verification Email
                  </>
                )}
              </button>
            </div>
            
            {!verificationStatus.canResendEmail && (
              <div className="rate-limit-message">
                <p>
                  ⏳ Please wait before requesting another verification email. 
                  You can send a new one in a minute.
                </p>
              </div>
            )}
          </div>
        )}
        
        {verificationStatus.emailVerified && (
          <div className="verified-message">
            <div className="success-icon">🎉</div>
            <p>
              Your email address is verified! You'll receive all important 
              notifications and updates.
            </p>
          </div>
        )}
        
        {message && (
          <div className={`message ${messageType}`}>
            <div className="message-content">
              {messageType === 'success' && <span className="message-icon">✅</span>}
              {messageType === 'error' && <span className="message-icon">❌</span>}
              {messageType === 'info' && <span className="message-icon">ℹ️</span>}
              <span className="message-text">{message}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="verification-benefits">
        <h4>🚀 Benefits of email verification:</h4>
        <ul>
          <li>🔔 Receive order confirmations and shipping updates</li>
          <li>🔐 Enable password reset functionality</li>
          <li>🎁 Get exclusive offers and promotions</li>
          <li>🛡️ Enhanced account security</li>
        </ul>
      </div>
      
      {/* Password Change Section */}
      <div className="password-change-section">
        <div className="section-header">
          <h3>🔐 Password & Security</h3>
          <button 
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="toggle-password-btn"
          >
            {showPasswordChange ? 'Cancel' : 'Change Password'}
          </button>
        </div>
        
        {showPasswordChange && (
          <div className="password-change-form">
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordInputChange('currentPassword', e.target.value)}
                  required
                  className="form-input"
                  placeholder="Enter your current password"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordInputChange('newPassword', e.target.value)}
                  required
                  className="form-input"
                  placeholder="Enter your new password"
                />
                
                {passwordData.newPassword && (
                  <PasswordStrengthValidator 
                    password={passwordData.newPassword}
                    onValidityChange={handlePasswordValidityChange}
                  />
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordInputChange('confirmPassword', e.target.value)}
                  required
                  className="form-input"
                  placeholder="Confirm your new password"
                />
                
                {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                  <div className="password-mismatch">
                    ❌ Passwords do not match
                  </div>
                )}
                
                {passwordData.confirmPassword && passwordData.newPassword === passwordData.confirmPassword && (
                  <div className="password-match">
                    ✅ Passwords match
                  </div>
                )}
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit"
                  disabled={passwordLoading || !passwordValid || passwordData.newPassword !== passwordData.confirmPassword}
                  className="change-password-btn"
                >
                  {passwordLoading ? (
                    <>
                      <span className="spinner"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      <span className="button-icon">🔐</span>
                      Update Password
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
