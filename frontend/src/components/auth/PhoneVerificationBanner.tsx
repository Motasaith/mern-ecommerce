import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { verifyPhone, resendPhoneVerification } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

const PhoneVerificationBanner: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  if (!user || user.phoneVerified) {
    return null;
  }

  const handleVerifyPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode) {
      toast.error('Please enter the verification code');
      return;
    }
    
    try {
      await dispatch(verifyPhone(verificationCode)).unwrap();
      toast.success('Phone number verified successfully!');
      setShowVerificationForm(false);
      setVerificationCode('');
    } catch (error) {
      // Error is handled by global error handling
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
    } catch (error) {
      // Error is handled by global error handling
    }
  };

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex">
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
            <p>
              Your phone number ({user.phone}) needs verification. Please verify to secure your account and receive order updates.
            </p>
          </div>

          {!showVerificationForm ? (
            <div className="mt-4">
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowVerificationForm(true)}
                  className="bg-yellow-100 px-3 py-2 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-200"
                >
                  Verify Now
                </button>
                <button
                  onClick={handleResendCode}
                  disabled={loading}
                  className="bg-transparent px-3 py-2 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 disabled:opacity-50"
                >
                  Send Code
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <form onSubmit={handleVerifyPhone} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="block w-full px-3 py-2 border border-yellow-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    required
                  />
                  {/* Dev codes are not shown for security reasons */}
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-yellow-600 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-yellow-700 disabled:opacity-50"
                  >
                    {loading ? 'Verifying...' : 'Verify'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowVerificationForm(false)}
                    className="bg-transparent px-3 py-2 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneVerificationBanner;
