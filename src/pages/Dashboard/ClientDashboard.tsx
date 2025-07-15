import React, { useState } from 'react';
import { CreditCard, TrendingUp, CheckCircle, FileText, Calculator, Target, Award, Bell, AlertTriangle, Info, XCircle, BookOpen, ArrowUp, ArrowDown, Users, DollarSign } from 'lucide-react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';

export function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAlerts, setShowAlerts] = useState(true);
  const [simulatorScore, setSimulatorScore] = useState(785);
  const [simulatorPayment, setSimulatorPayment] = useState(500);
  const [simulatorDebt, setSimulatorDebt] = useState(8000);

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

  // Credit Score Alerts for clients
  const creditAlerts = [
    {
      id: 1,
      type: 'info',
      title: 'Credit Score Improved',
      message: 'Your credit score increased by 12 points this month due to consistent payments',
      timestamp: '2 hours ago',
      severity: 'low'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Credit Utilization Alert',
      message: 'Your credit utilization is at 75%. Consider paying down balances to improve your score',
      timestamp: '1 day ago',
      severity: 'medium'
    },
    {
      id: 3,
      type: 'info',
      title: 'Payment Reminder',
      message: 'Your next payment is due in 3 days. Set up auto-pay to never miss a payment',
      timestamp: '3 hours ago',
      severity: 'low'
    }
  ];

  // Educational Tips for clients
  const educationalTips = [
    {
      id: 1,
      category: 'Credit Basics',
      title: 'Understanding Your Credit Score',
      content: 'Your credit score is a three-digit number that represents your creditworthiness. Scores range from 300-850, with higher scores indicating better credit health.',
      readTime: '3 min read',
      difficulty: 'Beginner'
    },
    {
      id: 2,
      category: 'Payment Tips',
      title: 'The Power of On-Time Payments',
      content: 'Payment history makes up 35% of your credit score. Even one late payment can drop your score by 60-110 points.',
      readTime: '4 min read',
      difficulty: 'Beginner'
    },
    {
      id: 3,
      category: 'Credit Utilization',
      title: 'Optimal Credit Card Usage',
      content: 'Keep your credit utilization below 30% of your available credit. For the best scores, aim for under 10%.',
      readTime: '5 min read',
      difficulty: 'Intermediate'
    },
    {
      id: 4,
      category: 'Building Credit',
      title: 'Building Credit from Scratch',
      content: 'If you have no credit history, consider a secured credit card or becoming an authorized user on someone else\'s account.',
      readTime: '6 min read',
      difficulty: 'Beginner'
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

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-success-500';
    if (score >= 650) return 'text-warning-500';
    return 'text-error-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 800) return 'Excellent';
    if (score >= 740) return 'Very Good';
    if (score >= 670) return 'Good';
    if (score >= 580) return 'Fair';
    return 'Poor';
  };

  const getScoreCategory = (score: number) => {
    if (score >= 800) return { label: 'Excellent', color: 'text-success-600', bgColor: 'bg-success-100' };
    if (score >= 740) return { label: 'Very Good', color: 'text-success-600', bgColor: 'bg-success-100' };
    if (score >= 670) return { label: 'Good', color: 'text-warning-600', bgColor: 'bg-warning-100' };
    if (score >= 580) return { label: 'Fair', color: 'text-warning-600', bgColor: 'bg-warning-100' };
    return { label: 'Poor', color: 'text-error-600', bgColor: 'bg-error-100' };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success-100 text-success-800';
      case 'pending': return 'bg-warning-100 text-warning-800';
      case 'rejected': return 'bg-error-100 text-error-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'applications', label: 'Loan Applications', icon: <FileText className="h-4 w-4" /> },
    { id: 'alerts', label: 'Credit Alerts', icon: <Bell className="h-4 w-4" /> },
    { id: 'simulator', label: 'Credit Simulator', icon: <Calculator className="h-4 w-4" /> },
    { id: 'education', label: 'Education', icon: <BookOpen className="h-4 w-4" /> },
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
                      <div className="text-sm text-gray-500">max 850</div>
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
                    +{scoreChange} points this month
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
                <Button 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('applications')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Applications
                </Button>
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
                  onClick={() => setActiveTab('education')}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Learn More
                </Button>
              </div>
            </Card>

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

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Your Credit Alerts</h3>
                <Button size="sm">
                  Mark All as Read
                </Button>
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
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Credit Score Simulator</h3>
              <p className="text-gray-600 mb-6">
                See how different financial behaviors might impact your credit score.
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
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-6">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Educational Resources</h3>
                <Button variant="outline" size="sm">
                  View All Resources
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {educationalTips.map((tip) => (
                  <div key={tip.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                          {tip.category}
                        </span>
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                          {tip.difficulty}
                        </span>
                      </div>
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
          </div>
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