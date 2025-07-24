const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route    GET api/verification/email-verification-page
// @desc     Get email verification page status
// @access   Private
router.get('/email-verification-page', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('emailVerified email name');
    
    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'User not found' }] });
    }
    
    if (user.emailVerified) {
      return res.json({
        alreadyVerified: true,
        message: 'Your email is already verified!',
        user: {
          name: user.name,
          email: user.email
        }
      });
    }
    
    res.json({
      alreadyVerified: false,
      message: 'Please check your email for verification instructions.',
      user: {
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/verification/sms-verification-page
// @desc     Get SMS verification page status
// @access   Private
router.get('/sms-verification-page', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('phoneVerified phone name phoneVerificationCode phoneVerificationExpires');
    
    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'User not found' }] });
    }
    
    if (user.phoneVerified) {
      return res.json({
        alreadyVerified: true,
        message: 'Your phone number is already verified!',
        user: {
          name: user.name,
          phone: user.phone
        }
      });
    }
    
    // Check if verification code exists and is not expired
    const hasValidCode = user.phoneVerificationCode && 
                        user.phoneVerificationExpires && 
                        user.phoneVerificationExpires > new Date();
    
    res.json({
      alreadyVerified: false,
      hasValidCode,
      codeExpired: user.phoneVerificationCode && (!user.phoneVerificationExpires || user.phoneVerificationExpires <= new Date()),
      user: {
        name: user.name,
        phone: user.phone ? user.phone.replace(/\d(?=\d{4})/g, '*') : null // Mask phone number
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/verification/email-verify-success
// @desc     Get email verification success page data
// @access   Public
router.get('/email-verify-success', async (req, res) => {
  const { token } = req.query;
  
  if (!token) {
    return res.status(400).json({ 
      success: false,
      message: 'Verification token is required' 
    });
  }
  
  try {
    // Check if token exists (but don't verify it here, that should be done via POST)
    let user = await User.findOne({ emailVerificationToken: token });
    let isNewEmail = false;
    
    if (!user) {
      user = await User.findOne({ newEmailVerificationToken: token });
      isNewEmail = true;
    }
    
    if (!user) {
      return res.json({
        success: false,
        message: 'Invalid or expired verification token',
        expired: true
      });
    }
    
    // If user is already verified
    if (!isNewEmail && user.emailVerified) {
      return res.json({
        success: true,
        alreadyVerified: true,
        message: 'Your email is already verified!',
        user: {
          name: user.name,
          email: user.email
        }
      });
    }
    
    res.json({
      success: true,
      alreadyVerified: false,
      isNewEmail,
      message: isNewEmail ? 'Ready to verify your new email address' : 'Ready to verify your email address',
      user: {
        name: user.name,
        email: isNewEmail ? user.newEmail : user.email
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

module.exports = router;
