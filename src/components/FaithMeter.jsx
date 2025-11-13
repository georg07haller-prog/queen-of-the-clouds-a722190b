import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FaithMeter({ points, maxPoints = 777 }) {
  const percentage = Math.min((points / maxPoints) * 100, 100);
  const hearts = Math.floor(points / 100);
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-purple-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <span className="font-bold text-lg text-purple-900">Faith Meter</span>
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {points} / {maxPoints}
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="relative h-6 bg-purple-100 rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold text-purple-900">
            {percentage.toFixed(0)}%
          </span>
        </div>
      </div>
      
      {/* Hearts Display */}
      <div className="flex gap-1 flex-wrap">
        {Array.from({ length: Math.max(hearts, 1) }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Heart className="w-6 h-6 fill-pink-400 text-pink-500" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}