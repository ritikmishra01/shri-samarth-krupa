const rateLimit = require('express-rate-limit');

/**
 * General API rate limiter: 100 requests per 15 minutes per IP.
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      'Too many requests from this IP, please try again after 15 minutes',
  },
  skip: (req) => req.method === 'OPTIONS',
});

/**
 * Auth route limiter: 10 requests per 15 minutes per IP.
 * Protects login endpoints from brute force.
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      'Too many login attempts from this IP, please try again after 15 minutes',
  },
  skip: (req) => req.method === 'OPTIONS',
});

module.exports = { apiLimiter, authLimiter };
