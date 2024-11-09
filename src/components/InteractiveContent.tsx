import React, { useState } from 'react';
import { Heart, Share2, Bookmark, MessageSquare } from 'lucide-react';
import { ContentItem } from '../types';

interface InteractiveContentProps {
  item: ContentItem;
}

export default function InteractiveContent({ item }: InteractiveContentProps) {
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50));
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setLikes(prev => prev + 1)}
          className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors"
        >
          <Heart className={`w-5 h-5 ${likes > 0 ? 'fill-red-500 text-red-500' : ''}`} />
          <span>{likes}</span>
        </button>
        
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Discuss</span>
        </button>
        
        <button 
          onClick={() => setSaved(!saved)}
          className="flex items-center gap-1 text-gray-600 hover:text-yellow-500 transition-colors"
        >
          <Bookmark className={`w-5 h-5 ${saved ? 'fill-yellow-500 text-yellow-500' : ''}`} />
          <span>{saved ? 'Saved' : 'Save'}</span>
        </button>
        
        <button 
          onClick={handleShare}
          className="flex items-center gap-1 text-gray-600 hover:text-green-500 transition-colors"
        >
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <textarea
            placeholder="Share your thoughts..."
            className="w-full p-3 rounded border focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={3}
          />
          <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Comment
          </button>
        </div>
      )}
    </div>
  );
}