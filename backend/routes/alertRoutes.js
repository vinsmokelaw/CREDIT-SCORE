import express from 'express';
import { param } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validateRequest, validateAlert, validatePagination } from '../middleware/validation.js';
import { AlertController } from '../controllers/alertController.js';

const router = express.Router();
const alertController = new AlertController();

// All alert routes require authentication
router.use(authenticateToken);

// Routes
router.get('/', validatePagination, asyncHandler(alertController.getAlerts));
router.post('/', validateAlert, asyncHandler(alertController.createAlert));
router.put('/:id/dismiss',
  param('id').isUUID().withMessage('Invalid alert ID'),
  validateRequest,
  asyncHandler(alertController.dismissAlert)
);
router.delete('/:id',
  param('id').isUUID().withMessage('Invalid alert ID'),
  validateRequest,
  asyncHandler(alertController.deleteAlert)
);
router.put('/dismiss-all', asyncHandler(alertController.dismissAllAlerts));
router.get('/unread-count', asyncHandler(alertController.getUnreadCount));

export { router as alertRoutes };