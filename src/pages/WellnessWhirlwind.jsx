import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Wind, ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { toast } from 'sonner';

export default function WellnessWhirlwind() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [healingProgress, setHealingProgress] = useState(0);
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
  
  const progress = progressList[0];
  
  const exercises = [
    {
      title: "Breathe with the Clouds",
      instruction: "Inhale for 4 counts, hold for 4, exhale for 4. Repeat 3 times.",
      affirmation: "I am worthy of peace and tranquility.",
      duration: 20,
    },
    {
      title: "Self-Compassion Mirror",
      instruction: "Look in the mirror (or imagine it). Say: 'I am doing my best, and that is enough.'",
      affirmation: "I embrace my imperfections with love.",
      duration: 15,
    },
    {
      title: "Release the Inner Critic",
      instruction: "Write down one negative thought, then reframe it positively.",
      affirmation: "My thoughts do not define me. I choose kindness.",
      duration: 25,
    },
  ];
  
  const startExercise = () => {
    setHealingProgress(0);
    const interval = setInterval(() => {
      setHealingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          completeExercise();
          return 100;
        }
        return prev + (100 / exercises[currentExercise].duration);
      });
    }, 1000);
  };
  
  const completeExercise = async () => {
    toast.success('✨ Exercise complete! You healed your inner critic!');
    
    setTimeout(() => {
      if (currentExercise < exercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
        setHealingProgress(0);
      } else {
        completeLevel();
      }
    }, 2000);
  };
  
  const completeLevel = async () => {
    if (progress?.id) {
      const completedLevels = [...(progress.completed_levels || [])];
      if (!completedLevels.includes('wellness_whirlwind')) {
        completedLevels.push('wellness_whirlwind');
      }
      
      const newPoints = Math.min((progress.faith_points || 0) + 100, 777);
      
      await base44.entities.GameProgress.update(progress.id, {
        faith_points: newPoints,
        completed_levels: completedLevels,
      });
      
      queryClient.invalidateQueries(['gameProgress']);
      toast.success('🎉 Wellness Whirlwind Complete! +100 faith points!');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-emerald-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-3">
              <Wind className="w-10 h-10 text-green-600" />
              Wellness Whirlwind
            </h1>
            <p className="text-gray-600">Heal your inner critic with empathy beams</p>
          </div>
        </div>
        
        {currentExercise < exercises.length ? (
          <motion.div
            key={currentExercise}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-8 bg-white/90 backdrop-blur-sm border-2 border-green-300 shadow-xl">
              <div className="text-center mb-8">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block mb-4"
                >
                  <Heart className="w-16 h-16 text-green-500" />
                </motion.div>
                <h2 className="text-3xl font-bold text-green-900 mb-2">
                  {exercises[currentExercise].title}
                </h2>
                <p className="text-gray-600">Exercise {currentExercise + 1} of {exercises.length}</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200 mb-6">
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  {exercises[currentExercise].instruction}
                </p>
                <div className="flex items-start gap-3 bg-white/70 p-4 rounded-xl">
                  <Sparkles className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-bold text-green-900 mb-1">Affirmation:</p>
                    <p className="text-green-800 italic">{exercises[currentExercise].affirmation}</p>
                  </div>
                </div>
              </div>
              
              {healingProgress === 0 ? (
                <Button
                  onClick={startExercise}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-6 text-lg"
                >
                  Begin Healing ✨
                </Button>
              ) : (
                <div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Healing Progress</span>
                      <span>{Math.round(healingProgress)}%</span>
                    </div>
                    <div className="h-6 bg-green-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${healingProgress}%` }}
                        className="h-full bg-gradient-to-r from-green-400 to-teal-500 rounded-full"
                      />
                    </div>
                  </div>
                  
                  <div className="text-center text-green-700 font-medium">
                    {healingProgress < 100 ? (
                      <p>Stay present... Your inner peace is growing 🌱</p>
                    ) : (
                      <p className="text-lg font-bold">Healing Complete! 💚</p>
                    )}
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-12 bg-white/90 backdrop-blur-sm border-2 border-green-300 shadow-xl text-center">
              <Wind className="w-20 h-20 mx-auto text-green-600 mb-6" />
              <h2 className="text-4xl font-bold text-green-900 mb-4">
                Wellness Whirlwind Complete! 🌿
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                You've silenced your inner critic and embraced self-compassion!
              </p>
              <p className="text-lg text-gray-600 mb-8">
                +100 Faith Points Earned
              </p>
              <Link to={createPageUrl('Home')}>
                <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-6 text-lg">
                  Return to Hub
                </Button>
              </Link>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}