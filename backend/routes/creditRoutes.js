import express from 'express';
import { param, query } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validateRequest, validateCreditScore, validatePagination } from '../middleware/validation.js';
import { CreditController } from '../controllers/creditController.js';

const router = express.Router();
const creditController = new CreditController();

// All credit routes require authentication
router.use(authenticateToken);

// Routes
router.get('/score', asyncHandler(creditController.getCurrentScore));
router.get('/score/history', validatePagination, asyncHandler(creditController.getScoreHistory));
router.post('/score', validateCreditScore, asyncHandler(creditController.updateScore));
router.get('/factors', asyncHandler(creditController.getCreditFactors));
router.post('/simulate', 
  validateCreditScore,
  asyncHandler(creditController.simulateScore)
);
router.get('/trends', 
  query('period').optional().isIn(['week', 'month', 'quarter', 'year']),
  validateRequest,
  asyncHandler(creditController.getCreditTrends)
);

export { router as creditRoutes };