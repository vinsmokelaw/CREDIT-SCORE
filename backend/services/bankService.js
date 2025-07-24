import { supabaseAdmin } from '../config/supabase.js';

export class BankService {
  async getDashboardStats(bankId) {
    try {
      // Get total applications
      const { count: totalApplications } = await supabaseAdmin
        .from('bank_applications')
        .select('*', { count: 'exact', head: true })
        .eq('bank_id', bankId);

      // Get approved loans
      const { count: approvedLoans } = await supabaseAdmin
        .from('bank_applications')
        .select('loan_applications!inner(*)', { count: 'exact', head: true })
        .eq('bank_id', bankId)
        .eq('loan_applications.status', 'approved');

      // Get pending review
      const { count: pendingReview } = await supabaseAdmin
        .from('bank_applications')
        .select('loan_applications!inner(*)', { count: 'exact', head: true })
        .eq('bank_id', bankId)
        .eq('loan_applications.status', 'pending');

      // Get total loan amount
      const { data: loanAmounts } = await supabaseAdmin
        .from('bank_applications')
        .select('loan_applications!inner(amount)')
        .eq('bank_id', bankId)
        .eq('loan_applications.status', 'approved');

      const totalAmount = loanAmounts?.reduce((sum, item) => sum + (item.loan_applications?.amount || 0), 0) || 0;

      // Get average credit score
      const { data: creditScores } = await supabaseAdmin
        .from('bank_applications')
        .select('client_id, user_profiles!inner(id), credit_scores!inner(score)')
        .eq('bank_id', bankId);

      const avgCreditScore = creditScores?.length > 0 
        ? Math.round(creditScores.reduce((sum, item) => sum + (item.credit_scores?.score || 0), 0) / creditScores.length)
        : 0;

      // Calculate approval rate
      const approvalRate = totalApplications > 0 ? Math.round((approvedLoans / totalApplications) * 100) : 0;

      return {
        totalApplications: totalApplications || 0,
        approvedLoans: approvedLoans || 0,
        pendingReview: pendingReview || 0,
        totalAmount: totalAmount || 0,
        avgCreditScore,
        approvalRate
      };
    } catch (error) {
      console.error('Get dashboard stats error:', error);
      throw error;
    }
  }

  async getRecentApplications(bankId, options = {}) {
    try {
      const { page = 1, limit = 10 } = options;
      const offset = (page - 1) * limit;

      const { data, error, count } = await supabaseAdmin
        .from('bank_applications')
        .select(`
          *,
          loan_applications!inner(
            id, bank_name, amount, purpose, status, application_date
          ),
          user_profiles!inner(
            id, full_name
          ),
          credit_scores!inner(
            score
          )
        `, { count: 'exact' })
        .eq('bank_id', bankId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      const formattedData = data?.map(app => ({
        id: app.id,
        name: app.user_profiles?.full_name,
        amount: app.loan_applications?.amount,
        creditScore: app.credit_scores?.score,
        status: app.loan_applications?.status,
        riskLevel: app.risk_level,
        date: app.loan_applications?.application_date,
        purpose: app.loan_applications?.purpose
      })) || [];

      return {
        data: formattedData,
        pagination: {
          page,
          limit,
          total: count,
          totalPages: Math.ceil(count / limit)
        }
      };
    } catch (error) {
      console.error('Get recent applications error:', error);
      throw error;
    }
  }

  async getCreditDistribution(bankId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('bank_applications')
        .select(`
          credit_scores!inner(score)
        `)
        .eq('bank_id', bankId);

      if (error) throw error;

      const scores = data?.map(item => item.credit_scores?.score).filter(Boolean) || [];
      
      const distribution = [
        { range: '800-850', count: 0, percentage: 0 },
        { range: '750-799', count: 0, percentage: 0 },
        { range: '700-749', count: 0, percentage: 0 },
        { range: '650-699', count: 0, percentage: 0 },
        { range: '600-649', count: 0, percentage: 0 },
        { range: 'Below 600', count: 0, percentage: 0 }
      ];

      scores.forEach(score => {
        if (score >= 800) distribution[0].count++;
        else if (score >= 750) distribution[1].count++;
        else if (score >= 700) distribution[2].count++;
        else if (score >= 650) distribution[3].count++;
        else if (score >= 600) distribution[4].count++;
        else distribution[5].count++;
      });

      const total = scores.length;
      distribution.forEach(item => {
        item.percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
      });

      return distribution;
    } catch (error) {
      console.error('Get credit distribution error:', error);
      throw error;
    }
  }

