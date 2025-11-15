import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowLeft, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '../components/Footer';

const faqs = [
  {
    question: "What is Queen of the Clouds?",
    answer: "Queen of the Clouds is a gamified content creation platform where you transform career burnout, imposter syndrome, and daily struggles into empowering memes, video scripts, and tweets. Earn faith points, unlock rewards, and join the Angel Sisters community!"
  },
  {
    question: "How do I earn Faith Points?",
    answer: "You earn faith points by creating content (memes, video scripts, tweets), completing wellness challenges, and progressing through game levels. Each creation earns you 10-20 points, and completing levels can earn you up to 100 points!"
  },
  {
    question: "What are the game levels about?",
    answer: "There are three realms to conquer: Office Inferno (navigate toxic workplace scenarios), Wellness Whirlwind (practice self-compassion exercises), and Sisterhood Summit (connect with virtual mentors). Each level unlocks at certain faith point milestones."
  },
  {
    question: "Can I share my content on social media?",
    answer: "Absolutely! All generated content can be shared directly to Twitter or Instagram. Memes can be downloaded for Instagram Stories, and all content comes with #AngelSisters hashtags ready to go."
  },
  {
    question: "What rewards can I unlock?",
    answer: "As you earn faith points, you unlock special filters like Glamour Wings, exclusive angel avatars, new meme templates, and advanced content creation features. Reach 777 points to unlock everything!"
  },
  {
    question: "Is my data safe and private?",
    answer: "Yes! We take data privacy seriously and comply with GDPR regulations. Check our Privacy Policy for full details on how we protect your information."
  },
  {
    question: "How does the referral program work?",
    answer: "Share Queen of the Clouds with your friends! When they sign up using your referral link, you both get +5 faith points. The more Angel Sisters you invite, the more points you earn!"
  },
  {
    question: "Can I use this for free?",
    answer: "Yes! Queen of the Clouds is free to use. Create unlimited memes, video scripts, and tweets. All core features and game levels are available at no cost."
  },
  {
    question: "What if AI generation fails?",
    answer: "Our system automatically retries if there's an API issue. If generation still fails, you'll see an error message and can try again. We're constantly improving reliability!"
  },
  {
    question: "How do I get started?",
    answer: "Simply sign up, complete the quick tutorial to earn your first 20 faith points, then choose a creative mode (Meme, Video, or Tweet) and start creating! The dashboard guides you through everything."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link to={createPageUrl('Landing')}>
            <Button variant="ghost" className="mb-6 text-purple-700 hover:text-purple-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Crown className="w-16 h-16 mx-auto mb-4 text-purple-600" />
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-700">
              Everything you need to know about Queen of the Clouds ✨
            </p>
          </motion.div>
        </div>
        
        {/* FAQ List */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-purple-50 transition-colors"
              >
                <span className="text-lg font-semibold text-purple-900 pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-purple-600 flex-shrink-0" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-700 leading-relaxed border-t border-purple-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 text-center border-2 border-purple-300"
        >
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-600" />
          <h2 className="text-2xl font-bold text-purple-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-700 mb-6">
            Can't find what you're looking for? Start creating and explore the platform!
          </p>
          <Link to={createPageUrl('Home')}>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              Get Started Now
            </Button>
          </Link>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}