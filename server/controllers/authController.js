const bcrypt = require('bcryptjs');
const AdminModel = require('../models/adminModel');
const { generateToken, clearToken } = require('../utils/generateToken');

/**
 * @desc    Login admin
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    // Accept either username or email field (for compatibility)
    const loginId = username || email;

    if (!loginId || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Username and password are required' });
    }

    const admin = await AdminModel.findByUsername(loginId.trim());
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid username or password' });
    }

    const token = generateToken(res, admin.id, admin.role);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (err) {
    next(err);
  }
};


/**
 * @desc    Logout admin
 * @route   POST /api/auth/logout
 * @access  Private
 */
const logout = (req, res) => {
  clearToken(res);
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

/**
 * @desc    Get current logged-in admin
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res, next) => {
  try {
    const admin = await AdminModel.findById(req.user.id);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: 'Admin not found' });
    }

    res.status(200).json({
      success: true,
      data: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        created_at: admin.created_at,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Change admin password
 * @route   PUT /api/auth/change-password
 * @access  Private
 */
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required',
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long',
      });
    }

    // Fetch full admin record including password
    const admin = await AdminModel.findByEmail(req.user.email);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await AdminModel.updatePassword(req.user.id, hashedPassword);

    // Clear session, user must log in again
    clearToken(res);

    res.status(200).json({
      success: true,
      message: 'Password changed successfully. Please log in again.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, logout, getMe, changePassword };
