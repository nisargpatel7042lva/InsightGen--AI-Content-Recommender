import { useState, useEffect } from 'react';
import { ContentItem } from '../types';
import { fetchRealTimeJobs } from '../services/jobSearch';
import { generateContent } from '../services/gemini';

export function useRealTimeSearch(query: string, selectedTags: string[]) {
  const [results, setResults] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (!query && selectedTags.length === 0) return;

      setLoading(true);
      setError(null);

      try {
        const [jobs, aiContent] = await Promise.all([
          fetchRealTimeJobs(query),
          generateContent(`Generate 2 relevant ${query ? 'articles about ' + query : 'recommendations'} 
            ${selectedTags.length > 0 ? 'related to ' + selectedTags.join(', ') : ''}.
            Include title, description, and tags. Format as JSON array.`)
        ]);

        let aiResults: ContentItem[] = [];
        if (aiContent) {
          aiResults = JSON.parse(aiContent).map((item: any, index: number) => ({
            id: `ai-${index}`,
            title: item.title,
            type: 'news',
            description: item.description,
            tags: item.tags,
            date: new Date().toISOString(),
            imageUrl: `https://source.unsplash.com/random/800x600?${item.tags[0].toLowerCase()}`
          }));
        }

        setResults([...jobs, ...aiResults]);
      } catch (err) {
        setError('Failed to fetch real-time results');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500); // Debounce search

    return () => clearTimeout(searchTimeout);
  }, [query, selectedTags]);

  return { results, loading, error };
}