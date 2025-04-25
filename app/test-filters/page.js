'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFiltersFromUrl } from '../utils/urlHelpers';

export default function TestFiltersPage() {
  const [currentFilters, setCurrentFilters] = useState({});
  const router = useRouter();
  
  useEffect(() => {
    // Get filters from URL on page load
    const filters = getFiltersFromUrl();
    setCurrentFilters(filters);
  }, []);
  
  const handleGoBack = () => {
    router.back();
  };
  
  const handleHome = () => {
    router.push('/');
  };
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Filter Test Page</h1>
      <p className="mb-4">This page demonstrates that URL filters are preserved during navigation.</p>
      
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Current Filters from URL:</h2>
        <pre className="bg-white p-3 rounded text-sm overflow-auto">
          {JSON.stringify(currentFilters, null, 2)}
        </pre>
      </div>
      
      <div className="flex gap-4">
        <button 
          onClick={handleGoBack}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
        <button 
          onClick={handleHome}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Go Home
        </button>
      </div>
      
      <div className="mt-8 p-4 border border-gray-300 rounded">
        <h2 className="font-semibold mb-2">Testing Instructions:</h2>
        <ol className="list-decimal ml-5 space-y-2">
          <li>Go to the home page and apply some filters</li>
          <li>Navigate to this test page manually by adding "/test-filters" to the URL</li>
          <li>You should see your filters displayed above</li>
          <li>Click "Go Back" and your filters should still be applied</li>
        </ol>
      </div>
    </div>
  );
} 