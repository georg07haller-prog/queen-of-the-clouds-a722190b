import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Heart, Crown } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-pink-900 text-white py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-6 h-6" />
              <h3 className="text-xl font-bold">Queen of the Clouds</h3>
            </div>
            <p className="text-purple-200 mb-4">
              Transform career burnout and imposter syndrome into empowering content. 
              Join the #AngelSisters movement! 👑✨
            </p>
            <div className="flex items-center gap-2 text-pink-200">
              <Heart className="w-4 h-4" />
              <span>Made with love for Angel Sisters</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to={createPageUrl('Landing')} className="text-purple-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Home')} className="text-purple-200 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('FAQ')} className="text-purple-200 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Referral')} className="text-purple-200 hover:text-white transition-colors">
                  Referral Program
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to={createPageUrl('PrivacyPolicy')} className="text-purple-200 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('TermsOfService')} className="text-purple-200 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-purple-700 pt-8 text-center text-purple-200">
          <p>&copy; 2025 Queen of the Clouds. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}