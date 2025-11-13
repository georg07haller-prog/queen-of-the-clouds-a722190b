import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Twitter, Instagram, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function ShareButtons({ content, contentType, imageUrl }) {
  const handleShare = (platform) => {
    const text = encodeURIComponent(content + '\n\n#AngelSisters #QueenOfTheClouds');
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
      toast.success('Opening Twitter...');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(content + '\n\n#AngelSisters #QueenOfTheClouds');
      toast.success('Copied to clipboard! 💜');
    } else if (platform === 'instagram') {
      if (imageUrl) {
        // Download image for Instagram Story
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'queen-of-clouds-meme.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Image downloaded! Now upload it to Instagram Stories 📸');
      } else {
        // Copy text for Instagram
        navigator.clipboard.writeText(content + '\n\n#AngelSisters #QueenOfTheClouds');
        toast.success('Text copied! Paste it in your Instagram Story 💜');
      }
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
        onClick={() => handleShare('instagram')}
        variant="outline"
        className="border-pink-300 text-pink-700 hover:bg-pink-50 gap-2"
      >
        <Instagram className="w-4 h-4" />
        {imageUrl ? 'Download for Instagram' : 'Copy for Instagram'}
      </Button>
    </div>
  );
}