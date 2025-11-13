import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function PageTransition({ isTransitioning }) {
  const angelImages = [
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69160be603b85195a722190b/2c55a18d3_204c3475-fa0f-4e5f-b2b0-c591a2f8773a.png",
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69160be603b85195a722190b/8b16f7900_f26b7ff5-0805-4a8d-9cbf-7f6fc363331d.png",
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69160be603b85195a722190b/3f6da6207_749a7476-94a8-4d48-92a1-3d2d2dfea743.png",
  ];
  
  const randomAngel = angelImages[Math.floor(Math.random() * angelImages.length)];
  
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <motion.img
              src={randomAngel}
              alt="Angel"
              className="w-64 h-64 mx-auto object-cover rounded-full mb-6 shadow-2xl border-4 border-purple-300"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 mx-auto text-purple-600 mb-2" />
              <p className="text-xl font-bold text-purple-900">Flying to your destination...</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}