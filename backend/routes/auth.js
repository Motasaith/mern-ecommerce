const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// @route    POST api/auth/register
// @desc     Register user
// @access   Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log('Registration attempt:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    console.log('Extracted data:', { name, email, password: password ? '[HIDDEN]' : 'MISSING' });

    try {
      let user = await User.findOne({ email });

      if (user) {
        console.log('User already exists with email:', email);
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      console.log('Creating new user...');
      user = new User({
        name,
        email,
        password,
      });

      console.log('Saving user to database...');
      await user.save();
      console.log('User saved successfully:', user._id);

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error('Registration error:', err);
      if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => ({ msg: e.message }));
        return res.status(400).json({ errors });
      }
      if (err.code === 11000) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }
      res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
  }
);

// @route    POST api/auth/login
// @desc     Login user
// @access   Public
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    if (!user.isActive) {
      return res.status(400).json({ errors: [{ msg: 'Account is deactivated' }] });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/auth/me
// @desc     Get current user
// @access   Private
router.get('/me', require('../middleware/auth'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST api/auth/logout
// @desc     Logout user
// @access   Private
router.post('/logout', require('../middleware/auth'), (req, res) => {
  res.json({ msg: 'User logged out successfully' });
});

module.exports = router;
