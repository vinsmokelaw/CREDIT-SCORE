import { body, param, query, validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Credit score validation
export const validateCreditScore = [
  body('score')
    .isInt({ min: 300, max: 850 })
    .withMessage('Credit score must be between 300 and 850'),
  body('factors')
    .optional()
    .isObject()
    .withMessage('Credit factors must be an object'),
  validateRequest
];

// Loan application validation
export const validateLoanApplication = [
  body('bank_name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Bank name must be between 2 and 100 characters'),
  body('amount')
    .isFloat({ min: 1000, max: 10000000 })
    .withMessage('Loan amount must be between $1,000 and $10,000,000'),
  body('purpose')
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage('Loan purpose must be between 5 and 500 characters'),
  body('income')
    .isFloat({ min: 0 })
    .withMessage('Income must be a positive number'),
  validateRequest
];

// Alert validation
export const validateAlert = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Alert title must be between 5 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Alert message must be between 10 and 1000 characters'),
  body('type')
    .isIn(['info', 'warning', 'error', 'success'])
    .withMessage('Alert type must be: info, warning, error, or success'),
  body('severity')
    .isIn(['low', 'medium', 'high'])
    .withMessage('Alert severity must be: low, medium, or high'),
  validateRequest
];

// Pagination validation
export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  validateRequest
];