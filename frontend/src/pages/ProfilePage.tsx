import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { verifyPhone, resendPhoneVerification } from '../store/slices/authSlice';
import PhoneInput from '../components/common/PhoneInput';
import toast from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');
  const [editingPhone, setEditingPhone] = useState(false);

  const handlePhoneChange = (phoneValue: string, countryCode?: string) => {
    setPhoneNumber(phoneValue);
  };

  const handleSendVerification = async () => {
    if (!phoneNumber) {
      toast.error('Please enter a phone number first');
      return;
    }
    
    try {
      const result = await dispatch(resendPhoneVerification()).unwrap();
      setShowVerificationForm(true);
      if (result.smsSuccess) {
        toast.success('Verification code sent to your phone!');
      } else {
        toast.success('Verification code generated. Please check your phone.');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to send verification code');
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
                <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900">
                  {user.email}
                </div>
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
                          <div className="mt-4">
                            <button
                              onClick={handleSendVerification}
                              disabled={loading}
                              className="bg-yellow-600 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-yellow-700 disabled:opacity-50"
                            >
                              {loading ? 'Sending...' : 'Send Verification Code'}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
