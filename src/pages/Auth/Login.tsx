import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff, Building, User, DollarSign, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Card } from '../../components/UI/Card';

const zimbabweBanks = [
  'CBZ Bank',
  'Steward Bank',
  'Nedbank Zimbabwe',
  'Standard Chartered Bank',
  'First Capital Bank',
  'ZB Bank',
  'BancABC',
  'CABS',
  'Ecobank Zimbabwe',
  'NMB Bank'
];

export function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'client' as 'client' | 'bank',
    bank: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.userType === 'bank' && !formData.bank) {
      newErrors.bank = 'Please select your bank';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(
        formData.email, 
        formData.password, 
        formData.userType,
        formData.userType === 'bank' ? formData.bank : undefined
      );
      
      if (success) {
        navigate(formData.userType === 'client' ? '/client-dashboard' : '/bank-dashboard');
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 rounded-2xl shadow-xl">
              <DollarSign className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="mt-8 text-4xl font-bold text-white">
            Welcome Back
          </h2>
          <p className="mt-3 text-lg text-purple-200">
            Sign in to your Berries account
          </p>
          <div className="flex justify-center mt-4">
            <Sparkles className="h-6 w-6 text-purple-300 animate-pulse" />
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/10 p-8 rounded-3xl shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-500/20 border border-red-400/50 text-red-100 px-4 py-3 rounded-xl backdrop-blur-sm">
                {errors.general}
              </div>
            )}

            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-4">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, userType: 'client', bank: '' }))}
                  className={`p-5 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    formData.userType === 'client'
                      ? 'border-purple-400 bg-purple-500/30 text-white shadow-lg'
                      : 'border-white/20 hover:border-white/40 text-purple-200'
                  }`}
                >
                  <User className="h-7 w-7 mx-auto mb-2" />
                  <div className="text-sm font-medium">Individual</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, userType: 'bank' }))}
                  className={`p-5 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    formData.userType === 'bank'
                      ? 'border-purple-400 bg-purple-500/30 text-white shadow-lg'
                      : 'border-white/20 hover:border-white/40 text-purple-200'
                  }`}
                >
                  <Building className="h-7 w-7 mx-auto mb-2" />
                  <div className="text-sm font-medium">Bank</div>
                </button>
              </div>
            </div>

            {/* Bank Selection (only for bank users) */}
            {formData.userType === 'bank' && (
              <div>
                <label htmlFor="bank" className="block text-sm font-medium text-white mb-2">
                  Select Your Bank
                </label>
                <select
                  id="bank"
                  name="bank"
                  value={formData.bank}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-white placeholder-purple-300 backdrop-blur-sm ${
                    errors.bank ? 'border-red-400/50' : 'border-white/20'
                  }`}
                >
                  <option value="" className="text-gray-900">Choose your bank...</option>
                  {zimbabweBanks.map(bank => (
                    <option key={bank} value={bank} className="text-gray-900">{bank}</option>
                  ))}
                </select>
                {errors.bank && (
                  <p className="mt-1 text-sm text-red-300">{errors.bank}</p>
                )}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/10 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-white placeholder-purple-300 backdrop-blur-sm ${
                  errors.email ? 'border-red-400/50' : 'border-white/20'
                }`}
                placeholder="Enter your email"
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-300">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/10 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-white placeholder-purple-300 backdrop-blur-sm ${
                  errors.password ? 'border-red-400/50' : 'border-white/20'
                }`}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-11 text-purple-300 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-300">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-white/20 rounded bg-white/10"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-purple-200">
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm text-purple-300 hover:text-white transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <>
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-purple-200">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-purple-300 hover:text-white transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}