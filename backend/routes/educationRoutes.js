import express from 'express';
import { param } from 'express-validator';
import { optionalAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validateRequest, validatePagination } from '../middleware/validation.js';
import { EducationController } from '../controllers/educationController.js';

const router = express.Router();
const educationController = new EducationController();

// Education routes can be accessed with or without authentication
router.use(optionalAuth);

// Routes
router.get('/tips', validatePagination, asyncHandler(educationController.getTips));
router.get('/tips/:id',
  param('id').isUUID().withMessage('Invalid tip ID'),
  validateRequest,
  asyncHandler(educationController.getTip)
);
router.get('/categories', asyncHandler(educationController.getCategories));
router.get('/score-ranges', asyncHandler(educationController.getScoreRanges));
router.get('/factors', asyncHandler(educationController.getCreditFactorsInfo));

export { router as educationRoutes };