import { useState, useEffect } from 'react';
import { generateContent } from '../services/gemini';
import { ContentItem } from '../types';

export function useGeminiContent(tags: string[]) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<ContentItem[]>([]);

  useEffect(() => {
    async function fetchGeminiContent() {
      if (tags.length === 0) return;

      setLoading(true);
      setError(null);

      try {
        const prompt = `Generate 3 content recommendations for the following topics: ${tags.join(', ')}. 
          For each recommendation, include:
          - A title
          - A brief description
          - The content type (either 'news', 'job', or 'learning')
          - Related tags
          Format as JSON array.`;

        const response = await generateContent(prompt);
        if (!response) throw new Error('No response from Gemini');

        // Parse and format the response
        const items: ContentItem[] = JSON.parse(response).map((item: any, index: number) => ({
          id: `gemini-${index}`,
          title: item.title,
          type: item.type.toLowerCase(),
          description: item.description,
          tags: item.tags,
          date: new Date().toISOString(),
          imageUrl: `https://source.unsplash.com/random/800x600?${item.tags[0].toLowerCase()}`
        }));

        setContent(items);
      } catch (err) {
        setError('Failed to generate recommendations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchGeminiContent();
  }, [tags]);

  return { content, loading, error };
}