import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function LevelCard({ title, description, icon: Icon, isLocked, isCompleted, pageName, bgColor }) {
  return (
    <Link to={!isLocked ? createPageUrl(pageName) : '#'}>
      <motion.div
        whileHover={!isLocked ? { scale: 1.02, y: -3 } : {}}
        className={`relative overflow-hidden rounded-2xl p-6 border-2 shadow-lg ${
          isLocked 
            ? 'bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed' 
            : `${bgColor} border-white/50 cursor-pointer`
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {Icon && <Icon className={`w-8 h-8 ${isLocked ? 'text-gray-400' : 'text-white'}`} />}
          </div>
          {isLocked && <Lock className="w-5 h-5 text-gray-500" />}
          {isCompleted && <CheckCircle2 className="w-6 h-6 text-green-500 fill-green-100" />}
        </div>
        
        <h3 className={`text-xl font-bold mb-2 ${isLocked ? 'text-gray-700' : 'text-white'}`}>
          {title}
        </h3>
        <p className={`text-sm leading-relaxed ${isLocked ? 'text-gray-600' : 'text-white/90'}`}>
          {description}
        </p>
        
        {!isLocked && (
          <div className="flex items-center text-white font-semibold mt-4">
            <span>Enter Level</span>
            <ChevronRight className="w-5 h-5 ml-1" />
          </div>
        )}
        
        {isLocked && (
          <p className="text-xs text-gray-500 mt-3">Unlock with more faith points</p>
        )}
      </motion.div>
    </Link>
  );
}