import { BankService } from '../services/bankService.js';
import { BankAnalyticsService } from '../services/bankAnalyticsService.js';
import { BankAlertService } from '../services/bankAlertService.js';

export class BankController {
  constructor() {
    this.bankService = new BankService();
    this.analyticsService = new BankAnalyticsService();
    this.alertService = new BankAlertService();
  }

  getDashboardStats = async (req, res) => {
    try {
      const bankId = req.user.id;
      const stats = await this.bankService.getDashboardStats(bankId);

      res.json(stats);
    } catch (error) {
      console.error('Get dashboard stats error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch dashboard stats',
        message: 'Internal server error'
      });
    }
  };

  getRecentApplications = async (req, res) => {
    try {
      const bankId = req.user.id;
      const { page = 1, limit = 10 } = req.query;
      
      const applications = await this.bankService.getRecentApplications(bankId, {
        page: parseInt(page),
        limit: parseInt(limit)
      });

      res.json(applications);
    } catch (error) {
      console.error('Get recent applications error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch recent applications',
        message: 'Internal server error'
      });
    }
  };

  getCreditDistribution = async (req, res) => {
    try {
      const bankId = req.user.id;
      const distribution = await this.bankService.getCreditDistribution(bankId);

      res.json({ distribution });
    } catch (error) {
      console.error('Get credit distribution error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch credit distribution',
        message: 'Internal server error'
      });
    }
  };

  getApplications = async (req, res) => {
    try {
      const bankId = req.user.id;
      const { page = 1, limit = 10, status, risk_level } = req.query;
      
      const applications = await this.bankService.getApplications(bankId, {
        page: parseInt(page),
        limit: parseInt(limit),
        status,
        riskLevel: risk_level
      });

      res.json(applications);
    } catch (error) {
      console.error('Get applications error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch applications',
        message: 'Internal server error'
      });
    }
  };

  searchApplications = async (req, res) => {
    try {
      const bankId = req.user.id;
      const { q: searchTerm, page = 1, limit = 10 } = req.query;
      
      const applications = await this.bankService.searchApplications(bankId, searchTerm, {
        page: parseInt(page),
        limit: parseInt(limit)
      });

      res.json(applications);
    } catch (error) {
      console.error('Search applications error:', error);
      res.status(500).json({ 
        error: 'Failed to search applications',
        message: 'Internal server error'
      });
    }
  };

  getApplication = async (req, res) => {
    try {
      const bankId = req.user.id;
      const { id } = req.params;

      const application = await this.bankService.getApplication(bankId, id);

      if (!application) {
        return res.status(404).json({ 
          error: 'Application not found',
          message: 'Application not found or access denied'
        });
      }

      res.json(application);
    } catch (error) {
      console.error('Get application error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch application',
        message: 'Internal server error'
      });
    }
  };

  updateRiskAssessment = async (req, res) => {
    try {
      const bankId = req.user.id;
      const { id } = req.params;
      const riskData = req.body;

      const application = await this.bankService.updateRiskAssessment(bankId, id, riskData);

      if (!application) {
        return res.status(404).json({ 
          error: 'Application not found',
          message: 'Application not found or access denied'
        });
      }

      res.json({
        message: 'Risk assessment updated successfully',
        application
      });
    } catch (error) {
      console.error('Update risk assessment error:', error);
      res.status(500).json({ 
        error: 'Failed to update risk assessment',
        message: 'Internal server error'
      });
    }
  };

  updateApplicationStatus = async (req, res) => {
    try {
      const bankId = req.user.id;
      const { id } = req.params;
      const { status, notes } = req.body;

      const application = await this.bankService.updateApplicationStatus(bankId, id, status, notes);

      if (!application) {
        return res.status(404).json({ 
          error: 'Application not found',
          message: 'Application not found or access denied'
        });
      }

      res.json({
        message: 'Application status updated successfully',
        application
      });
    } catch (error) {
      console.error('Update application status error:', error);
      res.status(500).json({ 
        error: 'Failed to update application status',
        message: 'Internal server error'
      });
    }
  };

  getAlerts = async (req, res) => {
    try {
      const bankId = req.user.id;
      const { page = 1, limit = 10, category, severity } = req.query;
      
      const alerts = await this.alertService.getAlerts(bankId, {
        page: parseInt(page),
        limit: parseInt(limit),
        category,
        severity
      });

      res.json(alerts);
    } catch (error) {
      console.error('Get alerts error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch alerts',
        message: 'Internal server error'
      });
    }
  };

  createAlert = async (req, res) => {
    try {
      const bankId = req.user.id;
      const alertData = req.body;

      const alert = await this.alertService.createAlert(bankId, alertData);

      res.status(201).json({
        message: 'Alert created successfully',
        alert
      });
    } catch (error) {
      console.error('Create alert error:', error);
      res.status(500).json({ 
        error: 'Failed to create alert',
        message: 'Internal server error'
      });
    }
  };

  dismissAlert = async (req, res) => {
    try {
      const bankId = req.user.id;
      const { id } = req.params;

      const success = await this.alertService.dismissAlert(bankId, id);

      if (!success) {
        return res.status(404).json({ 
          error: 'Alert not found',
          message: 'Alert not found or access denied'
        });
      }

      res.json({ message: 'Alert dismissed successfully' });
    } catch (error) {
      console.error('Dismiss alert error:', error);
      res.status(500).json({ 
        error: 'Failed to dismiss alert',
        message: 'Internal server error'
      });
    }
  };

  dismissAllAlerts = async (req, res) => {
    try {
      const bankId = req.user.id;
      const count = await this.alertService.dismissAllAlerts(bankId);

      res.json({ 
        message: `${count} alerts dismissed successfully`,
        count
      });
    } catch (error) {
      console.error('Dismiss all alerts error:', error);
      res.status(500).json({ 
        error: 'Failed to dismiss alerts',
        message: 'Internal server error'
      });
    }
  };

  getPerformanceMetrics = async (req, res) => {
    try {
      const bankId = req.user.id;
      const metrics = await this.analyticsService.getPerformanceMetrics(bankId);

      res.json({ metrics });
    } catch (error) {
      console.error('Get performance metrics error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch performance metrics',
        message: 'Internal server error'
      });
    }
  };

  getRiskDistribution = async (req, res) => {
    try {
      const bankId = req.user.id;
      const distribution = await this.analyticsService.getRiskDistribution(bankId);

      res.json({ distribution });
    } catch (error) {
      console.error('Get risk distribution error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch risk distribution',
        message: 'Internal server error'
      });
    }
  };

  getTrends = async (req, res) => {
    try {
      const bankId = req.user.id;
      const { period = 'month' } = req.query;

      const trends = await this.analyticsService.getTrends(bankId, period);

      res.json({
        period,
        trends
      });
    } catch (error) {
      console.error('Get trends error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch trends',
        message: 'Internal server error'
      });
    }
  };

  generateRiskReport = async (req, res) => {
    try {
      const bankId = req.user.id;
      const report = await this.bankService.generateRiskReport(bankId);

      res.json({
        message: 'Risk assessment report generated successfully',
        report
      });
    } catch (error) {
      console.error('Generate risk report error:', error);
      res.status(500).json({ 
        error: 'Failed to generate risk report',
        message: 'Internal server error'
      });
    }
  };

  generatePerformanceReport = async (req, res) => {
    try {
      const bankId = req.user.id;
      const report = await this.bankService.generatePerformanceReport(bankId);

      res.json({
        message: 'Performance report generated successfully',
        report
      });
    } catch (error) {
      console.error('Generate performance report error:', error);
      res.status(500).json({ 
        error: 'Failed to generate performance report',
        message: 'Internal server error'
      });
    }
  };

  generateCustomerReport = async (req, res) => {
    try {
      const bankId = req.user.id;
      const report = await this.bankService.generateCustomerReport(bankId);

      res.json({
        message: 'Customer analytics report generated successfully',
        report
      });
    } catch (error) {
      console.error('Generate customer report error:', error);
      res.status(500).json({ 
        error: 'Failed to generate customer report',
        message: 'Internal server error'
      });
    }
  };
}