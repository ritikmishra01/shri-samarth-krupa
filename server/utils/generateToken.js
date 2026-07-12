const jwt = require('jsonwebtoken');

/**
 * generateToken — creates a signed JWT and sets it as an httpOnly cookie.
 * @param {Object} res - Express response object
 * @param {number} userId - Admin user ID
 * @param {string} role - Admin role
 * @returns {string} The signed JWT string
 */
const generateToken = (res, userId, role) => {
  const token = jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  });

  return token;
};

/**
 * clearToken — clears the auth cookie (logout).
 * @param {Object} res - Express response object
 */
const clearToken = (res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    expires: new Date(0),
  });
};

module.exports = { generateToken, clearToken };
