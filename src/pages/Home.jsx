import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, MessageSquare, Film, Crown, Heart, Flame, Wind, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModeCard from '../components/ModeCard';
import LevelCard from '../components/LevelCard';
import FaithMeter from '../components/FaithMeter';

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
  
  const tutorialSteps = [
    {
      title: "Welcome, Angel Sister! 👑",
      content: "You are the Queen of the Clouds, a fierce angel navigating the digital purgatory of endless social media scrolls. Your mission: transform challenges into empowerment!",
    },
    {
      title: "Faith Meter ✨",
      content: "Earn faith points by creating content, completing challenges, and spreading positivity. Reach 777 points to unlock special filters and rewards!",
    },
    {
      title: "Three Magical Modes 🎨",
      content: "Choose your path: Generate relatable memes, create inspiring video scripts, or craft empowering tweets. Each creation earns you faith points!",
    },
    {
      title: "Conquer Three Realms 🌟",
      content: "Battle through Office Inferno, heal in Wellness Whirlwind, and network in Sisterhood Summit. Each level brings new challenges and rewards!",
    },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border-4 border-purple-300"
            >
              <div className="text-center mb-6">
                <Crown className="w-16 h-16 mx-auto text-purple-500 mb-4" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {tutorialSteps[tutorialStep].title}
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {tutorialSteps[tutorialStep].content}
                </p>
              </div>
              
              <div className="flex gap-2 justify-center mb-4">
                {tutorialSteps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all ${
                      i === tutorialStep ? 'w-8 bg-purple-500' : 'w-2 bg-purple-200'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex gap-3">
                {tutorialStep < tutorialSteps.length - 1 ? (
                  <Button
                    onClick={() => setTutorialStep(tutorialStep + 1)}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={completeTutorial}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg"
                  >
                    Start Your Journey! ✨
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-300/20 to-blue-300/20" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Crown className="w-20 h-20 text-purple-500" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Queen of the Clouds
            </h1>
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