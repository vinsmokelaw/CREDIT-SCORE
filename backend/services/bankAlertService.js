import { supabaseAdmin } from '../config/supabase.js';

export class BankAlertService {
  async getAlerts(bankId, options = {}) {
    try {
      const { page = 1, limit = 10, category, severity } = options;
      const offset = (page - 1) * limit;

      let query = supabaseAdmin
        .from('bank_alerts')
        .select('*', { count: 'exact' })
        .eq('bank_id', bankId);

      if (category) {
        query = query.eq('category', category);
      }

      if (severity) {
        query = query.eq('severity', severity);
      }

      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return {
        data,
        pagination: {
          page,
          limit,
          total: count,
          totalPages: Math.ceil(count / limit)
        }
      };
    } catch (error) {
      console.error('Get bank alerts error:', error);
      throw error;
    }
  }

  async createAlert(bankId, alertData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('bank_alerts')
        .insert({
          bank_id: bankId,
          ...alertData
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Create bank alert error:', error);
      throw error;
    }
  }

  async dismissAlert(bankId, alertId) {
    try {
      const { error } = await supabaseAdmin
        .from('bank_alerts')
        .update({ is_dismissed: true, is_read: true })
        .eq('bank_id', bankId)
        .eq('id', alertId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Dismiss bank alert error:', error);
      return false;
    }
  }

  async dismissAllAlerts(bankId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('bank_alerts')
        .update({ is_dismissed: true, is_read: true })
        .eq('bank_id', bankId)
        .eq('is_dismissed', false)
        .select('id');

      if (error) throw error;
      return data?.length || 0;
    } catch (error) {
      console.error('Dismiss all bank alerts error:', error);
      throw error;
    }
  }

  async getUnreadCount(bankId) {
    try {
      const { count, error } = await supabaseAdmin
        .from('bank_alerts')
        .select('*', { count: 'exact', head: true })
        .eq('bank_id', bankId)
        .eq('is_read', false)
        .eq('is_dismissed', false);

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Get unread bank alerts count error:', error);
      throw error;
    }
  }

  // Auto-generate alerts based on risk thresholds
  async generateRiskAlerts(bankId) {
    try {
      // Check for high-risk applications
      const { count: highRiskCount } = await supabaseAdmin
        .from('bank_applications')
        .select('*', { count: 'exact', head: true })
        .eq('bank_id', bankId)
        .eq('risk_level', 'high');

      if (highRiskCount > 5) {
        await this.createAlert(bankId, {
          title: 'High Risk Applications Alert',
          message: `${highRiskCount} high-risk applications require immediate attention`,
          type: 'warning',
          severity: 'high',
          category: 'risk'
        });
      }

      // Check for low credit score applications
      const { count: lowScoreCount } = await supabaseAdmin
        .from('bank_applications')
        .select('credit_scores!inner(score)', { count: 'exact', head: true })
        .eq('bank_id', bankId)
        .lt('credit_scores.score', 600);

      if (lowScoreCount > 3) {
        await this.createAlert(bankId, {
          title: 'Low Credit Score Alert',
          message: `${lowScoreCount} applications with credit scores below 600 need review`,
          type: 'error',
          severity: 'high',
          category: 'risk'
        });
      }

      return true;
    } catch (error) {
      console.error('Generate risk alerts error:', error);
      throw error;
    }
  }
}