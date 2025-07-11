import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-purple-500 p-2 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Berries</span>
            </div>
            <p className="text-purple-200 mb-4 max-w-md leading-relaxed">
              Berries is a leading provider of credit scoring and risk assessment solutions, helping businesses make informed financial decisions with confidence.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-purple-200">
                <MapPin className="h-4 w-4" />
                <span>Harare, Zimbabwe</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-200">
                <Phone className="h-4 w-4" />
                <span>+263 71 309 4796</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-200">
                <Mail className="h-4 w-4" />
                <span>berries@info.zw</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-purple-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-purple-200 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-purple-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-purple-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-purple-200">Credit Scoring</span>
              </li>
              <li>
                <span className="text-purple-200">Risk Assessment</span>
              </li>
              <li>
                <span className="text-purple-200">Loan Management</span>
              </li>
              <li>
                <span className="text-purple-200">Analytics Dashboard</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-700 mt-8 pt-8 text-center">
          <p className="text-purple-200">
            © 2025 Berries. All rights reserved. | 
            <Link to="/privacy" className="text-purple-400 hover:text-purple-300 ml-1">
              Privacy Policy
            </Link> | 
            <Link to="/terms" className="text-purple-400 hover:text-purple-300 ml-1">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}