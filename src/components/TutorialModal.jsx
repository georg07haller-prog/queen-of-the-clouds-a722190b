import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

export default function TutorialModal({ isOpen, onClose }) {
  const [tutorialStep, setTutorialStep] = useState(0);
  
  const handleClose = () => {
    setTutorialStep(0);
    onClose();
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
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
                <>
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    className="flex-1 border-purple-300"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => setTutorialStep(tutorialStep + 1)}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg"
                  >
                    Next
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleClose}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg"
                >
                  Got It! ✨
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}