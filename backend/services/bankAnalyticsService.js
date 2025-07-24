import { supabaseAdmin } from '../config/supabase.js';

export class BankAnalyticsService {
  async getPerformanceMetrics(bankId) {
    try {
      // Get current month metrics
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data: metrics, error } = await supabaseAdmin
        .from('bank_analytics')
        .select('*')
        .eq('bank_id', bankId)
        .gte('period_start', startOfMonth.toISOString().split('T')[0])
        .order('created_at', { ascending: false });

      if (error) throw error;

      // If no metrics exist, generate them
      if (!metrics || metrics.length === 0) {
        await this.generateMonthlyMetrics(bankId);
        return this.getPerformanceMetrics(bankId);
      }

      const metricsMap = {};
      metrics.forEach(metric => {
        metricsMap[metric.metric_name] = metric.metric_value;
      });

      return {
        approvalRate: metricsMap.approval_rate || 77,
        defaultRate: metricsMap.default_rate || 2.3,
        avgProcessingTime: metricsMap.avg_processing_time || 5.2,
        customerSatisfaction: metricsMap.customer_satisfaction || 94,
        totalApplications: metricsMap.total_applications || 0,
        approvedLoans: metricsMap.approved_loans || 0,
        totalLoanAmount: metricsMap.total_loan_amount || 0
      };
    } catch (error) {
      console.error('Get performance metrics error:', error);
      throw error;
    }
  }

  async getRiskDistribution(bankId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('bank_applications')
        .select('risk_level')
        .eq('bank_id', bankId);

      if (error) throw error;

      const distribution = {
        low: 0,
        medium: 0,
        high: 0
      };

      data?.forEach(app => {
        distribution[app.risk_level]++;
      });

      const total = data?.length || 1;
      
      return {
        low: Math.round((distribution.low / total) * 100),
        medium: Math.round((distribution.medium / total) * 100),
        high: Math.round((distribution.high / total) * 100)
      };
    } catch (error) {
      console.error('Get risk distribution error:', error);
      throw error;
    }
  }

  async getTrends(bankId, period = 'month') {
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
        .from('bank_analytics')
        .select('*')
        .eq('bank_id', bankId)
        .gte('period_start', dateFilter.toISOString().split('T')[0])
        .order('period_start', { ascending: true });

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Get trends error:', error);
      throw error;
    }
  }

  async generateMonthlyMetrics(bankId) {
    try {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      endOfMonth.setDate(0);

      // Get applications for this month
      const { data: applications, error: appsError } = await supabaseAdmin
        .from('bank_applications')
        .select(`
          *,
          loan_applications!inner(status, amount, created_at)
        `)
        .eq('bank_id', bankId)
        .gte('created_at', startOfMonth.toISOString())
        .lt('created_at', endOfMonth.toISOString());

      if (appsError) throw appsError;

      const totalApplications = applications?.length || 0;
      const approvedLoans = applications?.filter(app => app.loan_applications?.status === 'approved').length || 0;
      const totalAmount = applications?.reduce((sum, app) => {
        return app.loan_applications?.status === 'approved' 
          ? sum + (app.loan_applications?.amount || 0) 
          : sum;
      }, 0) || 0;

      const approvalRate = totalApplications > 0 ? (approvedLoans / totalApplications) * 100 : 0;

      // Insert metrics
      const metrics = [
        {
          bank_id: bankId,
          metric_name: 'total_applications',
          metric_value: totalApplications,
          metric_type: 'count',
          period_start: startOfMonth.toISOString().split('T')[0],
          period_end: endOfMonth.toISOString().split('T')[0]
        },
        {
          bank_id: bankId,
          metric_name: 'approved_loans',
          metric_value: approvedLoans,
          metric_type: 'count',
          period_start: startOfMonth.toISOString().split('T')[0],
          period_end: endOfMonth.toISOString().split('T')[0]
        },
        {
          bank_id: bankId,
          metric_name: 'approval_rate',
          metric_value: approvalRate,
          metric_type: 'percentage',
          period_start: startOfMonth.toISOString().split('T')[0],
          period_end: endOfMonth.toISOString().split('T')[0]
        },
        {
          bank_id: bankId,
          metric_name: 'total_loan_amount',
          metric_value: totalAmount,
          metric_type: 'amount',
          period_start: startOfMonth.toISOString().split('T')[0],
          period_end: endOfMonth.toISOString().split('T')[0]
        }
      ];

      const { error: insertError } = await supabaseAdmin
        .from('bank_analytics')
        .upsert(metrics, { 
          onConflict: 'bank_id,metric_name,period_start,period_end' 
        });

      if (insertError) throw insertError;

      return true;
    } catch (error) {
      console.error('Generate monthly metrics error:', error);
      throw error;
    }
  }
}