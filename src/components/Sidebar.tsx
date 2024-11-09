import React from 'react';
import { Tags, Briefcase, BookOpen, Newspaper } from 'lucide-react';
import { UserPreferences } from '../types';
import { sampleTags } from '../data/sampleData';

interface SidebarProps {
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
}

export default function Sidebar({ preferences, setPreferences }: SidebarProps) {
  const toggleTag = (tag: string) => {
    setPreferences(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag]
    }));
  };

  const toggleContentType = (type: 'news' | 'job' | 'learning') => {
    setPreferences(prev => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(type)
        ? prev.contentTypes.filter(t => t !== type)
        : [...prev.contentTypes, type]
    }));
  };

  return (
    <div className="w-64 bg-white h-screen p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-8">
        <Tags className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">Preferences</h2>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Content Types</h3>
        <div className="space-y-2">
          {[
            { type: 'news' as const, icon: Newspaper, label: 'News' },
            { type: 'job' as const, icon: Briefcase, label: 'Jobs' },
            { type: 'learning' as const, icon: BookOpen, label: 'Learning' }
          ].map(({ type, icon: Icon, label }) => (
            <button
              key={type}
              onClick={() => toggleContentType(type)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                preferences.contentTypes.includes(type)
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Topics</h3>
        <div className="flex flex-wrap gap-2">
          {sampleTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                preferences.selectedTags.includes(tag)
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}