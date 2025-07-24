import { LoanService } from '../services/loanService.js';
import { AlertService } from '../services/alertService.js';

export class LoanController {
  constructor() {
    this.loanService = new LoanService();
    this.alertService = new AlertService();
  }

  getApplications = async (req, res) => {
    try {
      const userId = req.user.id;
      const { page = 1, limit = 10 } = req.query;
      
      const applications = await this.loanService.getApplications(userId, {
        page: parseInt(page),
        limit: parseInt(limit)
      });

      res.json(applications);
    } catch (error) {
      console.error('Get applications error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch loan applications',
        message: 'Internal server error'
      });
    }
  };

  createApplication = async (req, res) => {
    try {
      const userId = req.user.id;
      const applicationData = req.body;

      const application = await this.loanService.createApplication(userId, applicationData);

      // Create alert for new application
      await this.alertService.createAlert(userId, {
        title: 'New Loan Application Submitted',
        message: `Your loan application for $${applicationData.amount.toLocaleString()} has been submitted to ${applicationData.bank_name}.`,
        type: 'info',
        severity: 'low'
      });

      res.status(201).json({
        message: 'Loan application created successfully',
        application
      });
    } catch (error) {
      console.error('Create application error:', error);
      res.status(500).json({ 
        error: 'Failed to create loan application',
        message: 'Internal server error'
      });
    }
  };

  getApplication = async (req, res) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const application = await this.loanService.getApplication(userId, id);

      if (!application) {
        return res.status(404).json({ 
          error: 'Application not found',
          message: 'Loan application not found or access denied'
        });
      }

      res.json(application);
    } catch (error) {
      console.error('Get application error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch loan application',
        message: 'Internal server error'
      });
    }
  };

  updateApplication = async (req, res) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const updateData = req.body;

      const application = await this.loanService.updateApplication(userId, id, updateData);

      if (!application) {
        return res.status(404).json({ 
          error: 'Application not found',
          message: 'Loan application not found or access denied'
        });
      }

      res.json({
        message: 'Loan application updated successfully',
        application
      });
    } catch (error) {
      console.error('Update application error:', error);
      res.status(500).json({ 
        error: 'Failed to update loan application',
        message: 'Internal server error'
      });
    }
  };

  deleteApplication = async (req, res) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const success = await this.loanService.deleteApplication(userId, id);

      if (!success) {
        return res.status(404).json({ 
          error: 'Application not found',
          message: 'Loan application not found or access denied'
        });
      }

      res.json({ message: 'Loan application deleted successfully' });
    } catch (error) {
      console.error('Delete application error:', error);
      res.status(500).json({ 
        error: 'Failed to delete loan application',
        message: 'Internal server error'
      });
    }
  };

  getApplicationsByStatus = async (req, res) => {
    try {
      const userId = req.user.id;
      const { status } = req.params;
      const { page = 1, limit = 10 } = req.query;

      const applications = await this.loanService.getApplicationsByStatus(userId, status, {
        page: parseInt(page),
        limit: parseInt(limit)
      });

      res.json(applications);
    } catch (error) {
      console.error('Get applications by status error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch loan applications',
        message: 'Internal server error'
      });
    }
  };
}