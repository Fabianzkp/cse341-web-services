const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    body('firstName').optional().notEmpty().withMessage('First name is required'),
    body('lastName').optional().notEmpty().withMessage('Last name is required'),
    body('email').optional().isEmail().withMessage('Email is invalid'),
    body('favoriteColor').optional().notEmpty().withMessage('Favorite color is required'),
    body('birthday').optional().notEmpty().withMessage('Birthday is required'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

module.exports = {
  userValidationRules,
  validate,
};