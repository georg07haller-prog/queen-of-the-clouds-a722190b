import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ModeCard({ title, description, icon: Icon, gradient, pageName, emoji }) {
  return (
    <Link to={createPageUrl(pageName)}>
      <motion.div
        whileHover={{ scale: 1.03, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className={`relative overflow-hidden rounded-3xl p-6 cursor-pointer shadow-xl border-2 border-white/50 ${gradient}`}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            {Icon && <Icon className="w-8 h-8 text-white" />}
            {emoji && <span className="text-4xl">{emoji}</span>}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/90 text-sm leading-relaxed mb-4">{description}</p>
          <div className="flex items-center text-white font-semibold">
            <span>Start Creating</span>
            <ChevronRight className="w-5 h-5 ml-1" />
          </div>
        </div>
        
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl" />
      </motion.div>
    </Link>
  );
}