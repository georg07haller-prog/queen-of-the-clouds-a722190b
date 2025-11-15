import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Copy, Share2, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Footer from '../components/Footer';

export default function Referral() {
  const queryClient = useQueryClient();
  
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });
  
  const { data: progressList = [] } = useQuery({
    queryKey: ['gameProgress', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      return await base44.entities.GameProgress.filter({ created_by: user.email });
    },
    enabled: !!user?.email,
  });
  
  const progress = progressList[0] || { faith_points: 0 };
  
  // Generate referral link (using user email as identifier)
  const referralCode = user?.email ? btoa(user.email).substring(0, 10) : 'loading';
  const referralLink = `${window.location.origin}${createPageUrl('Landing')}?ref=${referralCode}`;
  
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied! Share it with your Angel Sisters! 💜');
  };
  
  const shareOnTwitter = () => {
    const text = encodeURIComponent(
      "Join me on Queen of the Clouds! Transform burnout into empowerment with AI-powered memes, videos, and tweets. 👑✨ #AngelSisters"
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(referralLink)}`, '_blank');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <Link to={createPageUrl('Home')}>
          <Button variant="ghost" className="mb-6 text-purple-700 hover:text-purple-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Users className="w-16 h-16 mx-auto mb-4 text-purple-600" />
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Referral Program
          </h1>
          <p className="text-xl text-gray-700">
            Share the love and earn +5 faith points for each Angel Sister you invite! ✨
          </p>
        </motion.div>
        
        {/* Current Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 mb-8 border-2 border-purple-300"
        >
          <div className="text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-3 text-purple-600" />
            <h2 className="text-3xl font-bold text-purple-900 mb-2">
              Your Current Faith Points
            </h2>
            <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {progress.faith_points}
            </div>
            <p className="text-gray-700 mt-2">Keep inviting to reach 777! 👑</p>
          </div>
        </motion.div>
        
        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-purple-200"
        >
          <h2 className="text-3xl font-bold text-purple-900 mb-6 text-center">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-2">Share Your Link</h3>
              <p className="text-gray-700">
                Copy your unique referral link and share it with friends, family, or on social media.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-2">They Sign Up</h3>
              <p className="text-gray-700">
                When someone joins using your link, they become part of the Angel Sisters community!
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-2">Earn Points</h3>
              <p className="text-gray-700">
                You both get +5 faith points instantly! The more you share, the more you earn.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Referral Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-purple-200"
        >
          <h2 className="text-2xl font-bold text-purple-900 mb-4 text-center">
            Your Referral Link
          </h2>
          
          <div className="flex gap-3 mb-4">
            <Input
              value={referralLink}
              readOnly
              className="text-sm"
            />
            <Button
              onClick={copyReferralLink}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          
          <div className="flex gap-3 justify-center">
            <Button
              onClick={shareOnTwitter}
              className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share on Twitter
            </Button>
          </div>
        </motion.div>
        
        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-8 border-2 border-pink-300"
        >
          <Heart className="w-12 h-12 mx-auto mb-4 text-pink-600" />
          <h2 className="text-2xl font-bold text-purple-900 mb-4 text-center">
            Why Share Queen of the Clouds?
          </h2>
          
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-2xl">💜</span>
              <span>Help your friends transform burnout into empowerment</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <span>Build a supportive community of Angel Sisters</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🎁</span>
              <span>Earn faith points to unlock exclusive rewards faster</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">👑</span>
              <span>Spread positivity and self-care vibes</span>
            </li>
          </ul>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}