import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Twitter, ArrowLeft, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ShareButtons from '../components/ShareButtons';
import { toast } from 'sonner';

export default function TweetTempest() {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [generating, setGenerating] = useState(false);
  const [tweets, setTweets] = useState([]);
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
  
  const themes = [
    { name: "Self-Worth", emoji: "👑", color: "from-purple-400 to-pink-400" },
    { name: "Career Power", emoji: "💼", color: "from-blue-400 to-indigo-400" },
    { name: "Mental Health", emoji: "🧠", color: "from-green-400 to-teal-400" },
    { name: "Sisterhood", emoji: "💕", color: "from-pink-400 to-rose-400" },
    { name: "Work-Life Balance", emoji: "⚖️", color: "from-amber-400 to-orange-400" },
    { name: "Breaking Stereotypes", emoji: "🔥", color: "from-red-400 to-pink-400" },
  ];
  
  const generateTweets = async (theme) => {
    setSelectedTheme(theme);
    setGenerating(true);
    
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate 3 empowering tweets about: ${theme}.
        Target audience: women aged 25-45 seeking inspiration and community.
        Each tweet should be under 280 characters, use #AngelSisters, be authentic, relatable, and powerful.
        Format: Return JSON with array of 3 tweets, each with 'text' and 'tone' (e.g., fierce, supportive, humorous).`,
        response_json_schema: {
          type: "object",
          properties: {
            tweets: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  text: { type: "string" },
                  tone: { type: "string" }
                }
              }
            }
          }
        }
      });
      
      for (const tweet of response.tweets) {
        await base44.entities.GeneratedContent.create({
          content_type: 'tweet',
          content_text: tweet.text,
          prompt: theme,
          faith_points_earned: 10,
          tags: [theme, tweet.tone],
        });
      }
      
      if (progress?.id) {
        const newPoints = Math.min((progress.faith_points || 0) + 30, 777);
        const newFilters = [...(progress.unlocked_filters || [])];
        
        if (newPoints >= 200 && !newFilters.includes('Celestial Crown')) {
          newFilters.push('Celestial Crown');
          toast.success('🎉 Unlocked: Celestial Crown filter!');
        }
        
        await base44.entities.GameProgress.update(progress.id, {
          faith_points: newPoints,
          unlocked_filters: newFilters,
        });
        queryClient.invalidateQueries(['gameProgress']);
      }
      
      setTweets(response.tweets);
      toast.success('✨ Tweets generated! +30 faith points');
      
    } catch (error) {
      toast.error('Failed to generate tweets. Try again!');
    } finally {
      setGenerating(false);
    }
  };
  
  const toneColors = {
    fierce: "from-red-100 to-orange-100 border-red-300",
    supportive: "from-green-100 to-teal-100 border-green-300",
    humorous: "from-yellow-100 to-amber-100 border-yellow-300",
    inspiring: "from-purple-100 to-pink-100 border-purple-300",
    confident: "from-blue-100 to-indigo-100 border-blue-300",
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-3">
              <Twitter className="w-10 h-10 text-blue-600" />
              Tweet Tempest
            </h1>
            <p className="text-gray-600">Generate empowering tweets for #AngelSisters</p>
          </div>
        </div>
        
        <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm border-2 border-blue-200">
          <h3 className="font-bold text-lg text-blue-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Choose Your Theme
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {themes.map((theme, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => generateTweets(theme.name)}
                disabled={generating}
                className={`p-4 rounded-xl bg-gradient-to-br ${theme.color} text-white font-bold text-center shadow-lg border-2 border-white/50 hover:shadow-xl transition-all disabled:opacity-50`}
              >
                <div className="text-3xl mb-2">{theme.emoji}</div>
                <div className="text-sm">{theme.name}</div>
              </motion.button>
            ))}
          </div>
        </Card>
        
        {generating && (
          <Card className="p-8 text-center bg-white/80 backdrop-blur-sm border-2 border-blue-200">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-4"
            >
              <RefreshCw className="w-12 h-12 text-blue-500" />
            </motion.div>
            <p className="text-xl font-bold text-blue-900">Crafting empowering tweets...</p>
          </Card>
        )}
        
        {tweets.length > 0 && !generating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-blue-900">
                Your {selectedTheme} Tweets
              </h2>
              <Button
                onClick={() => generateTweets(selectedTheme)}
                variant="outline"
                className="gap-2 border-blue-300"
              >
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </Button>
            </div>
            
            {tweets.map((tweet, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className={`p-6 bg-gradient-to-br ${toneColors[tweet.tone.toLowerCase()] || 'from-gray-100 to-gray-200 border-gray-300'} border-2`}>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="bg-blue-500 rounded-full p-2">
                      <Twitter className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-gray-900">Angel Sister</span>
                        <span className="text-gray-500 text-sm">@QueenOfClouds</span>
                        <span className="px-2 py-1 bg-white/70 rounded-full text-xs font-semibold capitalize">
                          {tweet.tone}
                        </span>
                      </div>
                      <p className="text-gray-900 text-lg leading-relaxed mb-4">
                        {tweet.text}
                      </p>
                      <ShareButtons content={tweet.text} contentType="tweet" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
            
            <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border-2 border-green-300 text-center">
              <p className="text-green-800 font-semibold">
                🎉 +30 Faith Points Earned! (10 per tweet)
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}