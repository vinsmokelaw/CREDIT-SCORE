import { supabaseAdmin } from '../config/supabase.js';

export class RecommendationService {
  async getPersonalizedRecommendations(userId, creditScore, creditFactors) {
    try {
      // Get existing recommendations
      const { data: existingRecs, error } = await supabaseAdmin
        .from('recommendations')
        .select('*')
        .eq('user_id', userId)
        .eq('is_completed', false)
        .order('priority', { ascending: false })
        .order('impact_score', { ascending: false });

      if (error) throw error;

      // Generate new recommendations based on credit data
      const newRecommendations = this.generateRecommendations(creditScore, creditFactors);

      // Merge with existing recommendations
      const allRecommendations = [...existingRecs, ...newRecommendations];

      return allRecommendations.slice(0, 10); // Return top 10
    } catch (error) {
      console.error('Get personalized recommendations error:', error);
      throw error;
    }
  }

  async generateImprovementPlan(userId, creditScore, creditFactors) {
    try {
      const plan = {
        currentScore: creditScore?.score || 0,
        targetScore: Math.min(850, (creditScore?.score || 600) + 50),
        timeframe: '3-6 months',
        shortTerm: [],
        mediumTerm: [],
        longTerm: []
      };

      // Generate plan based on credit factors
      if (creditFactors?.credit_utilization < 70) {
        plan.shortTerm.push({
          action: 'Reduce credit utilization below 30%',
          impact: 'High',
          timeframe: '1-2 months'
        });
      }

      if (creditFactors?.payment_history < 90) {
        plan.shortTerm.push({
          action: 'Set up automatic payments for all bills',
          impact: 'High',
          timeframe: '1 month'
        });
      }

      plan.mediumTerm.push({
        action: 'Keep old accounts open to maintain credit history',
        impact: 'Medium',
        timeframe: '3-6 months'
      });

      plan.longTerm.push({
        action: 'Maintain diverse credit mix',
        impact: 'Low',
        timeframe: '6+ months'
      });

      return plan;
    } catch (error) {
      console.error('Generate improvement plan error:', error);
      throw error;
    }
  }

  async markRecommendationCompleted(userId, recommendationId) {
    try {
      const { error } = await supabaseAdmin
        .from('recommendations')
        .update({ 
          is_completed: true, 
          completed_at: new Date().toISOString() 
        })
        .eq('user_id', userId)
        .eq('id', recommendationId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Mark recommendation completed error:', error);
      return false;
    }
  }

  generateRecommendations(creditScore, creditFactors) {
    const recommendations = [];
    const score = creditScore?.score || 0;
    const factors = creditFactors || {};

    // Credit utilization recommendations
    if (factors.credit_utilization < 70) {
      recommendations.push({
        title: 'Reduce Credit Utilization',
        description: 'Keep your credit utilization below 30% to improve your score',
        category: 'Credit Utilization',
        priority: 'high',
        impact_score: 8
      });
    }

    // Payment history recommendations
    if (factors.payment_history < 90) {
      recommendations.push({
        title: 'Improve Payment History',
        description: 'Set up automatic payments to ensure you never miss a payment',
        category: 'Payment History',
        priority: 'high',
        impact_score: 9
      });
    }

    // Credit mix recommendations
    if (factors.types_of_credit < 75) {
      recommendations.push({
        title: 'Diversify Credit Types',
        description: 'Consider adding different types of credit accounts',
        category: 'Credit Mix',
        priority: 'medium',
        impact_score: 5
      });
    }

    return recommendations;
  }
}