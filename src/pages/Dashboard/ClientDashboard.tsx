import React, { useState } from 'react';
import { CreditCard, TrendingUp, CheckCircle, FileText, Calculator, Target, Award } from 'lucide-react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';

export function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('overview');


  const creditScore = 785;
  const scoreChange = 12;
  const loanApplications = [
    { id: 1, bank: 'CBZ Bank', amount: 50000, status: 'approved', date: '2024-01-15' },
    { id: 2, bank: 'Steward Bank', amount: 25000, status: 'pending', date: '2024-01-20' },
    { id: 3, bank: 'Nedbank', amount: 75000, status: 'rejected', date: '2024-01-10' }
  ];

  const creditFactors = [
    { name: 'Payment History', score: 95, color: 'success' },
    { name: 'Credit Utilization', score: 75, color: 'warning' },
    { name: 'Length of Credit History', score: 85, color: 'primary' },
    { name: 'Types of Credit', score: 70, color: 'warning' },
    { name: 'New Credit', score: 80, color: 'primary' }
  ];

  const recommendations = [
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: 'Reduce Credit Utilization',
      description: 'Keep your credit utilization below 30% to improve your score',
      priority: 'high'
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: 'Continue On-time Payments',
      description: 'Your payment history is excellent. Keep it up!',
      priority: 'low'
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: 'Diversify Credit Types',
      description: 'Consider adding different types of credit accounts',
      priority: 'medium'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-success-500';
    if (score >= 650) return 'text-warning-500';
    return 'text-error-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    return 'Fair';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success-100 text-success-800';
      case 'pending': return 'bg-warning-100 text-warning-800';
      case 'rejected': return 'bg-error-100 text-error-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'applications', label: 'Loan Applications', icon: <FileText className="h-4 w-4" /> },
    { id: 'calculator', label: 'Loan Calculator', icon: <Calculator className="h-4 w-4" /> },
    { id: 'improvement', label: 'Score Improvement', icon: <Award className="h-4 w-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Credit Report
          </h1>
          <p className="text-gray-600">
            Credit Score Handling
          </p>
        </div>

        {/* Credit Score Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Score</h2>
              <div className="relative">
                <div className="w-48 h-48 mx-auto">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#007bff"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(creditScore / 850) * 251.2} 251.2`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${getScoreColor(creditScore)}`}>
                        {creditScore}
                      </div>
                      <div className="text-sm text-gray-500">max 1000</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className={`text-lg font-semibold ${getScoreColor(creditScore)}`}>
                  {getScoreLabel(creditScore)}
                </div>
                <div className="flex items-center justify-center mt-2">
                  <TrendingUp className="h-4 w-4 text-success-500 mr-1" />
                  <span className="text-sm text-success-600">
                    +{scoreChange} tokens this month
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card>
              <div className="flex items-center">
                <div className="bg-primary-100 rounded-lg p-3">
                  <FileText className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">3</div>
                  <div className="text-sm text-gray-500">Active Applications</div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="bg-success-100 rounded-lg p-3">
                  <CheckCircle className="h-6 w-6 text-success-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-500">Approval Rate</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Credit Factors */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Credit Score Factors
              </h3>
              <div className="space-y-4">
                {creditFactors.map((factor, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {factor.name}
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {factor.score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          factor.color === 'success' ? 'bg-success-500' :
                          factor.color === 'warning' ? 'bg-warning-500' : 'bg-primary-500'
                        }`}
                        style={{ width: `${factor.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommendations */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Improvement Recommendations
              </h3>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      rec.priority === 'high' ? 'bg-error-100 text-error-600' :
                      rec.priority === 'medium' ? 'bg-warning-100 text-warning-600' :
                      'bg-success-100 text-success-600'
                    }`}>
                      {rec.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {rec.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {rec.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'applications' && (
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Loan Applications
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loanApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {app.bank}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${app.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(app.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'calculator' && (
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Loan Calculator
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter rate"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Term (months)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter term"
                  />
                </div>
                <Button className="w-full">
                  Calculate Payment
                </Button>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Calculation Results
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Payment:</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Interest:</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'improvement' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Score Improvement Plan
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                  <h4 className="font-semibold text-primary-900 mb-2">
                    Short-term Goals (1-3 months)
                  </h4>
                  <ul className="text-sm text-primary-800 space-y-1">
                    <li>• Pay down credit card balances below 30% utilization</li>
                    <li>• Set up automatic payments for all bills</li>
                    <li>• Monitor credit report for errors</li>
                  </ul>
                </div>
                <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
                  <h4 className="font-semibold text-warning-900 mb-2">
                    Medium-term Goals (3-6 months)
                  </h4>
                  <ul className="text-sm text-warning-800 space-y-1">
                    <li>• Keep old accounts open to maintain credit history</li>
                    <li>• Consider a secured credit card if needed</li>
                    <li>• Limit new credit applications</li>
                  </ul>
                </div>
                <div className="p-4 bg-success-50 rounded-lg border border-success-200">
                  <h4 className="font-semibold text-success-900 mb-2">
                    Long-term Goals (6+ months)
                  </h4>
                  <ul className="text-sm text-success-800 space-y-1">
                    <li>• Maintain diverse credit mix</li>
                    <li>• Keep utilization below 10% for optimal score</li>
                    <li>• Build long-term payment history</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Credit Score Simulator
              </h3>
              <p className="text-gray-600 mb-4">
                See how different actions might affect your credit score
              </p>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Pay off $5,000 credit card debt</span>
                    <span className="text-success-600 font-semibold">+25 points</span>
                  </div>
                  <div className="text-xs text-gray-500">Impact: High</div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Open new credit card</span>
                    <span className="text-error-600 font-semibold">-10 points</span>
                  </div>
                  <div className="text-xs text-gray-500">Impact: Temporary</div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Make all payments on time for 6 months</span>
                    <span className="text-success-600 font-semibold">+15 points</span>
                  </div>
                  <div className="text-xs text-gray-500">Impact: Medium</div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}