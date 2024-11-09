export interface ContentItem {
  id: string;
  title: string;
  type: 'news' | 'job' | 'learning';
  description: string;
  tags: string[];
  date: string;
  imageUrl: string;
  url: string;
  company?: string;
  location?: string;
}

export interface UserPreferences {
  selectedTags: string[];
  contentTypes: string[];
}