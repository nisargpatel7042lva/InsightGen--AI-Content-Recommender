import React, { useState } from 'react';
import { ContentItem } from '../types';
import { Calendar, Tag, ExternalLink, TrendingUp, Building, MapPin } from 'lucide-react';
import InteractiveContent from './InteractiveContent';

interface ContentCardProps {
  item: ContentItem;
}

export default function ContentCard({ item }: ContentCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  const typeColors = {
    news: 'bg-blue-100 text-blue-800',
    job: 'bg-green-100 text-green-800',
    learning: 'bg-purple-100 text-purple-800'
  };

  const isNew = new Date(item.date).getTime() > Date.now() - 86400000; // 24 hours

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden group">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transform transition-transform group-hover:scale-110"
        />
        {isNew && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
            <TrendingUp className="w-4 h-4" />
            New
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[item.type]}`}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(item.date).toLocaleDateString()}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 hover:text-indigo-600 cursor-pointer">
          {item.title}
        </h3>

        {item.type === 'job' && item.company && (
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Building className="w-4 h-4" />
              {item.company}
            </div>
            {item.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {item.location}
              </div>
            )}
          </div>
        )}
        
        <p className={`text-gray-600 mb-4 ${expanded ? '' : 'line-clamp-3'}`}>
          {item.description}
          {item.description.length > 150 && !expanded && '...'}
        </p>
        
        {item.description.length > 150 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-indigo-600 hover:text-indigo-700 text-sm mb-4"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
        
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 cursor-pointer transition-colors"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
        
        <button 
          onClick={() => window.open(item.url, '_blank')}
          className="flex items-center justify-center w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View Details
        </button>

        <InteractiveContent item={item} />
      </div>
    </div>
  );
}