  async getApplications(bankId, options = {}) {
    try {
      const { page = 1, limit = 10, status, riskLevel } = options;
      const offset = (page - 1) * limit;

      let query = supabaseAdmin
        .from('bank_applications')
        .select(`
          *,
          loan_applications!inner(
            id, bank_name, amount, purpose, status, application_date
          ),
          user_profiles!inner(
            id, full_name
          ),
          credit_scores!inner(
            score
          )
        `, { count: 'exact' })
        .eq('bank_id', bankId);

      if (status) {
        query = query.eq('loan_applications.status', status);
      }

      if (riskLevel) {
        query = query.eq('risk_level', riskLevel);
      }

      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      const formattedData = data?.map(app => ({
        id: app.id,
        name: app.user_profiles?.full_name,
        amount: app.loan_applications?.amount,
        creditScore: app.credit_scores?.score,
        status: app.loan_applications?.status,
        riskLevel: app.risk_level,
        date: app.loan_applications?.application_date,
        purpose: app.loan_applications?.purpose,
        riskScore: app.risk_score,
        debtToIncomeRatio: app.debt_to_income_ratio,
        employmentVerified: app.employment_verified,
        incomeVerified: app.income_verified
      })) || [];

      return {
        data: formattedData,
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

  async searchApplications(bankId, searchTerm, options = {}) {
    try {
      const { page = 1, limit = 10 } = options;
      const offset = (page - 1) * limit;

      const { data, error, count } = await supabaseAdmin
        .from('bank_applications')
        .select(`
          *,
          loan_applications!inner(
            id, bank_name, amount, purpose, status, application_date
          ),
          user_profiles!inner(
            id, full_name
          ),
          credit_scores!inner(
            score
          )
        `, { count: 'exact' })
        .eq('bank_id', bankId)
        .or(`user_profiles.full_name.ilike.%${searchTerm}%,loan_applications.purpose.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      const formattedData = data?.map(app => ({
        id: app.id,
        name: app.user_profiles?.full_name,
        amount: app.loan_applications?.amount,
        creditScore: app.credit_scores?.score,
        status: app.loan_applications?.status,
        riskLevel: app.risk_level,
        date: app.loan_applications?.application_date,
        purpose: app.loan_applications?.purpose
      })) || [];

      return {
        data: formattedData,
        pagination: {
          page,
          limit,
          total: count,
          totalPages: Math.ceil(count / limit)
        }
      };
    } catch (error) {
      console.error('Search applications error:', error);
      throw error;
    }
  }

  async getApplication(bankId, applicationId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('bank_applications')
        .select(`
          *,
          loan_applications!inner(*),
          user_profiles!inner(*),
          credit_scores!inner(*)
        `)
        .eq('bank_id', bankId)
        .eq('id', applicationId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Get application error:', error);
      throw error;
    }
  }

  async updateRiskAssessment(bankId, applicationId, riskData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('bank_applications')
        .update({
          risk_level: riskData.riskLevel,
          risk_score: riskData.riskScore,
          debt_to_income_ratio: riskData.debtToIncomeRatio,
          employment_verified: riskData.employmentVerified,
          income_verified: riskData.incomeVerified,
          collateral_value: riskData.collateralValue,
          processing_notes: riskData.processingNotes
        })
        .eq('bank_id', bankId)
        .eq('id', applicationId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Update risk assessment error:', error);
      throw error;
    }
  }

  async updateApplicationStatus(bankId, applicationId, status, notes) {
    try {
      // Update the loan application status
      const { data: loanApp, error: loanError } = await supabaseAdmin
        .from('loan_applications')
        .update({ 
          status,
          notes: notes || null,
          decision_date: status !== 'pending' ? new Date().toISOString().split('T')[0] : null
        })
        .eq('id', applicationId)
        .select()
        .single();

      if (loanError) throw loanError;

      // Update bank application notes
      const { data, error } = await supabaseAdmin
        .from('bank_applications')
        .update({ processing_notes: notes })
        .eq('bank_id', bankId)
        .eq('application_id', applicationId)
        .select()
        .single();

      if (error) throw error;
      return { ...data, loan_application: loanApp };
    } catch (error) {
      console.error('Update application status error:', error);
      throw error;
    }
  }

  async generateRiskReport(bankId) {
    try {
      const stats = await this.getDashboardStats(bankId);
      const distribution = await this.getCreditDistribution(bankId);
      
      return {
        generatedAt: new Date().toISOString(),
        bankId,
        summary: stats,
        creditDistribution: distribution,
        riskMetrics: {
          highRiskApplications: stats.totalApplications * 0.1, // Mock calculation
          averageRiskScore: 65.5, // Mock value
          defaultProbability: 2.3 // Mock value
        }
      };
    } catch (error) {
      console.error('Generate risk report error:', error);
      throw error;
    }
  }

  async generatePerformanceReport(bankId) {
    try {
      const stats = await this.getDashboardStats(bankId);
      
      return {
        generatedAt: new Date().toISOString(),
        bankId,
        performance: {
          approvalRate: stats.approvalRate,
          totalLoansApproved: stats.approvedLoans,
          totalLoanAmount: stats.totalAmount,
          averageProcessingTime: 5.2, // Mock value in days
          customerSatisfaction: 94 // Mock percentage
        },
        trends: {
          monthlyGrowth: 12.5, // Mock percentage
          quarterlyGrowth: 35.2 // Mock percentage
        }
      };
    } catch (error) {
      console.error('Generate performance report error:', error);
      throw error;
    }
  }

  async generateCustomerReport(bankId) {
    try {
      const stats = await this.getDashboardStats(bankId);
      const distribution = await this.getCreditDistribution(bankId);
      
      return {
        generatedAt: new Date().toISOString(),
        bankId,
        customerMetrics: {
          totalCustomers: stats.totalApplications,
          averageCreditScore: stats.avgCreditScore,
          creditDistribution: distribution,
          retentionRate: 89.5, // Mock percentage
          acquisitionRate: 15.3 // Mock percentage
        }
      };
    } catch (error) {
      console.error('Generate customer report error:', error);
      throw error;
    }
  }
}