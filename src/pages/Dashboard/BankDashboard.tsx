import React, { useState } from 'react';
import { Users, TrendingUp, DollarSign, AlertTriangle, FileText, Search, Filter, BarChart3, PieChart, Bell, Calculator, BookOpen, Info, CheckCircle, XCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { useAuth } from '../../contexts/AuthContext';

export function BankDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');zr
  const [searchTerm, setSearchTerm] = useState('');
  const [simulatorScore, setSimulatorScore] = useState(650);
  const [simulatorPayment, setSimulatorPayment] = useState(500);
  const [simulatorDebt, setSimulatorDebt] = useState(15000);
  const [showAlerts, setShowAlerts] = useState(true);

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
    // { 
    //   id: 1, 
    //   name: 'John Mukamuri', 
    //   amount: 50000, 
    //   creditScore: 785, 
    //   status: 'pending',
    //   riskLevel: 'low',
    //   date: '2024-01-20',
    //   purpose: 'Home Purchase'
    // },
    // { 
    //   id: 2, 
    //   name: 'Sarah Moyo', 
    //   amount: 25000, 
    //   creditScore: 692, 
    //   status: 'approved',
    //   riskLevel: 'medium',
    //   date: '2024-01-19',
    //   purpose: 'Vehicle'
    // },
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

  // Credit Score Alerts
  const creditAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Risk Applications Increasing',
      message: '15% increase in applications with credit scores below 650 this month',
      timestamp: '2 hours ago',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'info',
      title: 'Credit Score Distribution Shift',
      message: 'Average credit score improved by 12 points compared to last month',
      timestamp: '1 day ago',
      severity: 'low'
    },
    {
      id: 3,
      type: 'error',
      title: 'Default Risk Alert',
      message: '3 clients with scores below 600 require immediate attention',
      timestamp: '3 hours ago',
      severity: 'high'
    }
  ];

  // Educational Tips
  const educationalTips = [
    {
      id: 1,
      category: 'Credit Scoring',
      title: 'Understanding Payment History Impact',
      content: 'Payment history accounts for 35% of a credit score. Even one late payment can significantly impact creditworthiness.',
      readTime: '3 min read'
    },
    {
      id: 2,
      category: 'Risk Assessment',
      title: 'Debt-to-Income Ratio Guidelines',
      content: 'A DTI ratio below 36% is generally considered good, while above 43% may indicate higher risk for loan default.',
      readTime: '4 min read'
    },
    {
      id: 3,
      category: 'Lending Best Practices',
      title: 'Alternative Credit Data Sources',
      content: 'Consider utility payments, rent history, and banking behavior for applicants with thin credit files.',
      readTime: '5 min read'
    },
    {
      id: 4,
      category: 'Regulatory Compliance',
      title: 'Fair Credit Reporting Act (FCRA) Updates',
      content: 'Recent changes to FCRA requirements for adverse action notices and credit report disputes.',
      readTime: '6 min read'
    }
  ];

  // Credit Simulator Functions
  const simulateScoreChange = (currentScore: number, payment: number, debt: number) => {
    let newScore = currentScore;
    
    // Payment history impact (35% of score)
    if (payment >= 500) newScore += 15;
    else if (payment >= 300) newScore += 8;
    else if (payment >= 100) newScore += 3;
    else newScore -= 10;
    
    // Credit utilization impact (30% of score)
    const utilizationRatio = debt / 20000; // Assuming $20k credit limit
    if (utilizationRatio < 0.1) newScore += 20;
    else if (utilizationRatio < 0.3) newScore += 10;
    else if (utilizationRatio < 0.5) newScore -= 5;
    else newScore -= 20;
    
    return Math.max(300, Math.min(850, Math.round(newScore)));
  };

  const getScoreCategory = (score: number) => {
    if (score >= 800) return { label: 'Excellent', color: 'text-success-600', bgColor: 'bg-success-100' };
    if (score >= 740) return { label: 'Very Good', color: 'text-success-600', bgColor: 'bg-success-100' };
    if (score >= 670) return { label: 'Good', color: 'text-warning-600', bgColor: 'bg-warning-100' };
    if (score >= 580) return { label: 'Fair', color: 'text-warning-600', bgColor: 'bg-warning-100' };
    return { label: 'Poor', color: 'text-error-600', bgColor: 'bg-error-100' };
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="h-5 w-5 text-error-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-warning-500" />;
      case 'info': return <Info className="h-5 w-5 text-primary-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertBorderColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-l-error-500';
      case 'medium': return 'border-l-warning-500';
      case 'low': return 'border-l-primary-500';
      default: return 'border-l-gray-500';
    }
  };

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
    { id: 'alerts', label: 'Credit Alerts', icon: <Bell className="h-4 w-4" /> },
    { id: 'simulator', label: 'Credit Simulator', icon: <Calculator className="h-4 w-4" /> },
    { id: 'education', label: 'Education', icon: <BookOpen className="h-4 w-4" /> },
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
            {/* Credit Alerts Summary */}
            {showAlerts && creditAlerts.length > 0 && (
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-warning-500" />
                    Recent Credit Alerts
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowAlerts(false)}
                  >
                    Dismiss All
                  </Button>
                </div>
                <div className="space-y-3">
                  {creditAlerts.slice(0, 2).map((alert) => (
                    <div 
                      key={alert.id} 
                      className={`p-4 border-l-4 bg-gray-50 rounded-r-lg ${getAlertBorderColor(alert.severity)}`}
                    >
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{alert.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveTab('alerts')}
                  >
                    View All Alerts
                  </Button>
                </div>
              </Card>
            )}

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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('simulator')}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Credit Simulator
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('alerts')}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Credit Alerts
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('education')}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Educational Resources
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

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Credit Score Alerts</h3>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter by Severity
                  </Button>
                  <Button size="sm">
                    Mark All as Read
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                {creditAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-6 border-l-4 bg-white border border-gray-200 rounded-r-lg hover:shadow-md transition-shadow ${getAlertBorderColor(alert.severity)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h4 className="font-semibold text-gray-900 mr-3">{alert.title}</h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              alert.severity === 'high' ? 'bg-error-100 text-error-800' :
                              alert.severity === 'medium' ? 'bg-warning-100 text-warning-800' :
                              'bg-primary-100 text-primary-800'
                            }`}>
                              {alert.severity.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3">{alert.message}</p>
                          <p className="text-sm text-gray-500">{alert.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Alert Settings */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">High Risk Applications</div>
                    <div className="text-sm text-gray-500">Alert when credit score drops below 600</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Portfolio Risk Changes</div>
                    <div className="text-sm text-gray-500">Alert on significant risk distribution changes</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Default Predictions</div>
                    <div className="text-sm text-gray-500">Alert on clients with high default probability</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Credit Score Simulator</h3>
              <p className="text-gray-600 mb-6">
                Use this tool to simulate how different financial behaviors might impact a client's credit score.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Controls */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Credit Score
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
                        min="300"
                        max="850"
                        value={simulatorScore}
                        onChange={(e) => setSimulatorScore(Number(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-lg font-semibold text-gray-900 w-12">
                        {simulatorScore}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>300</span>
                      <span>850</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Payment Amount ($)
                    </label>
                    <input
                      type="number"
                      value={simulatorPayment}
                      onChange={(e) => setSimulatorPayment(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter payment amount"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Higher payments improve payment history (35% of score)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Debt Amount ($)
                    </label>
                    <input
                      type="number"
                      value={simulatorDebt}
                      onChange={(e) => setSimulatorDebt(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter total debt"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Lower debt improves credit utilization (30% of score)
                    </p>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Projected Credit Score</h4>
                    
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-primary-600 mb-2">
                        {simulateScoreChange(simulatorScore, simulatorPayment, simulatorDebt)}
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        {simulateScoreChange(simulatorScore, simulatorPayment, simulatorDebt) > simulatorScore ? (
                          <ArrowUp className="h-4 w-4 text-success-500" />
                        ) : simulateScoreChange(simulatorScore, simulatorPayment, simulatorDebt) < simulatorScore ? (
                          <ArrowDown className="h-4 w-4 text-error-500" />
                        ) : null}
                        <span className={`text-sm font-medium ${
                          simulateScoreChange(simulatorScore, simulatorPayment, simulatorDebt) > simulatorScore ? 'text-success-600' :
                          simulateScoreChange(simulatorScore, simulatorPayment, simulatorDebt) < simulatorScore ? 'text-error-600' :
                          'text-gray-600'
                        }`}>
                          {simulateScoreChange(simulatorScore, simulatorPayment, simulatorDebt) > simulatorScore ? '+' : ''}
                          {simulateScoreChange(simulatorScore, simulatorPayment, simulatorDebt) - simulatorScore} points
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      {(() => {
                        const newScore = simulateScoreChange(simulatorScore, simulatorPayment, simulatorDebt);
                        const category = getScoreCategory(newScore);
                        return (
                          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${category.bgColor} ${category.color}`}>
                            {category.label}
                          </span>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Impact Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment History (35%)</span>
                        <span className={`font-medium ${
                          simulatorPayment >= 500 ? 'text-success-600' :
                          simulatorPayment >= 300 ? 'text-warning-600' :
                          'text-error-600'
                        }`}>
                          {simulatorPayment >= 500 ? 'Excellent' :
                           simulatorPayment >= 300 ? 'Good' :
                           simulatorPayment >= 100 ? 'Fair' : 'Poor'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Credit Utilization (30%)</span>
                        <span className={`font-medium ${
                          (simulatorDebt / 20000) < 0.1 ? 'text-success-600' :
                          (simulatorDebt / 20000) < 0.3 ? 'text-warning-600' :
                          'text-error-600'
                        }`}>
                          {((simulatorDebt / 20000) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recommendations */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-success-900">Improve Payment History</h4>
                      <p className="text-sm text-success-700 mt-1">
                        Consistent on-time payments have the biggest positive impact on credit scores.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-primary-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-primary-900">Reduce Credit Utilization</h4>
                      <p className="text-sm text-primary-700 mt-1">
                        Keep credit card balances below 30% of available credit limits.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-6">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Educational Resources</h3>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter by Category
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {educationalTips.map((tip) => (
                  <div key={tip.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                        {tip.category}
                      </span>
                      <span className="text-xs text-gray-500">{tip.readTime}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-3">{tip.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{tip.content}</p>
                    <Button variant="ghost" size="sm" className="p-0">
                      Read More →
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Reference */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Score Ranges</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Excellent (800-850)</span>
                    <span className="text-sm font-medium text-success-600">Best rates available</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Very Good (740-799)</span>
                    <span className="text-sm font-medium text-success-600">Above average rates</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Good (670-739)</span>
                    <span className="text-sm font-medium text-warning-600">Near average rates</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Fair (580-669)</span>
                    <span className="text-sm font-medium text-warning-600">Below average rates</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Poor (300-579)</span>
                    <span className="text-sm font-medium text-error-600">Highest rates/deposits</span>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Score Factors</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Payment History</span>
                    <span className="text-sm font-medium text-gray-900">35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Credit Utilization</span>
                    <span className="text-sm font-medium text-gray-900">30%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Length of Credit History</span>
                    <span className="text-sm font-medium text-gray-900">15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Credit Mix</span>
                    <span className="text-sm font-medium text-gray-900">10%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">New Credit</span>
                    <span className="text-sm font-medium text-gray-900">10%</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Best Practices */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lending Best Practices</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary-100 rounded-full p-3 w-12 h-12 mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-primary-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Verify Income</h4>
                  <p className="text-sm text-gray-600">Always verify employment and income through multiple sources</p>
                </div>
                <div className="text-center">
                  <div className="bg-warning-100 rounded-full p-3 w-12 h-12 mx-auto mb-3">
                    <AlertTriangle className="h-6 w-6 text-warning-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Assess DTI Ratio</h4>
                  <p className="text-sm text-gray-600">Debt-to-income ratio is crucial for determining repayment ability</p>
                </div>
                <div className="text-center">
                  <div className="bg-success-100 rounded-full p-3 w-12 h-12 mx-auto mb-3">
                    <TrendingUp className="h-6 w-6 text-success-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Monitor Trends</h4>
                  <p className="text-sm text-gray-600">Track credit score trends and payment patterns over time</p>
                </div>
              </div>
            </Card>
          </div>
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