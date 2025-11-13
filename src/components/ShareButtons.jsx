import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Twitter, Instagram, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function ShareButtons({ content, contentType }) {
  const handleShare = (platform) => {
    const text = encodeURIComponent(content + '\n\n#AngelSisters #QueenOfTheClouds');
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
      toast.success('Opening Twitter...');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(content + '\n\n#AngelSisters #QueenOfTheClouds');
      toast.success('Copied to clipboard! 💜');
    }
  };
  
  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        onClick={() => handleShare('twitter')}
        className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white gap-2"
      >
        <Twitter className="w-4 h-4" />
        Share on Twitter
      </Button>
      
      <Button
        onClick={() => handleShare('copy')}
        variant="outline"
        className="border-purple-300 text-purple-700 hover:bg-purple-50 gap-2"
      >
        <Share2 className="w-4 h-4" />
        Copy to Share
      </Button>
      
      <Button
        variant="outline"
        className="border-pink-300 text-pink-700 hover:bg-pink-50 gap-2"
      >
        <Instagram className="w-4 h-4" />
        Instagram Story
      </Button>
    </div>
  );
}