import { useState, useEffect, useRef } from 'react';

const Autocomplete = ({ doctors, searchQuery, onSearchChange, onSelectSuggestion }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const suggestionsRef = useRef(null);

  // Filter doctors based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSuggestions([]);
      return;
    }

    const filtered = doctors.filter(doctor => 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doctor.specialty && doctor.specialty.some(spec => 
        spec.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    ).slice(0, 5); // Limit to 5 suggestions
    
    setFilteredSuggestions(filtered);
  }, [searchQuery, doctors]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (doctor) => {
    onSelectSuggestion(doctor);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full" ref={suggestionsRef}>
      <input
        type="text"
        placeholder="Search Doctors, Specialties, Clinics..."
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        className="w-full p-3 rounded-md border-0 shadow-sm"
        data-testid="autocomplete-input"
      />
      
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg autocomplete-suggestions">
          {filteredSuggestions.map((doctor) => (
            <li 
              key={doctor.id}
              className="px-4 py-2 cursor-pointer flex items-center autocomplete-suggestion"
              onClick={() => handleSelectSuggestion(doctor)}
              data-testid={`suggestion-${doctor.id}`}
            >
              <div className="w-8 h-8 mr-2 flex-shrink-0">
                {doctor.image ? (
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/32?text=Dr';
                    }}
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-xs font-bold">
                    {doctor.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <div className="font-medium">{doctor.name}</div>
                <div className="text-sm text-gray-500">
                  {doctor.specialty && doctor.specialty[0] ? doctor.specialty[0] : 'Doctor'}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete; 