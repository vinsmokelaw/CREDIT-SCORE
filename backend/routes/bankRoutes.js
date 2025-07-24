import express from 'express';
import { param, query } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validateRequest, validatePagination } from '../middleware/validation.js';
import { BankController } from '../controllers/bankController.js';

const router = express.Router();
const bankController = new BankController();

// All bank routes require authentication
router.use(authenticateToken);

// Dashboard routes
router.get('/dashboard/stats', asyncHandler(bankController.getDashboardStats));
router.get('/dashboard/recent-applications', validatePagination, asyncHandler(bankController.getRecentApplications));
router.get('/dashboard/credit-distribution', asyncHandler(bankController.getCreditDistribution));

// Application management routes
router.get('/applications', validatePagination, asyncHandler(bankController.getApplications));
router.get('/applications/search', 
  query('q').optional().isString(),
  validateRequest,
  validatePagination,
  asyncHandler(bankController.searchApplications)
);
router.get('/applications/:id',
  param('id').isUUID().withMessage('Invalid application ID'),
  validateRequest,
  asyncHandler(bankController.getApplication)
);
router.put('/applications/:id/risk-assessment',
  param('id').isUUID().withMessage('Invalid application ID'),
  validateRequest,
  asyncHandler(bankController.updateRiskAssessment)
);
router.put('/applications/:id/status',
  param('id').isUUID().withMessage('Invalid application ID'),
  validateRequest,
  asyncHandler(bankController.updateApplicationStatus)
);

// Alert routes
router.get('/alerts', validatePagination, asyncHandler(bankController.getAlerts));
router.post('/alerts', asyncHandler(bankController.createAlert));
router.put('/alerts/:id/dismiss',
  param('id').isUUID().withMessage('Invalid alert ID'),
  validateRequest,
  asyncHandler(bankController.dismissAlert)
);
router.put('/alerts/dismiss-all', asyncHandler(bankController.dismissAllAlerts));

// Analytics routes
router.get('/analytics/performance', asyncHandler(bankController.getPerformanceMetrics));
router.get('/analytics/risk-distribution', asyncHandler(bankController.getRiskDistribution));
router.get('/analytics/trends',
  query('period').optional().isIn(['week', 'month', 'quarter', 'year']),
  validateRequest,
  asyncHandler(bankController.getTrends)
);

// Reports routes
router.get('/reports/risk-assessment', asyncHandler(bankController.generateRiskReport));
router.get('/reports/performance', asyncHandler(bankController.generatePerformanceReport));
router.get('/reports/customer-analytics', asyncHandler(bankController.generateCustomerReport));

export { router as bankRoutes };