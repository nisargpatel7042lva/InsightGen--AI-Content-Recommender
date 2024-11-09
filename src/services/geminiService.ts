import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCpAZQ9jKEm7ZK7OL39_lpFUHjvQxwQWo8');

export async function generateContent(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const result = await model.generateContent(`
      Generate a detailed response about ${prompt}.
      Include key points, insights, and relevant information.
      Format the response in a clear, structured way.
      Keep it informative and engaging.
    `);

    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('No content generated');
    }

    return {
      title: prompt,
      content: text,
      type: 'learning',
      tags: extractKeywords(text),
      date: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error generating content:', error);
    return {
      title: 'Content Generation Error',
      content: 'We apologize, but we could not generate content at this time. Please try again later.',
      type: 'error',
      tags: [],
      date: new Date().toISOString()
    };
  }
}

function extractKeywords(text: string): string[] {
  const commonWords = new Set(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i']);
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const wordFreq = new Map<string, number>();
  
  words.forEach(word => {
    if (!commonWords.has(word) && word.length > 3) {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
  });
  
  return Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);
}