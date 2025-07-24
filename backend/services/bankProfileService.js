import { supabaseAdmin } from '../config/supabase.js';

export class BankProfileService {
  async createBankProfile(bankId, profileData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('bank_profiles')
        .insert({
          id: bankId,
          ...profileData
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Create bank profile error:', error);
      throw error;
    }
  }

  async getBankProfile(bankId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('bank_profiles')
        .select('*')
        .eq('id', bankId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Get bank profile error:', error);
      throw error;
    }
  }

  async updateBankProfile(bankId, updates) {
    try {
      const { data, error } = await supabaseAdmin
        .from('bank_profiles')
        .update(updates)
        .eq('id', bankId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Update bank profile error:', error);
      throw error;
    }
  }

  async getAllBanks() {
    try {
      const { data, error } = await supabaseAdmin
        .from('bank_profiles')
        .select('id, bank_name, bank_code, email')
        .order('bank_name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Get all banks error:', error);
      throw error;
    }
  }
}