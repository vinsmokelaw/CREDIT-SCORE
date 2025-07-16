import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, TrendingUp, Users, CheckCircle, Star, BarChart3, Calculator, BookOpen, Bell, Zap, Target, Award } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { Card } from '../components/UI/Card';

export function Landing() {
  const features = [
    {
      icon: <Calculator className="h-8 w-8 text-purple-500" />,
      title: 'Credit Score Simulator',
      description: 'Interactive tool to simulate how different financial decisions would impact your credit score before making them.'
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-500" />,
      title: 'Educational Tips',
      description: 'Personalized financial education content and tips to help improve your credit health and financial literacy.'
    },
    {
      icon: <Bell className="h-8 w-8 text-purple-500" />,
      title: 'Smart Alerts',
      description: 'Real-time notifications about credit score changes, payment reminders, and opportunities to improve your score.'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
      title: 'AI Predictions',
      description: 'Advanced machine learning algorithms provide accurate credit score predictions with 95% accuracy rate.'
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: 'Bank-Grade Security',
      description: 'Enterprise-level security with full compliance to Zimbabwe financial regulations and data protection.'
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-500" />,
      title: 'Real-time Analytics',
      description: 'Comprehensive reporting and analytics to track credit trends, loan performance, and financial health.'
    }
  ];

  const testimonials = [
    {
      name: 'Lyncia Chiguri',
      role: 'Loan Officer, CBZ Bank',
      content: 'CreditScore Pro has transformed our lending process. We can now make faster, more accurate decisions with confidence.',
      rating: 5
    },
    {
      name: 'Auther King',
      role: 'Small Business Owner',
      content: 'The credit simulator helped me understand exactly what I needed to do to qualify for my business loan. Incredible tool!',
      rating: 5
    },
    {
      name: 'Sarah Mukamuri',
      role: 'Financial Advisor',
      content: 'The educational content and alerts have helped my clients improve their credit scores by an average of 150 points.',
      rating: 5
    }
  ];

  const stats = [
    { 
      number: '15,000+', 
      label: 'Credit Scores Processed',
      icon: <TrendingUp className="h-6 w-6 text-purple-500" />
    },
    { 
      number: '25+', 
      label: 'Partner Banks',
      icon: <Users className="h-6 w-6 text-purple-500" />
    },
    { 
      number: '95%', 
      label: 'Prediction Accuracy',
      icon: <Target className="h-6 w-6 text-purple-500" />
    },
    { 
      number: '24/7', 
      label: 'System Availability',
      icon: <Shield className="h-6 w-6 text-purple-500" />
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-20 lg:py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-8">
                <Zap className="h-4 w-4 mr-2" />
                AI-Powered Credit Intelligence
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Smart Credit Score
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> Predictions</span>
                <br />for Zimbabwe
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-4xl mx-auto">
                Empower your financial decisions with AI-driven credit score predictions, interactive simulations, 
                and personalized insights tailored for the Zimbabwean market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <button 
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border-2 border-purple-200 text-purple-700 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 font-semibold"
                >
                  Explore Features
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className="text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 bg-gradient-to-br from-white to-purple-50"
              >
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {React.cloneElement(stat.icon, { className: "h-6 w-6 text-white" })}
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-6">
              <Award className="h-4 w-4 mr-2" />
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> Smart Credit Decisions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform combines cutting-edge AI technology with deep understanding of the Zimbabwe financial market
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-0 bg-white/80 backdrop-blur-sm"
              >
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 shadow-lg">
                  {React.cloneElement(feature.icon, { className: "h-8 w-8 text-white" })}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-6">
              <CheckCircle className="h-4 w-4 mr-2" />
              Simple Process
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Started in
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> Three Easy Steps</span>
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of Zimbabweans making smarter financial decisions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Choose Your Role",
                description: "Sign up as either a bank representative or an individual client seeking credit assessment and financial insights"
              },
              {
                step: 2,
                title: "Secure Data Input",
                description: "Provide your financial information through our bank-grade secure interface to generate accurate predictions"
              },
              {
                step: 3,
                title: "Get AI Insights",
                description: "Receive detailed credit predictions, personalized recommendations, and actionable insights to improve your financial health"
              }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-xl">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 right-0 transform translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-purple-300 to-indigo-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2" />
              Client Success Stories
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> Financial Leaders</span>
            </h2>
            <p className="text-xl text-gray-600">
              See how CreditScore Pro is transforming financial decisions across Zimbabwe
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-0 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-12 h-12 flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your
            <span className="text-purple-200"> Credit Journey?</span>
          </h2>
          <p className="text-xl text-purple-100 mb-10 leading-relaxed">
            Join thousands of Zimbabweans who trust CreditScore Pro for smarter financial decisions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <button
                size="lg" 
                className="bg-white text-purple-700 hover:bg-gray-100 w-full sm:w-auto shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 rounded-xl font-semibold flex items-center justify-center"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 font-semibold rounded-xl backdrop-blur-sm"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}