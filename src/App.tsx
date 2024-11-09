import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { contentLibrary } from './data/contentLibrary';
import ContentCard from './components/ContentCard';
import Sidebar from './components/Sidebar';
import { UserPreferences } from './types';

function App() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    selectedTags: [],
    contentTypes: ['news', 'job', 'learning']
  });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContent = useMemo(() => {
    return contentLibrary.filter(item => {
      // Filter by content type
      if (!preferences.contentTypes.includes(item.type)) return false;

      // Filter by tags if any are selected
      if (preferences.selectedTags.length > 0 && 
          !item.tags.some(tag => preferences.selectedTags.includes(tag))) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [preferences, searchQuery]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar preferences={preferences} setPreferences={setPreferences} />
      
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Content Recommendations
            </h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {filteredContent.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No content found</h3>
              <p className="text-gray-500">
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map(item => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;