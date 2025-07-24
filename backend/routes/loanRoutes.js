import express from 'express';
import { param } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validateRequest, validateLoanApplication, validatePagination } from '../middleware/validation.js';
import { LoanController } from '../controllers/loanController.js';

const router = express.Router();
const loanController = new LoanController();

// All loan routes require authentication
router.use(authenticateToken);

// Routes
router.get('/', validatePagination, asyncHandler(loanController.getApplications));
router.post('/', validateLoanApplication, asyncHandler(loanController.createApplication));
router.get('/:id', 
  param('id').isUUID().withMessage('Invalid application ID'),
  validateRequest,
  asyncHandler(loanController.getApplication)
);
router.put('/:id', 
  param('id').isUUID().withMessage('Invalid application ID'),
  validateLoanApplication,
  asyncHandler(loanController.updateApplication)
);
router.delete('/:id',
  param('id').isUUID().withMessage('Invalid application ID'),
  validateRequest,
  asyncHandler(loanController.deleteApplication)
);
router.get('/status/:status',
  param('status').isIn(['pending', 'approved', 'rejected', 'withdrawn']),
  validateRequest,
  validatePagination,
  asyncHandler(loanController.getApplicationsByStatus)
);

export { router as loanRoutes };