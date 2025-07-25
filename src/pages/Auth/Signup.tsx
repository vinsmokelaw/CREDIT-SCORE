import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Eye, EyeOff, Building, User, DollarSign, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

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

export function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'client' as 'client' | 'bank',
    bank: '',
    termsAccepted: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMessage('');
    setIsLoading(true);

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (formData.userType === 'bank' && !formData.bank) {
      newErrors.bank = 'Please select your bank';
    }
    if (!formData.termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const { success, error } = await signup(
      formData.name,
      formData.email,
      formData.password,
      formData.userType,
      formData.bank
    );

    if (error) {
      setErrors({ general: error });
    } else if (success) {
      setMessage('Signup successful! Please check your email to confirm your account.');
    }

    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
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
            Create Your Account
          </h2>
          <p className="mt-3 text-lg text-purple-200">
            Join Berries and start your financial journey
          </p>
          <div className="flex justify-center mt-4">
            <Sparkles className="h-6 w-6 text-purple-300 animate-pulse" />
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/10 p-8 rounded-3xl shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <div className="bg-green-500/20 border border-green-400/50 text-green-100 px-4 py-3 rounded-xl backdrop-blur-sm">
                {message}
              </div>
            )}
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
                  <div className="text-sm font-medium">Bank Representative</div>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/10 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-white placeholder-purple-300 backdrop-blur-sm ${
                  errors.name ? 'border-red-400/50' : 'border-white/20'
                }`}
                placeholder="Enter your full name"
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-300">{errors.name}</p>
              )}
            </div>

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
                placeholder="Create a password"
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
              <p className="mt-1 text-xs text-purple-300">Must be at least 8 characters</p>
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/10 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-white placeholder-purple-300 backdrop-blur-sm ${
                  errors.confirmPassword ? 'border-red-400/50' : 'border-white/20'
                }`}
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-11 text-purple-300 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-300">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  id="terms"
                  name="termsAccepted"
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="h-4 w-4 mt-1 text-purple-600 focus:ring-purple-500 border-white/20 rounded bg-white/10"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-purple-200">
                  I agree to the{' '}
                  <Link to="/terms" className="text-purple-300 hover:text-white transition-colors">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-purple-300 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-300">{errors.terms}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Creating account...
                </div>
              ) : (
                <>
                  <UserPlus className="h-5 w-5 mr-2" />
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-purple-200">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-purple-300 hover:text-white transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}