import { supabaseAdmin } from '../config/supabase.js';

export class UserService {
  async createUserProfile(userId, profileData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('user_profiles')
        .insert({
          id: userId,
          ...profileData
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Create user profile error:', error);
      throw error;
    }
  }

  async getUserProfile(userId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Get user profile error:', error);
      throw error;
    }
  }

  async updateUserProfile(userId, updates) {
    try {
      const { data, error } = await supabaseAdmin
        .from('user_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Update user profile error:', error);
      throw error;
    }
  }
}