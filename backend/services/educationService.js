import { supabaseAdmin } from '../config/supabase.js';

export class EducationService {
  async getTips(options = {}) {
    try {
      const { page = 1, limit = 10, category, difficulty } = options;
      const offset = (page - 1) * limit;

      let query = supabaseAdmin
        .from('educational_tips')
        .select('*', { count: 'exact' });

      if (category) {
        query = query.eq('category', category);
      }

      if (difficulty) {
        query = query.eq('difficulty', difficulty);
      }

      const { data, error, count } = await query
        .order('sort_order', { ascending: true })
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
      console.error('Get tips error:', error);
      throw error;
    }
  }

  async getTip(tipId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('educational_tips')
        .select('*')
        .eq('id', tipId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Get tip error:', error);
      throw error;
    }
  }

  async getCategories() {
    try {
      const { data, error } = await supabaseAdmin
        .from('educational_tips')
        .select('category')
        .order('category');

      if (error) throw error;

      // Get unique categories
      const categories = [...new Set(data.map(item => item.category))];
      return categories;
    } catch (error) {
      console.error('Get categories error:', error);
      throw error;
    }
  }

  getScoreRanges() {
    return [
      { range: '800-850', label: 'Excellent', description: 'Best rates available' },
      { range: '740-799', label: 'Very Good', description: 'Above average rates' },
      { range: '670-739', label: 'Good', description: 'Near average rates' },
      { range: '580-669', label: 'Fair', description: 'Below average rates' },
      { range: '300-579', label: 'Poor', description: 'Highest rates/deposits required' }
    ];
  }

  getCreditFactorsInfo() {
    return [
      { 
        name: 'Payment History', 
        weight: '35%', 
        description: 'Your track record of making payments on time' 
      },
      { 
        name: 'Credit Utilization', 
        weight: '30%', 
        description: 'How much of your available credit you\'re using' 
      },
      { 
        name: 'Length of Credit History', 
        weight: '15%', 
        description: 'How long you\'ve had credit accounts' 
      },
      { 
        name: 'Credit Mix', 
        weight: '10%', 
        description: 'The variety of credit accounts you have' 
      },
      { 
        name: 'New Credit', 
        weight: '10%', 
        description: 'How often you apply for and open new accounts' 
      }
    ];
  }
}