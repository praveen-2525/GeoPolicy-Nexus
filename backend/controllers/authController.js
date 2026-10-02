const User = require('../models/User');
const AuditLog = require('../models/AuditLog');
const jwt = require('jsonwebtoken');

// Helper to generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'geopolicy_nexus_secure_gov_jwt_secret_key_2026', {
    expiresIn: '30d'
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, organization, state, bio, designation } = req.body;
    console.log('[Backend AuthController] POST /api/auth/register Request Payload:', {
      name,
      email,
      role,
      designation,
      organization,
      state
    });

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields: Full Name, Email, and Password.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must contain at least 8 characters.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'An account already exists with this email address.' });
    }

    // Validate and format role against Mongoose enum
    const VALID_ROLES = ['Admin', 'Super Admin', 'Researcher', 'Policymaker', 'Citizen', 'Government Official'];
    let formattedRole = role;
    if (!VALID_ROLES.includes(role)) {
      if (role === 'Citizen / Landowner' || role === 'Landowner') {
        formattedRole = 'Citizen';
      } else {
        formattedRole = 'Citizen';
      }
    }

    const user = await User.create({
      name,
      email,
      password,
      role: formattedRole || 'Citizen',
      organization: organization || 'Government Affiliate',
      state: state || 'National',
      bio: bio || (designation ? `Designation: ${designation}` : '')
    });

    if (user) {
      console.log('[Backend AuthController] User created successfully:', user._id);
      res.status(201).json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization,
        state: user.state,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data provided.' });
    }
  } catch (error) {
    console.error('[Backend AuthController] Registration Error:', error);
    res.status(400).json({ message: error.message || 'Registration failed.' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || 'Unknown';

    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      await AuditLog.create({
        user: user._id,
        action: 'Login',
        resource: 'Authentication',
        status: 'Success',
        ipAddress,
        userAgent
      });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization,
        state: user.state,
        avatar: user.avatar,
        bio: user.bio,
        token: generateToken(user._id)
      });
    } else {
      if (user) {
         await AuditLog.create({
            user: user._id,
            action: 'Login',
            resource: 'Authentication',
            status: 'Failed',
            ipAddress,
            userAgent,
            details: { reason: 'Invalid password' }
         });
      } else {
         await AuditLog.create({
            action: 'Login',
            resource: 'Authentication',
            status: 'Failed',
            ipAddress,
            userAgent,
            details: { reason: 'User not found', emailAttempted: email }
         });
      }
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate OTP (Mock for Demo)
// @route   POST /api/auth/generate-otp
// @access  Public
exports.generateOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const otp = '123456'; // Mock OTP for SIH demo
    user.otp = otp;
    user.otpExpire = Date.now() + 10 * 60 * 1000;
    await user.save();
    res.status(200).json({ message: 'OTP sent successfully (Use 123456 for demo)' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, otp, otpExpire: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();
    res.status(200).json({ message: 'OTP Verified successfully', token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Logout user / clear token client side
// @route   POST /api/auth/logout
// @access  Private
exports.logoutUser = async (req, res) => {
  res.status(200).json({ message: 'User logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization,
        state: user.state,
        avatar: user.avatar,
        bio: user.bio,
        createdAt: user.createdAt
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.organization = req.body.organization || user.organization;
      user.state = req.body.state || user.state;
      user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
      user.avatar = req.body.avatar || user.avatar;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        organization: updatedUser.organization,
        state: updatedUser.state,
        avatar: updatedUser.avatar,
        bio: updatedUser.bio,
        token: generateToken(updatedUser._id)
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
