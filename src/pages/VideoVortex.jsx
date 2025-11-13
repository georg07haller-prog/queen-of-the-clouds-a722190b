import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Film, ArrowLeft, Sparkles, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import ShareButtons from '../components/ShareButtons';
import { toast } from 'sonner';

export default function VideoVortex() {
  const [topic, setTopic] = useState('');
  const [generating, setGenerating] = useState(false);
  const [videoScript, setVideoScript] = useState(null);
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
  
  const topics = [
    "Morning self-care routine",
    "Overcoming self-doubt",
    "Setting boundaries at work",
    "Mindful breathing exercise",
    "Celebrating small wins",
    "Night-time affirmations",
  ];
  
  const generateVideo = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a video topic!');
      return;
    }
    
    setGenerating(true);
    
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Create a 15-second inspirational video script about: ${topic}.
        Target audience: women aged 25-45 seeking empowerment and self-care.
        Format: Return JSON with 'hook' (first 3 seconds), 'main_message' (7 seconds), 'call_to_action' (5 seconds), and 'hashtags'.
        Keep it uplifting, authentic, and actionable. Include #AngelSisters.`,
        response_json_schema: {
          type: "object",
          properties: {
            hook: { type: "string" },
            main_message: { type: "string" },
            call_to_action: { type: "string" },
            hashtags: { type: "string" },
            visual_suggestions: { type: "string" }
          }
        }
      });
      
      await base44.entities.GeneratedContent.create({
        content_type: 'video_script',
        content_text: `${response.hook}\n\n${response.main_message}\n\n${response.call_to_action}`,
        prompt: topic,
        faith_points_earned: 20,
        tags: [topic],
      });
      
      if (progress?.id) {
        const newPoints = Math.min((progress.faith_points || 0) + 20, 777);
        const newFilters = [...(progress.unlocked_filters || [])];
        
        if (newPoints >= 150 && !newFilters.includes('Dreamy Halo')) {
          newFilters.push('Dreamy Halo');
          toast.success('🎉 Unlocked: Dreamy Halo filter!');
        }
        
        await base44.entities.GameProgress.update(progress.id, {
          faith_points: newPoints,
          unlocked_filters: newFilters,
        });
        queryClient.invalidateQueries(['gameProgress']);
      }
      
      setVideoScript(response);
      toast.success('✨ Video script created! +20 faith points');
      
    } catch (error) {
      toast.error('Failed to generate script. Try again!');
    } finally {
      setGenerating(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-3">
              <Film className="w-10 h-10 text-purple-600" />
              Video Vortex
            </h1>
            <p className="text-gray-600">Create 15-second inspirational video scripts</p>
          </div>
        </div>
        
        <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm border-2 border-purple-200">
          <h3 className="font-bold text-lg text-purple-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Trending Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {topics.map((t, i) => (
              <button
                key={i}
                onClick={() => setTopic(t)}
                className="px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 hover:from-purple-200 hover:to-indigo-200 rounded-full text-sm font-medium text-purple-700 transition-all border-2 border-purple-200"
              >
                {t}
              </button>
            ))}
          </div>
        </Card>
        
        <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm border-2 border-purple-200">
          <label className="block font-bold text-purple-900 mb-3">
            What's your video about?
          </label>
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Quick meditation for busy professionals"
            className="mb-4 text-base border-purple-200 focus:border-purple-400"
          />
          <Button
            onClick={generateVideo}
            disabled={generating}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-6 text-lg gap-2"
          >
            {generating ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                  <Film className="w-5 h-5" />
                </motion.div>
                Creating Script...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Generate Video Script ✨
              </>
            )}
          </Button>
        </Card>
        
        {videoScript && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-8 bg-white/90 backdrop-blur-sm border-2 border-purple-300 shadow-xl">
              <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">
                Your 15-Second Video Script
              </h2>
              
              <div className="space-y-6 mb-6">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-xl border-2 border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded">
                      0-3 SEC
                    </div>
                    <span className="font-bold text-purple-900">The Hook</span>
                  </div>
                  <p className="text-gray-800 leading-relaxed">{videoScript.hook}</p>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-xl border-2 border-indigo-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded">
                      3-10 SEC
                    </div>
                    <span className="font-bold text-indigo-900">Main Message</span>
                  </div>
                  <p className="text-gray-800 leading-relaxed">{videoScript.main_message}</p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-pink-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
                      10-15 SEC
                    </div>
                    <span className="font-bold text-pink-900">Call to Action</span>
                  </div>
                  <p className="text-gray-800 leading-relaxed">{videoScript.call_to_action}</p>
                </div>
              </div>
              
              <div className="mb-6 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                <p className="font-bold text-purple-900 mb-2">Visual Suggestions:</p>
                <p className="text-gray-700 text-sm">{videoScript.visual_suggestions}</p>
              </div>
              
              <div className="mb-6 p-4 bg-indigo-50 rounded-xl border-2 border-indigo-200">
                <p className="font-bold text-indigo-900 mb-2">Hashtags:</p>
                <p className="text-indigo-700">{videoScript.hashtags}</p>
              </div>
              
              <ShareButtons 
                content={`${videoScript.hook}\n\n${videoScript.main_message}\n\n${videoScript.call_to_action}\n\n${videoScript.hashtags}`}
                contentType="video_script"
              />
              
              <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border-2 border-green-300 text-center">
                <p className="text-green-800 font-semibold">
                  🎉 +20 Faith Points Earned! You're amazing!
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}