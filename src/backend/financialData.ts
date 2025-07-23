import { supabase } from '../supabaseClient';

export interface FinancialData {
  id?: string;
  user_id?: string;
  income: number;
  debt: number;
  assets: number;
  payment_history?: Record<string, unknown> | null; // JSON object
  created_at?: string;
}

// Create a new financial data record
export async function createFinancialData(data: FinancialData) {
  const { data: result, error } = await supabase
    .from('financial_data')
    .insert([data])
    .single();
  if (error) throw error;
  return result;
}

// Get financial data for a user by user_id
export async function getFinancialDataByUserId(user_id: string) {
  const { data, error } = await supabase
    .from('financial_data')
    .select('*')
    .eq('user_id', user_id);
  if (error) throw error;
  return data;
}

// Update financial data record by id
export async function updateFinancialData(id: string, data: Partial<FinancialData>) {
  const { data: result, error } = await supabase
    .from('financial_data')
    .update(data)
    .eq('id', id)
    .single();
  if (error) throw error;
  return result;
}

// Delete financial data record by id
export async function deleteFinancialData(id: string) {
  const { data, error } = await supabase
    .from('financial_data')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return data;
}
