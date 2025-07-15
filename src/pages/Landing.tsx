import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, TrendingUp, Users, CheckCircle, Star, BarChart3 } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { Card } from '../components/UI/Card';

export function Landing() {
  const features = [
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
      title: 'Alpha Predictions',
      description: 'Machine learning algorithms provide accurate credit score predictions with 95% accuracy rate.'
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: 'Secure',
      description: 'Bank-grade security with full compliance to Zimbabwe financial regulations.'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: 'Dual UI',
      description: 'Separate dashboards for banks and clients with tailored features for each user type.'
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-500" />,
      title: 'Real-time Analytics',
      description: 'Comprehensive reporting and analytics to track credit trends and loan performance.'
    }
  ];

  const testimonials = [
    {
      name: 'Lyncia Chiguri',
      role: 'Loan Officer, CBZ Bank',
      content: 'CreditScore Pro has transformed our lending process. We can now make faster, more accurate decisions.',
      rating: 5
    },
    {
      name: 'Auther King',
      role: 'Small Business Owner',
      content: 'Berries helped me understand my credit and get a loan for expansion!',
      rating: 5
    }
  ];

  const stats = [
    { 
      number: '5 000+', 
      label: 'Scores Processed',
      icon: <TrendingUp className="h-6 w-6 text-purple-500" />
    },
    { 
      number: '20+', 
      label: 'Trusted Banks',
      icon: <Users className="h-6 w-6 text-purple-500" />
    },
    { 
      number: '85%', 
      label: 'Accuracy',
      icon: <CheckCircle className="h-6 w-6 text-purple-500" />
    },
    { 
      number: '24/7', 
      label: 'System Availability',
      icon: <Shield className="h-6 w-6 text-purple-500" />
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Card Removed */}
      <section className="relative bg-gradient-to-br from-purple-50 to-white py-20 overflow-hidden">
        <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%238b5cf6" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-float`}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Reliable Credit Score
                <span className="text-purple-500"> Predictions</span>
                <br />for Zimbabweans
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                 credit score predictions. 
                Whether you're a bank or an individual, get accurate insights to make smarter lending choices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Now as Cards with Slide-up Animation */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card 
                    key={index} 
                    className="text-center animate-slide-up p-6" 
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0, 
                      transform: 'translateY(20px)' 
                    }}
                  >
                    <div className="bg-purple-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      {stat.icon}
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 text-sm md:text-base">
                      {stat.label}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Berries?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with deep understanding of the Zimbabwe financial market
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} hover className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-purple-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Easy to Use
            </h2>
            <p className="text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center relative">
              <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Choose Your Role
              </h3>
              <p className="text-gray-600">
                Sign up as either a bank representative or an individual client seeking credit assessment
              </p>
              <div className="hidden md:block absolute top-8 right-0 transform translate-x-1/2 w-8 h-0.5 bg-purple-200"></div>
            </div>
            
            <div className="text-center relative">
              <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Enter Credentials
              </h3>
              <p className="text-gray-600">
                Provide financial details through our secure interface to generate your credit score
              </p>
              <div className="hidden md:block absolute top-8 right-0 transform translate-x-1/2 w-8 h-0.5 bg-purple-200"></div>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Get Predictions
              </h3>
              <p className="text-gray-600">
                Get predictions with detailed insights and recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Client Feedback
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by financial institutions and individuals across Zimbabwe
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <span className="text-purple-600 font-semibold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Credit Journey?
          </h2>
          <p className="text-xl text-purple-100 mb-8 leading-relaxed">
           Be part of the Thousands who trust Berries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 w-full sm:w-auto"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-purple-600 w-full sm:w-auto"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}