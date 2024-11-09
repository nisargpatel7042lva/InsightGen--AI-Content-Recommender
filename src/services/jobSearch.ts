import { ContentItem } from '../types';

const GITHUB_JOBS_API = 'https://jobs.github.com/positions.json';
const MOCK_JOBS = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp',
    description: 'Looking for an experienced developer to join our team. Must have strong React and Node.js skills.',
    tags: ['React', 'Node.js', 'TypeScript'],
    type: 'Full-time',
    location: 'Remote'
  },
  {
    id: '2',
    title: 'Machine Learning Engineer',
    company: 'AI Solutions',
    description: 'Join our AI team to work on cutting-edge ML projects. Experience with PyTorch or TensorFlow required.',
    tags: ['Python', 'Machine Learning', 'AI'],
    type: 'Full-time',
    location: 'Remote'
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    description: 'Help us build and maintain our cloud infrastructure. Experience with AWS and Kubernetes is a plus.',
    tags: ['DevOps', 'AWS', 'Kubernetes'],
    type: 'Full-time',
    location: 'Remote'
  }
];

export async function fetchRealTimeJobs(query: string): Promise<ContentItem[]> {
  try {
    // Since we're in a demo environment, we'll use mock data
    // In production, you would use a real API endpoint
    const filteredJobs = MOCK_JOBS.filter(job => 
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.description.toLowerCase().includes(query.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );

    return filteredJobs.map(job => ({
      id: `job-${job.id}`,
      title: job.title,
      type: 'job',
      description: `${job.company} - ${job.location}\n\n${job.description}`,
      tags: job.tags,
      date: new Date().toISOString(),
      imageUrl: `https://source.unsplash.com/featured/800x600?${encodeURIComponent(job.tags[0])}`,
      url: '#',
      company: job.company,
      location: job.location
    }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}