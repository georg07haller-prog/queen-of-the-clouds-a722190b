import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ArrowLeft, Mail, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { toast } from 'sonner';

export default function OfficeInferno() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [score, setScore] = useState(0);
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
  
  const challenges = [
    {
      email: "Subject: URGENT - Need this done TODAY\n\nI know it's 6 PM on Friday, but I need you to completely redo the presentation for Monday morning. Thanks!",
      responses: [
        { text: "Sure, I'll cancel my weekend plans...", isHealthy: false, feedback: "Setting boundaries is self-care! Your time matters." },
        { text: "I can work on this Monday morning first thing. Is that okay?", isHealthy: true, feedback: "Perfect! Assertive and professional. 👑" },
        { text: "Ignore the email until Monday", isHealthy: false, feedback: "Communication is key! A response is better than silence." },
      ]
    },
    {
      email: "Subject: Re: Your idea\n\nActually, I had this idea last week. Maybe you forgot I mentioned it?",
      responses: [
        { text: "Oh, you're right! My mistake.", isHealthy: false, feedback: "Don't let them gaslight you! Trust your memory." },
        { text: "I don't recall that, but let's collaborate moving forward!", isHealthy: true, feedback: "Diplomatic and confident! You're a queen! 👑" },
        { text: "That's not true and you know it!", isHealthy: false, feedback: "Stay calm and professional, even when frustrated." },
      ]
    },
    {
      email: "Subject: Team Meeting\n\n[During meeting] 'Let me explain what she meant to say...'",
      responses: [
        { text: "Stay silent and let it slide", isHealthy: false, feedback: "Your voice deserves to be heard! Speak up." },
        { text: "Actually, I can speak for myself. Here's what I meant...", isHealthy: true, feedback: "Yes! Reclaim your voice with grace! 👑" },
        { text: "Get visibly upset and leave the meeting", isHealthy: false, feedback: "Your feelings are valid, but composure is power." },
      ]
    }
  ];
  
  const handleResponse = async (response) => {
    setSelectedResponse(response);
    
    if (response.isHealthy) {
      setScore(score + 1);
      toast.success(response.feedback);
    } else {
      toast.error(response.feedback);
    }
    
    setTimeout(() => {
      if (currentChallenge < challenges.length - 1) {
        setCurrentChallenge(currentChallenge + 1);
        setSelectedResponse(null);
      } else {
        completeLevel();
      }
    }, 3000);
  };
  
  const completeLevel = async () => {
    const pointsEarned = score * 25;
    
    if (progress?.id) {
      const completedLevels = [...(progress.completed_levels || [])];
      if (!completedLevels.includes('office_inferno')) {
        completedLevels.push('office_inferno');
      }
      
      const newPoints = Math.min((progress.faith_points || 0) + pointsEarned, 777);
      
      await base44.entities.GameProgress.update(progress.id, {
        faith_points: newPoints,
        completed_levels: completedLevels,
      });
      
      queryClient.invalidateQueries(['gameProgress']);
      toast.success(`🎉 Level Complete! +${pointsEarned} faith points!`);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-3">
              <Flame className="w-10 h-10 text-orange-600" />
              Office Inferno
            </h1>
            <p className="text-gray-600">Navigate toxic workplace situations with grace</p>
          </div>
        </div>
        
        {currentChallenge < challenges.length ? (
          <motion.div
            key={currentChallenge}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <Card className="p-8 bg-white/90 backdrop-blur-sm border-2 border-orange-300 shadow-xl mb-6">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-8 h-8 text-orange-600" />
                <div>
                  <h3 className="text-xl font-bold text-orange-900">
                    Challenge {currentChallenge + 1} of {challenges.length}
                  </h3>
                  <p className="text-sm text-gray-600">Score: {score}/{currentChallenge}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200 mb-6">
                <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                  {challenges[currentChallenge].email}
                </pre>
              </div>
              
              <h4 className="font-bold text-lg text-orange-900 mb-4">How do you respond?</h4>
              
              <div className="space-y-3">
                {challenges[currentChallenge].responses.map((response, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleResponse(response)}
                    disabled={selectedResponse !== null}
                    className={`w-full p-4 rounded-xl text-left font-medium transition-all border-2 ${
                      selectedResponse === response
                        ? response.isHealthy
                          ? 'bg-green-100 border-green-400'
                          : 'bg-red-100 border-red-400'
                        : 'bg-white border-orange-200 hover:border-orange-400 hover:bg-orange-50'
                    } disabled:cursor-not-allowed`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{response.text}</span>
                      {selectedResponse === response && (
                        response.isHealthy ? (
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {selectedResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-xl border-2 ${
                    selectedResponse.isHealthy
                      ? 'bg-green-50 border-green-300'
                      : 'bg-red-50 border-red-300'
                  }`}
                >
                  <p className={`font-semibold ${
                    selectedResponse.isHealthy ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {selectedResponse.feedback}
                  </p>
                </motion.div>
              )}
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-12 bg-white/90 backdrop-blur-sm border-2 border-orange-300 shadow-xl text-center">
              <Flame className="w-20 h-20 mx-auto text-orange-600 mb-6" />
              <h2 className="text-4xl font-bold text-orange-900 mb-4">
                Office Inferno Conquered! 🔥
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                Final Score: {score}/{challenges.length}
              </p>
              <p className="text-lg text-gray-600 mb-8">
                You've earned {score * 25} faith points by handling workplace toxicity like a true queen!
              </p>
              <Link to={createPageUrl('Home')}>
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-6 text-lg">
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