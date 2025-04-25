'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import DoctorCard from './components/DoctorCard';
import { fetchDoctors, filterDoctors, getAllSpecialties } from './utils';
import { updateQueryParams, getFiltersFromUrl } from './utils/urlHelpers';

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter state
  const [filters, setFilters] = useState({
    searchQuery: '',
    consultType: '',
    specialties: [],
    sortBy: ''
  });

  // Effect to load doctors on mount and set up navigation event listeners
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        console.log('Fetching doctors data...');
        const data = await fetchDoctors();
        
        if (!data || data.length === 0) {
          setError('No doctors found in the API response.');
          setLoading(false);
          return;
        }
        
        console.log(`Loaded ${data.length} doctors successfully`);
        setDoctors(data);
        
        // Extract all specialties
        const allSpecialties = getAllSpecialties(data);
        setSpecialties(allSpecialties);
        
        // Load filters from URL
        const urlFilters = getFiltersFromUrl();
        setFilters(urlFilters);
        
        // Apply initial filters
        const filtered = filterDoctors(data, urlFilters);
        setFilteredDoctors(filtered);
        
        setLoading(false);
      } catch (err) {
        setError(`Failed to load doctors: ${err.message || 'Unknown error'}`);
        setLoading(false);
      }
    };

    // Set up the popstate (browser back/forward) event handler
    const handlePopState = (event) => {
      console.log('Navigation event detected:', event);
      // Get filters from URL or from state if available
      const urlFilters = event.state?.filters || getFiltersFromUrl();
      console.log('Restoring filters from navigation:', urlFilters);
      setFilters(urlFilters);
    };

    loadDoctors();
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Effect to apply filters whenever they change
  useEffect(() => {
    if (doctors.length) {
      const filtered = filterDoctors(doctors, filters);
      setFilteredDoctors(filtered);
      updateQueryParams(filters);
    }
  }, [filters, doctors]);

  // Handlers for filter changes
  const handleSearchChange = (query) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const handleSelectSuggestion = (doctor) => {
    setFilters(prev => ({ ...prev, searchQuery: doctor.name }));
  };

  const handleConsultTypeChange = (type) => {
    setFilters(prev => ({ ...prev, consultType: prev.consultType === type ? '' : type }));
  };

  const handleSpecialtyChange = (specialty) => {
    setFilters(prev => {
      const specialties = prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty];
      
      return { ...prev, specialties };
    });
  };

  const handleSortChange = (sort) => {
    setFilters(prev => ({ ...prev, sortBy: prev.sortBy === sort ? '' : sort }));
  };

  const handleClearFilters = () => {
    const emptyFilters = {
      searchQuery: '',
      consultType: '',
      specialties: [],
      sortBy: ''
    };
    
    setFilters(emptyFilters);
    
    // Explicitly clear URL parameters
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.search = ''; // Clear all query parameters
      window.history.pushState({ filters: emptyFilters }, '', url.toString());
    }
  };

  return (
    <main className="min-h-screen">
      {/* Header with Search */}
      <Header 
        doctors={doctors}
        searchQuery={filters.searchQuery}
        onSearchChange={handleSearchChange}
        onSelectSuggestion={handleSelectSuggestion}
      />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            <p className="mt-2">Loading doctors...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            <p className="mt-2">
              Using sample data instead. You can still explore the application functionality.
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters */}
            <div className="md:w-1/4">
              <FilterPanel 
                specialties={specialties}
                selectedSpecialties={filters.specialties}
                consultType={filters.consultType}
                sortBy={filters.sortBy}
                onSpecialtyChange={handleSpecialtyChange}
                onConsultTypeChange={handleConsultTypeChange}
                onSortChange={handleSortChange}
                onClearFilters={handleClearFilters}
              />
            </div>
            
            {/* Doctor Listing */}
            <div className="md:w-3/4">
              {filteredDoctors.length > 0 ? (
                <div className="space-y-0">
                  {filteredDoctors.map(doctor => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <p className="text-lg text-gray-600">No doctors found matching your criteria.</p>
                  <button
                    onClick={handleClearFilters}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {!loading && !error && (
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-gray-500 mb-1">
            Testing URL Parameters:
          </p>
          <a 
            href="/test-filters" 
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Navigate to Test Page (will preserve filters)
          </a>
        </div>
      )}
    </main>
  );
} 