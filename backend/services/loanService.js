import { supabaseAdmin } from '../config/supabase.js';

export class LoanService {
  async getApplications(userId, options = {}) {
    try {
      const { page = 1, limit = 10 } = options;
      const offset = (page - 1) * limit;

      const { data, error, count } = await supabaseAdmin
        .from('loan_applications')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
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
      console.error('Get applications error:', error);
      throw error;
    }
  }

  async createApplication(userId, applicationData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('loan_applications')
        .insert({
          user_id: userId,
          ...applicationData
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Create application error:', error);
      throw error;
    }
  }

  async getApplication(userId, applicationId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('loan_applications')
        .select('*')
        .eq('user_id', userId)
        .eq('id', applicationId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Get application error:', error);
      throw error;
    }
  }

  async updateApplication(userId, applicationId, updates) {
    try {
      const { data, error } = await supabaseAdmin
        .from('loan_applications')
        .update(updates)
        .eq('user_id', userId)
        .eq('id', applicationId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Update application error:', error);
      throw error;
    }
  }

  async deleteApplication(userId, applicationId) {
    try {
      const { error } = await supabaseAdmin
        .from('loan_applications')
        .delete()
        .eq('user_id', userId)
        .eq('id', applicationId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Delete application error:', error);
      return false;
    }
  }

  async getApplicationsByStatus(userId, status, options = {}) {
    try {
      const { page = 1, limit = 10 } = options;
      const offset = (page - 1) * limit;

      const { data, error, count } = await supabaseAdmin
        .from('loan_applications')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .eq('status', status)
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
      console.error('Get applications by status error:', error);
      throw error;
    }
  }
}