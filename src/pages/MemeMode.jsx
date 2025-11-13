import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ShareButtons from '../components/ShareButtons';
import { toast } from 'sonner';

export default function MemeMode() {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedMeme, setGeneratedMeme] = useState(null);
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
    "Career burnout and endless Zoom meetings",
    "Imposter syndrome at work",
    "Work-life balance struggles",
    "Monday morning blues",
    "Email overload anxiety",
    "Self-care vs productivity guilt",
  ];
  
  const generateMeme = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a challenge or topic!');
      return;
    }
    
    setGenerating(true);
    
    try {
      // Generate meme text using AI
      const memeResponse = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a funny, relatable meme about: ${prompt}. 
        Target audience: women aged 25-45 dealing with work and life challenges.
        Format: Return a JSON with 'top_text' and 'bottom_text' for a classic meme format, and 'caption' for social media.
        Keep it empowering, funny, and supportive. Use #AngelSisters vibes.`,
        response_json_schema: {
          type: "object",
          properties: {
            top_text: { type: "string" },
            bottom_text: { type: "string" },
            caption: { type: "string" }
          }
        }
      });
      
      // Save to database
      const saved = await base44.entities.GeneratedContent.create({
        content_type: 'meme',
        content_text: `${memeResponse.top_text}\n\n${memeResponse.bottom_text}\n\n${memeResponse.caption}`,
        prompt: prompt,
        faith_points_earned: 15,
        tags: [prompt],
      });
      
      // Update progress
      if (progress?.id) {
        const newPoints = Math.min((progress.faith_points || 0) + 15, 777);
        const newFilters = [...(progress.unlocked_filters || [])];
        
        if (newPoints >= 100 && !newFilters.includes('Glamour Wings')) {
          newFilters.push('Glamour Wings');
          toast.success('🎉 Unlocked: Glamour Wings filter!');
        }
        if (newPoints >= 250 && !newFilters.includes('Ethereal Glow')) {
          newFilters.push('Ethereal Glow');
          toast.success('🎉 Unlocked: Ethereal Glow filter!');
        }
        
        await base44.entities.GameProgress.update(progress.id, {
          faith_points: newPoints,
          unlocked_filters: newFilters,
        });
        queryClient.invalidateQueries(['gameProgress']);
      }
      
      setGeneratedMeme(memeResponse);
      toast.success('✨ Meme created! +15 faith points');
      
    } catch (error) {
      toast.error('Failed to generate meme. Try again!');
    } finally {
      setGenerating(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69160be603b85195a722190b/8b16f7900_f26b7ff5-0805-4a8d-9cbf-7f6fc363331d.png"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Meme Mode 😂
            </h1>
            <p className="text-gray-600">Generate relatable memes about your daily struggles</p>
          </div>
        </div>
        
        {/* Challenge Suggestions */}
        <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm border-2 border-pink-200">
          <h3 className="font-bold text-lg text-purple-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Popular Challenges
          </h3>
          <div className="flex flex-wrap gap-2">
            {challenges.map((challenge, i) => (
              <button
                key={i}
                onClick={() => setPrompt(challenge)}
                className="px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 rounded-full text-sm font-medium text-purple-700 transition-all border-2 border-purple-200"
              >
                {challenge}
              </button>
            ))}
          </div>
        </Card>
        
        {/* Input Section */}
        <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm border-2 border-purple-200">
          <label className="block font-bold text-purple-900 mb-3">
            What challenge are you facing today?
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Dealing with imposter syndrome at my new job..."
            className="mb-4 min-h-32 text-base border-purple-200 focus:border-purple-400"
          />
          <Button
            onClick={generateMeme}
            disabled={generating}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-6 text-lg gap-2"
          >
            {generating ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                  <Wand2 className="w-5 h-5" />
                </motion.div>
                Creating Magic...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate Meme ✨
              </>
            )}
          </Button>
        </Card>
        
        {/* Generated Meme Display */}
        {generatedMeme && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-8 bg-white/90 backdrop-blur-sm border-2 border-purple-300 shadow-xl">
              {/* Meme Display */}
              <div className="mb-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-center">
                <p className="text-white text-2xl font-bold mb-4">
                  {generatedMeme.top_text}
                </p>
                <div className="bg-white/20 rounded-xl p-6 my-4">
                  <p className="text-white/90 text-sm">[ Your meme image would appear here ]</p>
                </div>
                <p className="text-white text-2xl font-bold">
                  {generatedMeme.bottom_text}
                </p>
              </div>
              
              {/* Caption */}
              <div className="mb-6">
                <label className="block font-bold text-purple-900 mb-2">Caption for Sharing:</label>
                <div className="bg-purple-50 p-4 rounded-xl border-2 border-purple-200">
                  <p className="text-gray-800 leading-relaxed">{generatedMeme.caption}</p>
                </div>
              </div>
              
              {/* Share Buttons */}
              <ShareButtons 
                content={`${generatedMeme.top_text}\n\n${generatedMeme.bottom_text}\n\n${generatedMeme.caption}`}
                contentType="meme"
              />
              
              {/* Success Message */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border-2 border-green-300 text-center">
                <p className="text-green-800 font-semibold">
                  🎉 +15 Faith Points Earned! Keep creating!
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}