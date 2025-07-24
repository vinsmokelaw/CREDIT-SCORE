import { EducationService } from '../services/educationService.js';

export class EducationController {
  constructor() {
    this.educationService = new EducationService();
  }

  getTips = async (req, res) => {
    try {
      const { page = 1, limit = 10, category, difficulty } = req.query;
      
      const tips = await this.educationService.getTips({
        page: parseInt(page),
        limit: parseInt(limit),
        category,
        difficulty
      });

      res.json(tips);
    } catch (error) {
      console.error('Get tips error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch educational tips',
        message: 'Internal server error'
      });
    }
  };

  getTip = async (req, res) => {
    try {
      const { id } = req.params;
      const tip = await this.educationService.getTip(id);

      if (!tip) {
        return res.status(404).json({ 
          error: 'Tip not found',
          message: 'Educational tip not found'
        });
      }

      res.json(tip);
    } catch (error) {
      console.error('Get tip error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch educational tip',
        message: 'Internal server error'
      });
    }
  };

  getCategories = async (req, res) => {
    try {
      const categories = await this.educationService.getCategories();
      res.json({ categories });
    } catch (error) {
      console.error('Get categories error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch categories',
        message: 'Internal server error'
      });
    }
  };

  getScoreRanges = async (req, res) => {
    try {
      const ranges = this.educationService.getScoreRanges();
      res.json({ ranges });
    } catch (error) {
      console.error('Get score ranges error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch score ranges',
        message: 'Internal server error'
      });
    }
  };

  getCreditFactorsInfo = async (req, res) => {
    try {
      const factors = this.educationService.getCreditFactorsInfo();
      res.json({ factors });
    } catch (error) {
      console.error('Get credit factors info error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch credit factors info',
        message: 'Internal server error'
      });
    }
  };
}