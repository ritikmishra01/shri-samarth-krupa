const { validationResult } = require('express-validator');

/**
 * validateResult — runs express-validator's validationResult.
 * If there are errors, returns 422 with a structured errors array.
 * Otherwise calls next().
 */
const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({
        field: e.path || e.param,
        message: e.msg,
      })),
    });
  }
  next();
};

module.exports = { validateResult };
