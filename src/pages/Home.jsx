import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, MessageSquare, Film, Crown, Heart, Flame, Wind, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModeCard from '../components/ModeCard';
import LevelCard from '../components/LevelCard';
import FaithMeter from '../components/FaithMeter';
import TutorialModal from '../components/TutorialModal';

export default function Home() {
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const queryClient = useQueryClient();
  
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });
  
  const { data: progressList = [], isLoading } = useQuery({
    queryKey: ['gameProgress', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      return await base44.entities.GameProgress.filter({ created_by: user.email });
    },
    enabled: !!user?.email,
  });
  
  const progress = progressList[0] || { 
    faith_points: 0, 
    unlocked_filters: [], 
    completed_levels: [],
    completed_tutorial: false 
  };
  
  const createProgressMutation = useMutation({
    mutationFn: (data) => base44.entities.GameProgress.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['gameProgress']);
    },
  });
  
  useEffect(() => {
    if (user && progressList.length === 0 && !isLoading) {
      createProgressMutation.mutate({
        faith_points: 0,
        unlocked_filters: [],
        completed_levels: [],
        completed_tutorial: false,
      });
    }
    
    if (user && progress && !progress.completed_tutorial) {
      setShowTutorial(true);
    }
  }, [user, progressList, isLoading]);
  
  const completeTutorial = async () => {
    if (progress.id) {
      await base44.entities.GameProgress.update(progress.id, {
        completed_tutorial: true,
        faith_points: 20,
      });
      queryClient.invalidateQueries(['gameProgress']);
    }
    setShowTutorial(false);
  };
  

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Tutorial Modal */}
      <TutorialModal 
        isOpen={showTutorial} 
        onClose={() => {
          completeTutorial();
        }} 
      />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-300/20 to-blue-300/20" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-3"
            >
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69160be603b85195a722190b/9b2be30ff_Crown.png"
                alt="Queen of the Clouds Logo"
                className="w-48 h-48 md:w-56 md:h-56 mx-auto object-cover rounded-full drop-shadow-2xl"
              />
            </motion.div>
            <p className="text-xl text-purple-900 mb-2">Rise Above the Digital Purgatory</p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transform career burnout and imposter syndrome into empowering content. 
              Join the #AngelSisters movement! 👑✨
            </p>
          </motion.div>
          
          {/* Faith Meter */}
          <div className="max-w-md mx-auto mb-12">
            <FaithMeter points={progress.faith_points || 0} />
          </div>
        </div>
      </div>
      
      {/* Creative Modes Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <h2 className="text-3xl font-bold text-purple-900">Choose Your Creative Mode</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <ModeCard
              title="Meme Mode"
              description="Generate hilarious, relatable memes about work-life balance and daily struggles"
              emoji="😂"
              gradient="bg-gradient-to-br from-pink-400 to-pink-600"
              pageName="MemeMode"
            />
            <ModeCard
              title="Video Vortex"
              description="Create 15-second inspirational video scripts with self-care tips and affirmations"
              icon={Film}
              gradient="bg-gradient-to-br from-purple-400 to-purple-600"
              pageName="VideoVortex"
            />
            <ModeCard
              title="Tweet Tempest"
              description="Auto-generate empowering tweets to inspire your fellow Angel Sisters"
              icon={MessageSquare}
              gradient="bg-gradient-to-br from-blue-400 to-blue-600"
              pageName="TweetTempest"
            />
          </div>
        </motion.div>
        
        {/* Levels Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-8 h-8 text-purple-500" />
            <h2 className="text-3xl font-bold text-purple-900">Conquer the Realms</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <LevelCard
              title="Office Inferno"
              description="Navigate toxic emails and workplace drama with wit and grace"
              icon={Flame}
              bgColor="bg-gradient-to-br from-orange-400 to-red-500"
              pageName="OfficeInferno"
              isLocked={false}
              isCompleted={progress.completed_levels?.includes('office_inferno')}
            />
            <LevelCard
              title="Wellness Whirlwind"
              description="Use empathy beams to heal your inner critic and embrace self-care"
              icon={Wind}
              bgColor="bg-gradient-to-br from-green-400 to-teal-500"
              pageName="WellnessWhirlwind"
              isLocked={progress.faith_points < 100}
              isCompleted={progress.completed_levels?.includes('wellness_whirlwind')}
            />
            <LevelCard
              title="Sisterhood Summit"
              description="Network with virtual mentors and build your support squad"
              icon={Users}
              bgColor="bg-gradient-to-br from-indigo-400 to-purple-500"
              pageName="SisterhoodSummit"
              isLocked={progress.faith_points < 250}
              isCompleted={progress.completed_levels?.includes('sisterhood_summit')}
            />
          </div>
        </motion.div>
        
        {/* Unlockables Preview */}
        {progress.faith_points > 100 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl border-2 border-purple-300"
          >
            <h3 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6" />
              Your Unlocked Rewards
            </h3>
            <div className="flex flex-wrap gap-3">
              {progress.unlocked_filters?.map((filter, i) => (
                <div key={i} className="bg-white px-4 py-2 rounded-full border-2 border-purple-300 font-semibold text-purple-700">
                  ✨ {filter}
                </div>
              ))}
              {(!progress.unlocked_filters || progress.unlocked_filters.length === 0) && (
                <p className="text-purple-700">Keep creating to unlock special filters!</p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}