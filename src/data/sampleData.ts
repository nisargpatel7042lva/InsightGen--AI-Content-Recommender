import { ContentItem } from '../types';

export const sampleTags = [
  'AI', 'Machine Learning', 'Web Development', 
  'Python', 'JavaScript', 'React', 
  'Data Science', 'Cloud Computing', 'DevOps',
  'Cybersecurity', 'Blockchain', 'Mobile Development'
];

export const sampleContent: ContentItem[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning with TensorFlow',
    type: 'learning',
    description: 'Comprehensive course covering ML basics to advanced neural networks. Perfect for beginners looking to enter the AI field.',
    tags: ['AI', 'Machine Learning', 'Python'],
    date: '2024-03-15',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    title: 'Senior AI Engineer Position at Tech Innovation Labs',
    type: 'job',
    description: 'Leading tech company seeking experienced AI engineers to work on cutting-edge projects. Remote position available.',
    tags: ['AI', 'Machine Learning', 'Python', 'Cloud Computing'],
    date: '2024-03-14',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '3',
    title: 'Breakthrough in Quantum Computing Achieved',
    type: 'news',
    description: 'Scientists achieve quantum supremacy, marking a major milestone in computing history.',
    tags: ['AI', 'Data Science', 'Cloud Computing'],
    date: '2024-03-13',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000'
  },
  // Add more items as needed
];