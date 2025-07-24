import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { RecommendationController } from '../controllers/recommendationController.js';

const router = express.Router();
const recommendationController = new RecommendationController();

// All recommendation routes require authentication
router.use(authenticateToken);

// Routes
router.get('/', asyncHandler(recommendationController.getRecommendations));
router.get('/improvement-plan', asyncHandler(recommendationController.getImprovementPlan));
router.post('/mark-completed/:id', asyncHandler(recommendationController.markCompleted));

export { router as recommendationRoutes };