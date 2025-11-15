import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Crown, Menu, X, User, Home, Users, HelpCircle, FileText, Gift, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });
  
  const handleLogout = () => {
    base44.auth.logout();
  };
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', page: 'Home' },
    { icon: Users, label: 'Sisterhood Summit', page: 'SisterhoodSummit' },
    { icon: Gift, label: 'Referral Program', page: 'Referral' },
    { icon: HelpCircle, label: 'FAQ', page: 'FAQ' },
    { icon: FileText, label: 'Privacy Policy', page: 'PrivacyPolicy' },
    { icon: FileText, label: 'Terms of Service', page: 'TermsOfService' },
    { icon: User, label: 'Profile', page: 'Profile' },
  ];
  
  return (
    <>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to={createPageUrl('Home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Crown className="w-6 h-6 text-purple-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Queen of the Clouds
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full">
                <User className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">{user.full_name || user.email}</span>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-purple-600 hover:text-purple-900 hover:bg-purple-50"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </header>
      
      {/* Slide-out Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* User Info */}
                {user && (
                  <div className="mb-6 pb-6 border-b border-purple-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-purple-900">{user.full_name || 'Angel Sister'}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Menu Items */}
                <nav className="space-y-2 mb-6">
                  {menuItems.map((item) => (
                    <Link
                      key={item.page}
                      to={createPageUrl(item.page)}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-900 transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </nav>
                
                {/* Logout Button */}
                {user && (
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}