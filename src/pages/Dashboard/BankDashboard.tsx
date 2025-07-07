import React, { useState } from 'react';
import { Users, TrendingUp, DollarSign, AlertTriangle, FileText, Search, Filter, BarChart3, PieChart } from 'lucide-react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { useAuth } from '../../contexts/AuthContext';

export function BankDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const stats = {
    totalApplications: 245,
    approvedLoans: 189,
    pendingReview: 34,
    totalAmount: 12500000,
    avgCreditScore: 725,
    approvalRate: 77
  };

  const recentApplications = [
    { 
      id: 1, 
      name: 'John Mukamuri', 
      amount: 50000, 
      creditScore: 785, 
      status: 'pending',
      riskLevel: 'low',
      date: '2024-01-20',
      purpose: 'Home Purchase'
    },
    { 
      id: 2, 
      name: 'Sarah Moyo', 
      amount: 25000, 
      creditScore: 692, 
      status: 'approved',
      riskLevel: 'medium',
      date: '2024-01-19',
      purpose: 'Vehicle'
    },
    { 
      id: 3, 
      name: 'David Chikwanha', 
      amount: 75000, 
      creditScore: 845, 
      status: 'approved',
      riskLevel: 'low',
      date: '2024-01-18',
      purpose: 'Business Expansion'
    },
    { 
      id: 4, 
      name: 'Grace Madziva', 
      amount: 30000, 
      creditScore: 620, 
      status: 'review',
      riskLevel: 'high',
      date: '2024-01-17',
      purpose: 'Debt Consolidation'
    }
  ];

  const creditDistribution = [
    { range: '800-850', count: 45, percentage: 18 },
    { range: '750-799', count: 78, percentage: 32 },
    { range: '700-749', count: 65, percentage: 27 },
    { range: '650-699', count: 32, percentage: 13 },
    { range: '600-649', count: 18, percentage: 7 },
    { range: 'Below 600', count: 7, percentage: 3 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success-100 text-success-800';
      case 'pending': return 'bg-warning-100 text-warning-800';
      case 'review': return 'bg-error-100 text-error-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-success-600';
      case 'medium': return 'text-warning-600';
      case 'high': return 'text-error-600';
      default: return 'text-gray-600';
    }
  };

  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return 'text-success-600';
    if (score >= 650) return 'text-warning-600';
    return 'text-error-600';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'applications', label: 'Applications', icon: <FileText className="h-4 w-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <PieChart className="h-4 w-4" /> },
    { id: 'reports', label: 'Reports', icon: <TrendingUp className="h-4 w-4" /> }
  ];

  const filteredApplications = recentApplications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {user?.bank} Dashboard
          </h1>
          <p className="text-gray-600">
            Manage loan applications and monitor credit risk
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center">
              <div className="bg-primary-100 rounded-lg p-3">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.totalApplications}</div>
                <div className="text-sm text-gray-500">Total Applications</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="bg-success-100 rounded-lg p-3">
                <DollarSign className="h-6 w-6 text-success-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  ${(stats.totalAmount / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-gray-500">Total Loan Amount</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="bg-warning-100 rounded-lg p-3">
                <TrendingUp className="h-6 w-6 text-warning-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.avgCreditScore}</div>
                <div className="text-sm text-gray-500">Avg Credit Score</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="bg-primary-100 rounded-lg p-3">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.approvalRate}%</div>
                <div className="text-sm text-gray-500">Approval Rate</div>
              </div>
            </div>
          </Card>
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
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Review Pending Applications
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Generate Risk Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Client Management
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Applications
                </h3>
                <div className="space-y-4">
                  {recentApplications.slice(0, 4).map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{app.name}</div>
                        <div className="text-sm text-gray-500">
                          ${app.amount.toLocaleString()} • {app.purpose}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                        <div className={`text-sm font-medium ${getCreditScoreColor(app.creditScore)}`}>
                          Score: {app.creditScore}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Credit Score Distribution
                </h3>
                <div className="space-y-3">
                  {creditDistribution.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-20 text-sm text-gray-600">{item.range}</div>
                      <div className="flex-1 mx-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-12 text-sm text-gray-900 font-medium text-right">
                        {item.count}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">
                Loan Applications
              </h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credit Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk Level
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
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{app.name}</div>
                          <div className="text-sm text-gray-500">{app.purpose}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${app.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${getCreditScoreColor(app.creditScore)}`}>
                          {app.creditScore}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium capitalize ${getRiskColor(app.riskLevel)}`}>
                          {app.riskLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(app.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Button variant="ghost" size="sm">
                          Review
                        </Button>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Monthly Trends
              </h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Chart visualization would appear here</p>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Risk Assessment
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Low Risk</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div className="bg-success-500 h-2 rounded-full w-4/5"></div>
                    </div>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Medium Risk</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div className="bg-warning-500 h-2 rounded-full w-1/4"></div>
                    </div>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">High Risk</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div className="bg-error-500 h-2 rounded-full w-1/12"></div>
                    </div>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Performance Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-500 mb-2">77%</div>
                  <div className="text-sm text-gray-600">Approval Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success-500 mb-2">2.3%</div>
                  <div className="text-sm text-gray-600">Default Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning-500 mb-2">5.2 days</div>
                  <div className="text-sm text-gray-600">Avg Processing Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-500 mb-2">94%</div>
                  <div className="text-sm text-gray-600">Customer Satisfaction</div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Generate Reports
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="p-6 h-auto flex-col">
                  <FileText className="h-8 w-8 mb-2" />
                  <span className="font-medium">Risk Assessment Report</span>
                  <span className="text-sm text-gray-500 mt-1">Comprehensive risk analysis</span>
                </Button>
                <Button variant="outline" className="p-6 h-auto flex-col">
                  <TrendingUp className="h-8 w-8 mb-2" />
                  <span className="font-medium">Performance Report</span>
                  <span className="text-sm text-gray-500 mt-1">Monthly performance metrics</span>
                </Button>
                <Button variant="outline" className="p-6 h-auto flex-col">
                  <Users className="h-8 w-8 mb-2" />
                  <span className="font-medium">Customer Report</span>
                  <span className="text-sm text-gray-500 mt-1">Customer analytics</span>
                </Button>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Reports
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Monthly Risk Assessment - January 2024</div>
                    <div className="text-sm text-gray-500">Generated on Jan 31, 2024</div>
                  </div>
                  <Button variant="ghost" size="sm">Download</Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Performance Report - Q4 2023</div>
                    <div className="text-sm text-gray-500">Generated on Dec 31, 2023</div>
                  </div>
                  <Button variant="ghost" size="sm">Download</Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}