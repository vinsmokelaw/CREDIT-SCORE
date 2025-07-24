import { CreditService } from '../services/creditService.js';
import { CreditSimulator } from '../services/creditSimulator.js';

export class CreditController {
  constructor() {
    this.creditService = new CreditService();
    this.creditSimulator = new CreditSimulator();
  }

  getCurrentScore = async (req, res) => {
    try {
      const userId = req.user.id;
      const creditScore = await this.creditService.getCurrentScore(userId);
      
      if (!creditScore) {
        return res.status(404).json({ 
          error: 'Credit score not found',
          message: 'No credit score data available for this user'
        });
      }

      res.json({
        score: creditScore.score,
        category: this.creditService.getScoreCategory(creditScore.score),
        lastUpdated: creditScore.updated_at,
        change: creditScore.score_change,
        factors: creditScore.factors
      });
    } catch (error) {
      console.error('Get current score error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch credit score',
        message: 'Internal server error'
      });
    }
  };

  getScoreHistory = async (req, res) => {
    try {
      const userId = req.user.id;
      const { page = 1, limit = 10 } = req.query;
      
      const history = await this.creditService.getScoreHistory(userId, {
        page: parseInt(page),
        limit: parseInt(limit)
      });

      res.json(history);
    } catch (error) {
      console.error('Get score history error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch score history',
        message: 'Internal server error'
      });
    }
  };

  updateScore = async (req, res) => {
    try {
      const userId = req.user.id;
      const { score, factors } = req.body;

      const updatedScore = await this.creditService.updateScore(userId, score, factors);

      res.json({
        message: 'Credit score updated successfully',
        score: updatedScore.score,
        category: this.creditService.getScoreCategory(updatedScore.score),
        change: updatedScore.score_change,
        updatedAt: updatedScore.updated_at
      });
    } catch (error) {
      console.error('Update score error:', error);
      res.status(500).json({ 
        error: 'Failed to update credit score',
        message: 'Internal server error'
      });
    }
  };

  getCreditFactors = async (req, res) => {
    try {
      const userId = req.user.id;
      const factors = await this.creditService.getCreditFactors(userId);

      res.json({
        factors: factors || this.creditService.getDefaultFactors()
      });
    } catch (error) {
      console.error('Get credit factors error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch credit factors',
        message: 'Internal server error'
      });
    }
  };

  simulateScore = async (req, res) => {
    try {
      const userId = req.user.id;
      const { score, payment, debt, newAccount, utilization } = req.body;

      const simulation = await this.creditSimulator.simulate({
        currentScore: score,
        monthlyPayment: payment,
        totalDebt: debt,
        newAccount: newAccount || false,
        creditUtilization: utilization
      });

      res.json({
        currentScore: score,
        projectedScore: simulation.newScore,
        change: simulation.change,
        factors: simulation.factors,
        recommendations: simulation.recommendations
      });
    } catch (error) {
      console.error('Credit simulation error:', error);
      res.status(500).json({ 
        error: 'Credit simulation failed',
        message: 'Internal server error'
      });
    }
  };

  getCreditTrends = async (req, res) => {
    try {
      const userId = req.user.id;
      const { period = 'month' } = req.query;

      const trends = await this.creditService.getCreditTrends(userId, period);

      res.json({
        period,
        trends,
        summary: {
          averageScore: trends.reduce((sum, t) => sum + t.score, 0) / trends.length,
          highestScore: Math.max(...trends.map(t => t.score)),
          lowestScore: Math.min(...trends.map(t => t.score)),
          totalChange: trends.length > 1 ? trends[trends.length - 1].score - trends[0].score : 0
        }
      });
    } catch (error) {
      console.error('Get credit trends error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch credit trends',
        message: 'Internal server error'
      });
    }
  };
}