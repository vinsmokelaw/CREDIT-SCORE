import { AlertService } from '../services/alertService.js';

export class AlertController {
  constructor() {
    this.alertService = new AlertService();
  }

  getAlerts = async (req, res) => {
    try {
      const userId = req.user.id;
      const { page = 1, limit = 10, unread_only = false } = req.query;
      
      const alerts = await this.alertService.getAlerts(userId, {
        page: parseInt(page),
        limit: parseInt(limit),
        unreadOnly: unread_only === 'true'
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
      const userId = req.user.id;
      const alertData = req.body;

      const alert = await this.alertService.createAlert(userId, alertData);

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
      const userId = req.user.id;
      const { id } = req.params;

      const success = await this.alertService.dismissAlert(userId, id);

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

  deleteAlert = async (req, res) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const success = await this.alertService.deleteAlert(userId, id);

      if (!success) {
        return res.status(404).json({ 
          error: 'Alert not found',
          message: 'Alert not found or access denied'
        });
      }

      res.json({ message: 'Alert deleted successfully' });
    } catch (error) {
      console.error('Delete alert error:', error);
      res.status(500).json({ 
        error: 'Failed to delete alert',
        message: 'Internal server error'
      });
    }
  };

  dismissAllAlerts = async (req, res) => {
    try {
      const userId = req.user.id;
      const count = await this.alertService.dismissAllAlerts(userId);

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

  getUnreadCount = async (req, res) => {
    try {
      const userId = req.user.id;
      const count = await this.alertService.getUnreadCount(userId);

      res.json({ count });
    } catch (error) {
      console.error('Get unread count error:', error);
      res.status(500).json({ 
        error: 'Failed to get unread count',
        message: 'Internal server error'
      });
    }
  };
}