const jwt = require('jsonwebtoken');
const AdminModel = require('../models/adminModel');

/**
 * Protect middleware — verifies JWT from cookie or Authorization header.
 * Attaches req.user = { id, name, email, role }
 */
const protect = async (req, res, next) => {
  try {
    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Not authorized, no token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await AdminModel.findById(decoded.id);

    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: 'Not authorized, user not found' });
    }

    req.user = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };

    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res
        .status(401)
        .json({ success: false, message: 'Not authorized, invalid token' });
    }
    if (err.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({ success: false, message: 'Not authorized, token expired' });
    }
    next(err);
  }
};

/**
 * adminOnly middleware — must be used after protect.
 * Ensures the authenticated user has admin role.
 */
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res
    .status(403)
    .json({ success: false, message: 'Access denied: Admins only' });
};

module.exports = { protect, adminOnly };
