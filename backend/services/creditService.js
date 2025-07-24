import { supabaseAdmin } from '../config/supabase.js';

export class CreditService {
  async getCurrentScore(userId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('credit_scores')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Get current score error:', error);
      throw error;
    }
  }

  async getScoreHistory(userId, options = {}) {
    try {
      const { page = 1, limit = 10 } = options;
      const offset = (page - 1) * limit;

      const { data, error, count } = await supabaseAdmin
        .from('credit_scores')
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
      console.error('Get score history error:', error);
      throw error;
    }
  }

  async updateScore(userId, score, factors = null) {
    try {
      // Get previous score for change calculation
      const previousScore = await this.getCurrentScore(userId);
      const scoreChange = previousScore ? score - previousScore.score : 0;

      const { data, error } = await supabaseAdmin
        .from('credit_scores')
        .insert({
          user_id: userId,
          score,
          score_change: scoreChange,
          factors: factors || this.getDefaultFactors()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Update score error:', error);
      throw error;
    }
  }

  async getCreditFactors(userId) {
    try {
      const currentScore = await this.getCurrentScore(userId);
      return currentScore?.factors || this.getDefaultFactors();
    } catch (error) {
      console.error('Get credit factors error:', error);
      throw error;
    }
  }

  async getCreditTrends(userId, period = 'month') {
    try {
      let dateFilter = new Date();
      
      switch (period) {
        case 'week':
          dateFilter.setDate(dateFilter.getDate() - 7);
          break;
        case 'quarter':
          dateFilter.setMonth(dateFilter.getMonth() - 3);
          break;
        case 'year':
          dateFilter.setFullYear(dateFilter.getFullYear() - 1);
          break;
        default: // month
          dateFilter.setMonth(dateFilter.getMonth() - 1);
      }

      const { data, error } = await supabaseAdmin
        .from('credit_scores')
        .select('score, created_at')
        .eq('user_id', userId)
        .gte('created_at', dateFilter.toISOString())
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get credit trends error:', error);
      throw error;
    }
  }

  getDefaultFactors() {
    return {
      payment_history: 95,
      credit_utilization: 75,
      length_of_history: 85,
      types_of_credit: 70,
      new_credit: 80
    };
  }

  getScoreCategory(score) {
    if (score >= 800) return 'Excellent';
    if (score >= 740) return 'Very Good';
    if (score >= 670) return 'Good';
    if (score >= 580) return 'Fair';
    return 'Poor';
  }
}