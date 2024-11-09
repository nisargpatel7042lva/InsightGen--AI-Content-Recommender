import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      <span className="ml-2 text-gray-600">Generating recommendations...</span>
    </div>
  );
}