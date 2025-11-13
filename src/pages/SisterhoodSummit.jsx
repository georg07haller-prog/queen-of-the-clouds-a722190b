import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Users, ArrowLeft, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { toast } from 'sonner';

export default function SisterhoodSummit() {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [question, setQuestion] = useState('');
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
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
  
  const mentors = [
    {
      name: "Dr. Maya Chen",
      title: "Career Strategist",
      specialty: "Leadership & Career Growth",
      avatar: "👩‍💼",
      personality: "Practical, strategic, and empowering",
    },
    {
      name: "Sofia Rodriguez",
      title: "Wellness Coach",
      specialty: "Mental Health & Self-Care",
      avatar: "🧘‍♀️",
      personality: "Compassionate, mindful, and nurturing",
    },
    {
      name: "Aisha Williams",
      title: "Entrepreneur",
      specialty: "Work-Life Balance & Boundaries",
      avatar: "💼",
      personality: "Direct, honest, and motivational",
    },
  ];
  
  const askMentor = async () => {
    if (!question.trim() || !selectedMentor) {
      toast.error('Please select a mentor and ask a question!');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are ${selectedMentor.name}, a ${selectedMentor.title} specializing in ${selectedMentor.specialty}.
        Your personality is ${selectedMentor.personality}.
        A woman (age 25-45) is asking for your advice: "${question}"
        
        Provide supportive, actionable advice in 2-3 paragraphs. Be empowering, specific, and authentic.
        End with an empowering quote or affirmation related to the topic.`,
      });
      
      setAdvice(response);
      
      if (progress?.id) {
        const newPoints = Math.min((progress.faith_points || 0) + 50, 777);
        const completedLevels = [...(progress.completed_levels || [])];
        
        if (!completedLevels.includes('sisterhood_summit')) {
          completedLevels.push('sisterhood_summit');
        }
        
        await base44.entities.GameProgress.update(progress.id, {
          faith_points: newPoints,
          completed_levels: completedLevels,
        });
        
        queryClient.invalidateQueries(['gameProgress']);
        toast.success('✨ Wisdom received! +50 faith points');
      }
      
    } catch (error) {
      toast.error('Failed to get advice. Try again!');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69160be603b85195a722190b/03a24c1d8_918b43ba-1368-44d4-b33c-d8cfff6c20b3.png"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
              <Users className="w-10 h-10 text-indigo-600" />
              Sisterhood Summit
            </h1>
            <p className="text-gray-600">Connect with virtual mentors and build your support squad</p>
          </div>
        </div>
        
        {!selectedMentor ? (
          <div>
            <h2 className="text-2xl font-bold text-purple-900 mb-6">Choose Your Mentor</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {mentors.map((mentor, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    onClick={() => setSelectedMentor(mentor)}
                    className="p-6 bg-white/90 backdrop-blur-sm border-2 border-purple-200 hover:border-purple-400 cursor-pointer shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="text-6xl mb-4 text-center">{mentor.avatar}</div>
                    <h3 className="text-xl font-bold text-purple-900 mb-1 text-center">
                      {mentor.name}
                    </h3>
                    <p className="text-sm text-purple-600 font-medium mb-3 text-center">
                      {mentor.title}
                    </p>
                    <div className="bg-purple-50 p-3 rounded-xl border border-purple-200">
                      <p className="text-xs font-semibold text-purple-900 mb-1">Specialty:</p>
                      <p className="text-sm text-gray-700">{mentor.specialty}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-8 bg-white/90 backdrop-blur-sm border-2 border-purple-300 shadow-xl mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">{selectedMentor.avatar}</div>
                <div>
                  <h2 className="text-2xl font-bold text-purple-900">{selectedMentor.name}</h2>
                  <p className="text-purple-600 font-medium">{selectedMentor.title}</p>
                  <p className="text-sm text-gray-600">{selectedMentor.specialty}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedMentor(null);
                    setQuestion('');
                    setAdvice(null);
                  }}
                  className="ml-auto"
                >
                  Change Mentor
                </Button>
              </div>
              
              {!advice ? (
                <>
                  <label className="block font-bold text-purple-900 mb-3">
                    What guidance do you need today?
                  </label>
                  <Textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="e.g., How do I negotiate a raise without feeling guilty?"
                    className="mb-4 min-h-32 text-base border-purple-200 focus:border-purple-400"
                  />
                  <Button
                    onClick={askMentor}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-6 text-lg gap-2"
                  >
                    {loading ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                          <Sparkles className="w-5 h-5" />
                        </motion.div>
                        Receiving Wisdom...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5" />
                        Ask {selectedMentor.name}
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 mb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <MessageCircle className="w-5 h-5 text-purple-600" />
                      <span className="font-bold text-purple-900">Your Question:</span>
                    </div>
                    <p className="text-gray-800 italic mb-6">{question}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      <span className="font-bold text-purple-900">{selectedMentor.name}'s Advice:</span>
                    </div>
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line">{advice}</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        setQuestion('');
                        setAdvice(null);
                      }}
                      className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                    >
                      Ask Another Question
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedMentor(null);
                        setQuestion('');
                        setAdvice(null);
                      }}
                      variant="outline"
                      className="flex-1 border-purple-300"
                    >
                      Talk to Different Mentor
                    </Button>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border-2 border-green-300 text-center">
                    <p className="text-green-800 font-semibold">
                      🎉 +50 Faith Points Earned! Your support squad is growing!
                    </p>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}