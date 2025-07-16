const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  let token;

  // Check for token in header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);

      // Get user from token (handle both payload structures)
      const userId = decoded.id || decoded.user.id;
      console.log('User ID from token:', userId);
      req.user = await User.findById(userId).select('-password');

      if (!req.user) {
        return res.status(401).json({ msg: 'User not found' });
      }

      if (!req.user.isActive) {
        return res.status(401).json({ msg: 'User account is deactivated' });
      }

      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(401).json({ msg: 'Token is not valid' });
    }
  }

  // Check for token in cookies
  if (!token && req.cookies.token) {
    try {
      token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Handle both payload structures
      const userId = decoded.id || decoded.user.id;
      req.user = await User.findById(userId).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ msg: 'User not found' });
      }

      if (!req.user.isActive) {
        return res.status(401).json({ msg: 'User account is deactivated' });
      }

      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(401).json({ msg: 'Token is not valid' });
    }
  }

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
};

module.exports = auth;
