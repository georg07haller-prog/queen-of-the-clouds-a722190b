import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Zap, Heart, ArrowRight, MessageSquare, Film, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import Footer from '../components/Footer';

export default function Landing() {
  const [demoMeme, setDemoMeme] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDemoMeme = async () => {
    setIsGenerating(true);
    try {
      const memeResponse = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a funny, relatable meme about workplace burnout and imposter syndrome. 
        Target audience: women aged 25-45 dealing with work and life challenges.
        Format: Return a JSON with 'top_text' and 'bottom_text' for a classic meme format.
        Keep it empowering, funny, and supportive. Use #AngelSisters vibes.`,
        response_json_schema: {
          type: "object",
          properties: {
            top_text: { type: "string" },
            bottom_text: { type: "string" }
          }
        }
      });
      
      const imageResponse = await base44.integrations.Core.GenerateImage({
        prompt: `A funny, empowering meme image about workplace burnout. Modern, relatable scene for women aged 25-45. Professional photography style, bright and uplifting colors.`,
      });
      
      setDemoMeme({
        ...memeResponse,
        image_url: imageResponse.url
      });
    } catch (error) {
      console.error('Demo generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-300/20 to-blue-300/20" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69160be603b85195a722190b/9b2be30ff_Crown.png"
                alt="Queen of the Clouds"
                className="w-32 h-32 md:w-48 md:h-48 mx-auto object-cover rounded-full drop-shadow-2xl"
              />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Queen of the Clouds
            </h1>
            
            <p className="text-2xl md:text-3xl text-purple-900 mb-4 font-semibold">
              Rise Above the Digital Purgatory
            </p>
            
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              Transform career burnout, imposter syndrome, and daily struggles into 
              empowering memes, videos, and tweets. Join thousands of Angel Sisters! ✨
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to={createPageUrl('Home')}>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-6 rounded-full shadow-xl">
                  Start Creating Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Button
                onClick={generateDemoMeme}
                variant="outline"
                className="border-2 border-purple-400 text-purple-700 hover:bg-purple-50 text-lg px-8 py-6 rounded-full"
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Try Demo Meme'}
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Demo Meme Display */}
      {demoMeme && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto px-4 mb-20"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-purple-300">
            <h3 className="text-2xl font-bold text-purple-900 mb-4 text-center">
              ✨ Your Demo Meme
            </h3>
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-center">
              <p className="text-white text-2xl font-bold mb-4 px-4">
                {demoMeme.top_text}
              </p>
              <div className="my-4">
                <img 
                  src={demoMeme.image_url} 
                  alt="Demo Meme" 
                  className="w-full max-w-md mx-auto rounded-xl shadow-2xl"
                />
              </div>
              <p className="text-white text-2xl font-bold mt-4 px-4">
                {demoMeme.bottom_text}
              </p>
            </div>
            <div className="mt-6 text-center">
              <Link to={createPageUrl('Home')}>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  Sign Up to Create More!
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-purple-900 mb-12">
          Why Angel Sisters Love Us 💜
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-xl border-2 border-pink-200"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-purple-900 mb-3 text-center">AI-Powered Memes</h3>
            <p className="text-gray-700 text-center">
              Generate hilarious, relatable memes about burnout, imposter syndrome, and daily struggles in seconds.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-200"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Film className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-purple-900 mb-3 text-center">Video Scripts</h3>
            <p className="text-gray-700 text-center">
              Create 15-second inspirational video scripts with self-care tips and affirmations for TikTok & Reels.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-200"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Share2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-purple-900 mb-3 text-center">Easy Sharing</h3>
            <p className="text-gray-700 text-center">
              One-click sharing to Twitter and Instagram. Download memes instantly for your Stories.
            </p>
          </motion.div>
        </div>
        
        {/* Game Features */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-12 border-2 border-purple-300">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
            🎮 Gamified Self-Care Journey
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">Earn Faith Points</h3>
                <p className="text-gray-700">
                  Collect up to 777 faith points by creating content and completing wellness challenges.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">Unlock Rewards</h3>
                <p className="text-gray-700">
                  Get exclusive filters, angel wings, and special features as you progress.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">Conquer Realms</h3>
                <p className="text-gray-700">
                  Battle through Office Inferno, Wellness Whirlwind, and Sisterhood Summit levels.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">Join Sisterhood</h3>
                <p className="text-gray-700">
                  Connect with virtual mentors and build your support squad of Angel Sisters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">
            Ready to Rise Above? 👑
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Join thousands of Angel Sisters transforming burnout into empowerment!
          </p>
          <Link to={createPageUrl('Home')}>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl px-12 py-8 rounded-full shadow-2xl">
              Start Your Journey Now ✨
            </Button>
          </Link>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}