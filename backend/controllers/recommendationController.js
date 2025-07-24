import { RecommendationService } from '../services/recommendationService.js';
import { CreditService } from '../services/creditService.js';

export class RecommendationController {
  constructor() {
    this.recommendationService = new RecommendationService();
    this.creditService = new CreditService();
  }

  getRecommendations = async (req, res) => {
    try {
      const userId = req.user.id;
      
      // Get current credit data
      const creditScore = await this.creditService.getCurrentScore(userId);
      const creditFactors = await this.creditService.getCreditFactors(userId);

      const recommendations = await this.recommendationService.getPersonalizedRecommendations(
        userId, 
        creditScore, 
        creditFactors
      );

      res.json({ recommendations });
    } catch (error) {
      console.error('Get recommendations error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch recommendations',
        message: 'Internal server error'
      });
    }
  };

  getImprovementPlan = async (req, res) => {
    try {
      const userId = req.user.id;
      
      // Get current credit data
      const creditScore = await this.creditService.getCurrentScore(userId);
      const creditFactors = await this.creditService.getCreditFactors(userId);

      const plan = await this.recommendationService.generateImprovementPlan(
        userId,
        creditScore,
        creditFactors
      );

      res.json({ plan });
    } catch (error) {
      console.error('Get improvement plan error:', error);
      res.status(500).json({ 
        error: 'Failed to generate improvement plan',
        message: 'Internal server error'
      });
    }
  };

  markCompleted = async (req, res) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const success = await this.recommendationService.markRecommendationCompleted(userId, id);

      if (!success) {
        return res.status(404).json({ 
          error: 'Recommendation not found',
          message: 'Recommendation not found or access denied'
        });
      }

      res.json({ message: 'Recommendation marked as completed' });
    } catch (error) {
      console.error('Mark completed error:', error);
      res.status(500).json({ 
        error: 'Failed to mark recommendation as completed',
        message: 'Internal server error'
      });
    }
  };
}