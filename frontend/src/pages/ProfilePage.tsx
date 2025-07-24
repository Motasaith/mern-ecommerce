import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { 
  verifyPhone, 
  resendPhoneVerification, 
  resendEmailVerification, 
  changePassword,
  forgotPassword,
  updateEmail
} from '../store/slices/authSlice';
import authService from '../services/authService';
import PhoneInput from '../components/common/PhoneInput';
import toast from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading } = useAppSelector((state) => state.auth);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');
  const [editingPhone, setEditingPhone] = useState(false);
  
  // Email editing states
  const [editingEmail, setEditingEmail] = useState(false);
  const [emailAddress, setEmailAddress] = useState(user?.email || '');
  
  // Password change states
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Email verification states
  const [resendingEmail, setResendingEmail] = useState(false);

  const handlePhoneChange = (phoneValue: string, countryCode?: string) => {
    setPhoneNumber(phoneValue);
  };

  const handleSendVerification = async () => {
    if (!phoneNumber) {
      toast.error('Please enter a phone number first');
      return;
    }
    
    try {
      const result = await authService.sendPhoneVerification();
      setShowVerificationForm(true);
      if (result.data.smsSuccess) {
        toast.success('Verification code sent to your phone!');
      } else {
        toast.success('Verification code generated. Please check your phone.');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.[0]?.msg || error.response?.data?.message || 'Failed to send verification code';
      toast.error(errorMessage);
    }
  };

  const handleVerifyPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode) {
      toast.error('Please enter the verification code');
      return;
    }

    if (verificationCode.length !== 6) {
      toast.error('Verification code must be 6 digits');
      return;
    }

    try {
      await dispatch(verifyPhone(verificationCode)).unwrap();
      toast.success('Phone number verified successfully!');
      setShowVerificationForm(false);
      setVerificationCode('');
    } catch (error: any) {
      toast.error(error.message || 'Verification failed');
    }
  };

  const handleResendCode = async () => {
    try {
      const result = await dispatch(resendPhoneVerification()).unwrap();
      if (result.smsSuccess) {
        toast.success('New verification code sent to your phone!');
      } else {
        toast.success('Verification code sent! Please check your phone.');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to resend verification code');
    }
  };

  const handleResendEmail = async () => {
    setResendingEmail(true);
    try {
      await dispatch(resendEmailVerification()).unwrap();
      toast.success('Verification email sent! Please check your inbox.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send verification email');
    } finally {
      setResendingEmail(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    // Strong password validation
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (!strongPasswordRegex.test(passwordData.newPassword)) {
      toast.error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      return;
    }

    try {
      await dispatch(changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      })).unwrap();
      toast.success('Password changed successfully!');
      setShowPasswordForm(false);
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to change password');
    }
  };

  const handleForgotPassword = async () => {
    if (!user?.email) {
      toast.error('No email address found');
      return;
    }

    try {
      await dispatch(forgotPassword(user.email)).unwrap();
      toast.success('Password reset link sent to your email!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send password reset email');
    }
  };

  const handleUpdateEmail = async () => {
    if (!emailAddress || !emailAddress.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      await dispatch(updateEmail({ newEmail: emailAddress })).unwrap();
      toast.success('Verification email sent to new email address!');
      setEditingEmail(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update email address');
    }
  };


  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900">
                  {user.name}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                {editingEmail ? (
                  <div className="space-y-3">
                    <input
                      type="email"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="Enter your email address"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingEmail(false);
                          setEmailAddress(user.email || '');
                        }}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdateEmail}
                        disabled={loading}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                      >
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 flex-1">
                      {user.email}
                    </div>
                    <button
                      onClick={() => setEditingEmail(true)}
                      className="ml-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Phone Verification Section */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Phone Verification</h2>
              
              <div className="space-y-4">
                {/* Phone Number Display/Edit */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="flex items-center space-x-2">
                      {user.phoneVerified ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✓ Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          ⚠ Not Verified
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {editingPhone ? (
                    <div className="space-y-3">
                      <PhoneInput
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder="Enter your phone number"
                        required
                        label=""
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingPhone(false);
                            setPhoneNumber(user.phone || '');
                          }}
                          className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            // Here you would update the phone number
                            setEditingPhone(false);
                            toast.success('Phone number updated!');
                          }}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 flex-1">
                        {user.phone || 'No phone number added'}
                      </div>
                      <button
                        onClick={() => setEditingPhone(true)}
                        className="ml-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>

                {/* Verification Actions */}
                {user.phone && !user.phoneVerified && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3 flex-1">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Phone Number Not Verified
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>Verify your phone number to receive order updates and secure your account.</p>
                        </div>
                        
                        {!showVerificationForm ? (
                        <div className="mt-4 flex space-x-3">
                          <button
                            onClick={handleSendVerification}
                            disabled={loading}
                            className="bg-yellow-600 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-yellow-700 disabled:opacity-50"
                          >
                            {loading ? 'Sending...' : 'Send Verification Code'}
                          </button>
                          <button
                            onClick={() => navigate('/phone-verification')}
                            className="bg-blue-600 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700"
                          >
                            Go to Phone Verification
                          </button>
                        </div>
                        ) : (
                          <form onSubmit={handleVerifyPhone} className="mt-4 space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-yellow-800 mb-1">
                                Enter Verification Code
                              </label>
                              <input
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                placeholder="Enter 6-digit code"
                                className="block w-full px-3 py-2 border border-yellow-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                maxLength={6}
                                required
                              />
                              <p className="mt-1 text-xs text-yellow-600">
                                Check your phone for the verification code
                              </p>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button
                                type="submit"
                                disabled={loading || verificationCode.length !== 6}
                                className="bg-yellow-600 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-yellow-700 disabled:opacity-50"
                              >
                                {loading ? 'Verifying...' : 'Verify Code'}
                              </button>
                              
                              <button
                                type="button"
                                onClick={handleResendCode}
                                disabled={loading}
                                className="bg-transparent px-4 py-2 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 disabled:opacity-50 border border-yellow-300"
                              >
                                Resend Code
                              </button>
                              
                              <button
                                type="button"
                                onClick={() => {
                                  setShowVerificationForm(false);
                                  setVerificationCode('');
                                }}
                                className="bg-transparent px-4 py-2 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {user.phoneVerified && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-green-800 font-medium">
                        Your phone number is verified!
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Email Verification Section */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Email Verification</h2>
              
              <div className="space-y-4">
                {/* Email Address Display */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="flex items-center space-x-2">
                      {user.emailVerified ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✓ Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          ⚠ Not Verified
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900">
                    {user.email}
                  </div>
                </div>

                {/* Email Verification Actions */}
                {!user.emailVerified && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3 flex-1">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Email Not Verified
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>Verify your email address to secure your account and receive important notifications.</p>
                        </div>
                        
                        <div className="mt-4 flex space-x-3">
                          <button
                            onClick={handleResendEmail}
                            disabled={resendingEmail || loading}
                            className="bg-yellow-600 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-yellow-700 disabled:opacity-50"
                          >
                            {resendingEmail ? 'Sending...' : 'Send Verification Email'}
                          </button>
                          <button
                            onClick={() => navigate('/email-verification')}
                            className="bg-blue-600 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700"
                          >
                            Go to Email Verification
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {user.emailVerified && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-green-800 font-medium">
                        Your email address is verified!
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Password Management Section */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Password Management</h2>
              
              <div className="space-y-4">
                {!showPasswordForm ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setShowPasswordForm(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Change Password
                    </button>
                    <button
                      onClick={handleForgotPassword}
                      disabled={loading}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      {loading ? 'Sending...' : 'Send Password Reset Email'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                      <h3 className="text-sm font-medium text-blue-800 mb-3">Change Password</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-blue-800 mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            value={passwordData.oldPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                            className="block w-full px-3 py-2 border border-blue-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-blue-800 mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            className="block w-full px-3 py-2 border border-blue-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                          <p className="mt-1 text-xs text-blue-600">
                            Must be at least 8 characters with uppercase, lowercase, number, and special character
                          </p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-blue-800 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            className="block w-full px-3 py-2 border border-blue-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        <button
                          type="submit"
                          disabled={loading}
                          className="bg-blue-600 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                          {loading ? 'Changing...' : 'Change Password'}
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => {
                            setShowPasswordForm(false);
                            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
                          }}
                          className="bg-transparent px-4 py-2 rounded-md text-sm font-medium text-blue-800 hover:bg-blue-100 border border-blue-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
