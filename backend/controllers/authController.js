const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/env');
const asyncHandler = require('../utils/asyncHandler');

// Generate JWT token helper
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: '30d'
  });
};

/**
 * Login admin user
 * POST /api/auth/login
 */
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Please provide email and password'
    });
  }

  // Check user existence
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Invalid email or password'
    });
  }

  // Check if role is admin
  if (user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Forbidden: Admin access only'
    });
  }

  // Verify password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      error: 'Invalid email or password'
    });
  }

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    }
  });
});

/**
 * Get current logged in user details (useful for authentication checks in frontend)
 * GET /api/auth/me
 */
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user
  });
});

module.exports = {
  loginAdmin,
  getMe
};
