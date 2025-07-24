import { supabaseAdmin } from '../config/supabase.js';

export class AlertService {
  async getAlerts(userId, options = {}) {
    try {
      const { page = 1, limit = 10, unreadOnly = false } = options;
      const offset = (page - 1) * limit;

      let query = supabaseAdmin
        .from('credit_alerts')
        .select('*', { count: 'exact' })
        .eq('user_id', userId);

      if (unreadOnly) {
        query = query.eq('is_read', false);
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
      console.error('Get alerts error:', error);
      throw error;
    }
  }

  async createAlert(userId, alertData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('credit_alerts')
        .insert({
          user_id: userId,
          ...alertData
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Create alert error:', error);
      throw error;
    }
  }

  async dismissAlert(userId, alertId) {
    try {
      const { error } = await supabaseAdmin
        .from('credit_alerts')
        .update({ is_dismissed: true, is_read: true })
        .eq('user_id', userId)
        .eq('id', alertId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Dismiss alert error:', error);
      return false;
    }
  }

  async deleteAlert(userId, alertId) {
    try {
      const { error } = await supabaseAdmin
        .from('credit_alerts')
        .delete()
        .eq('user_id', userId)
        .eq('id', alertId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Delete alert error:', error);
      return false;
    }
  }

  async dismissAllAlerts(userId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('credit_alerts')
        .update({ is_dismissed: true, is_read: true })
        .eq('user_id', userId)
        .eq('is_dismissed', false)
        .select('id');

      if (error) throw error;
      return data?.length || 0;
    } catch (error) {
      console.error('Dismiss all alerts error:', error);
      throw error;
    }
  }

  async getUnreadCount(userId) {
    try {
      const { count, error } = await supabaseAdmin
        .from('credit_alerts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('is_read', false)
        .eq('is_dismissed', false);

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Get unread count error:', error);
      throw error;
    }
  }
}