import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { DollarSign, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-xl group-hover:from-purple-600 group-hover:to-purple-700 transition-all duration-300 shadow-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              BERRIES
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {!isAuthenticated ? (
              <>
                <button 
                  onClick={() => scrollToSection('hero')}
                  className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
                >
                  Testimonials
                </button>
                <Link 
                  to="/login" 
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to={user?.type === 'client' ? '/client-dashboard' : '/bank-dashboard'} 
                  className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-4">
                  <div className="text-sm">
                    <div className="text-gray-900 font-medium">{user?.name}</div>
                    <div className="text-gray-500 capitalize">{user?.type}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-4">
              {!isAuthenticated ? (
                <>
                  <button 
                    onClick={() => scrollToSection('hero')}
                    className="text-gray-600 hover:text-purple-600 transition-colors font-medium text-left"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => scrollToSection('features')}
                    className="text-gray-600 hover:text-purple-600 transition-colors font-medium text-left"
                  >
                    Features
                  </button>
                  <button 
                    onClick={() => scrollToSection('how-it-works')}
                    className="text-gray-600 hover:text-purple-600 transition-colors font-medium text-left"
                  >
                    How It Works
                  </button>
                  <button 
                    onClick={() => scrollToSection('testimonials')}
                    className="text-gray-600 hover:text-purple-600 transition-colors font-medium text-left"
                  >
                    Testimonials
                  </button>
                  <Link 
                    to="/login" 
                    className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-center shadow-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to={user?.type === 'client' ? '/client-dashboard' : '/bank-dashboard'} 
                    className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm">
                      <div className="text-gray-900 font-medium">{user?.name}</div>
                      <div className="text-gray-500 capitalize">{user?.type}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
                      title="Logout"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}