import { supabase } from '../supabaseClient';

export interface CreditScore {
  id?: string;
  user_id?: string;
  score: number;
  report_data?: Record<string, unknown> | null; // JSON object
  created_at?: string;
}

// Create a new credit score record
export async function createCreditScore(data: CreditScore) {
  const { data: result, error } = await supabase
    .from('credit_scores')
    .insert([data])
    .single();
  if (error) throw error;
  return result;
}

// Get credit scores for a user by user_id
export async function getCreditScoresByUserId(user_id: string) {
  const { data, error } = await supabase
    .from('credit_scores')
    .select('*')
    .eq('user_id', user_id);
  if (error) throw error;
  return data;
}

// Update credit score record by id
export async function updateCreditScore(id: string, data: Partial<CreditScore>) {
  const { data: result, error } = await supabase
    .from('credit_scores')
    .update(data)
    .eq('id', id)
    .single();
  if (error) throw error;
  return result;
}

export interface FinancialData {
  income: number;
  debt: number;
  assets: number;
  payment_history?: Record<string, unknown> | null;
}

// Placeholder function for credit score calculation logic
export function calculateCreditScore(financialData: FinancialData): number {
  // Implement your credit score calculation algorithm here
  // For example, a simple formula:
  // score = (income - debt + assets) / some_factor
  // This is just a placeholder and should be replaced with real logic

  const income = financialData.income || 0;
  const debt = financialData.debt || 0;
  const assets = financialData.assets || 0;

  const score = Math.max(0, Math.min(850, Math.round((income - debt + assets) / 1000)));
  return score;
}
