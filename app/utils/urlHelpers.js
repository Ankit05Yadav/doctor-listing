export const updateQueryParams = (filters) => {
  if (typeof window === 'undefined') return;
  
  const url = new URL(window.location.href);
  
  // Clear existing params
  url.searchParams.delete('search');
  url.searchParams.delete('consultType');
  url.searchParams.delete('specialties');
  url.searchParams.delete('sortBy');
  
  // Add new params
  if (filters.searchQuery) {
    url.searchParams.set('search', filters.searchQuery);
  }
  
  if (filters.consultType) {
    url.searchParams.set('consultType', filters.consultType);
  }
  
  if (filters.specialties.length > 0) {
    url.searchParams.set('specialties', filters.specialties.join(','));
  }
  
  if (filters.sortBy) {
    url.searchParams.set('sortBy', filters.sortBy);
  }
  
  // Update URL without reloading the page
  // Using replaceState instead of pushState to avoid creating multiple history entries
  const shouldPush = JSON.stringify(filters) !== JSON.stringify(getFiltersFromUrl());
  if (shouldPush) {
    window.history.pushState({ filters }, '', url.toString());
  }
};

export const getFiltersFromUrl = () => {
  if (typeof window === 'undefined') {
    return {
      searchQuery: '',
      consultType: '',
      specialties: [],
      sortBy: ''
    };
  }
  
  const url = new URL(window.location.href);
  
  const searchQuery = url.searchParams.get('search') || '';
  const consultType = url.searchParams.get('consultType') || '';
  const specialtiesStr = url.searchParams.get('specialties') || '';
  const specialties = specialtiesStr ? specialtiesStr.split(',') : [];
  const sortBy = url.searchParams.get('sortBy') || '';
  
  return {
    searchQuery,
    consultType,
    specialties,
    sortBy
  };
};

// Function to sync browser URL and state
export const syncUrlWithState = (filters) => {
  if (typeof window === 'undefined') return;
  
  const currentUrl = new URL(window.location.href);
  const urlParams = new URLSearchParams(currentUrl.search);
  
  // Check if URL needs to be updated
  const needsUpdate = (
    (filters.searchQuery && urlParams.get('search') !== filters.searchQuery) ||
    (!filters.searchQuery && urlParams.has('search')) ||
    (filters.consultType && urlParams.get('consultType') !== filters.consultType) ||
    (!filters.consultType && urlParams.has('consultType')) ||
    (filters.specialties.length > 0 && urlParams.get('specialties') !== filters.specialties.join(',')) ||
    (filters.specialties.length === 0 && urlParams.has('specialties')) ||
    (filters.sortBy && urlParams.get('sortBy') !== filters.sortBy) ||
    (!filters.sortBy && urlParams.has('sortBy'))
  );
  
  if (needsUpdate) {
    updateQueryParams(filters);
  }
}; 