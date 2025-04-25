import { useState } from 'react';

const FilterPanel = ({
  specialties,
  selectedSpecialties,
  consultType,
  sortBy,
  onSpecialtyChange,
  onConsultTypeChange,
  onSortChange,
  onClearFilters
}) => {
  const [showSort, setShowSort] = useState(true);
  const [showSpecialties, setShowSpecialties] = useState(true);
  const [showConsultMode, setShowConsultMode] = useState(true);

  return (
    <>
      {/* Sort Filter */}
      <div className="filter-container">
        <div 
          className="filter-header" 
          onClick={() => setShowSort(!showSort)}
          data-testid="filter-header-sort"
        >
          <h3 className="font-semibold">Sort by</h3>
          <span>{showSort ? '▲' : '▼'}</span>
        </div>
        
        {showSort && (
          <div className="filter-content">
            <div className="filter-option">
              <label className="radio-option">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'fees'}
                  onChange={() => onSortChange('fees')}
                  data-testid="sort-fees"
                />
                <span className="radio-label">Price: Low-High</span>
              </label>
            </div>
            <div className="filter-option">
              <label className="radio-option">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'experience'}
                  onChange={() => onSortChange('experience')}
                  data-testid="sort-experience"
                />
                <span className="radio-label">Experience: Most Experience first</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Filters section with Clear All */}
      <div className="filter-container">
        <div className="filter-header">
          <h3 className="font-semibold">Filters</h3>
          <a 
            href="#" 
            className="filters-clear-all"
            onClick={(e) => {
              e.preventDefault();
              onClearFilters();
            }}
          >
            Clear All
          </a>
        </div>
      </div>

      {/* Specialties Filter */}
      <div className="filter-container">
        <div 
          className="filter-header" 
          onClick={() => setShowSpecialties(!showSpecialties)}
          data-testid="filter-header-speciality"
        >
          <h3 className="font-semibold">Specialities</h3>
          <span>{showSpecialties ? '▲' : '▼'}</span>
        </div>
        
        {showSpecialties && (
          <div className="filter-content">
            {/* Search field for specialties (not functional, just for UI) */}
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded mb-3" 
              placeholder="Search specialities"
            />
            
            {specialties.map((specialty) => (
              <div key={specialty} className="filter-option">
                <label className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={selectedSpecialties.includes(specialty)}
                    onChange={() => onSpecialtyChange(specialty)}
                    data-testid={`filter-specialty-${specialty.replace(/\//g, '-')}`}
                  />
                  <span className="checkbox-label">{specialty}</span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Consultation Mode Filter */}
      <div className="filter-container">
        <div 
          className="filter-header" 
          onClick={() => setShowConsultMode(!showConsultMode)}
          data-testid="filter-header-moc"
        >
          <h3 className="font-semibold">Mode of consultation</h3>
          <span>{showConsultMode ? '▲' : '▼'}</span>
        </div>
        
        {showConsultMode && (
          <div className="filter-content">
            <div className="filter-option">
              <label className="radio-option">
                <input
                  type="radio"
                  name="consultType"
                  checked={consultType === 'Video Consult'}
                  onChange={() => onConsultTypeChange('Video Consult')}
                  data-testid="filter-video-consult"
                />
                <span className="radio-label">Video Consultation</span>
              </label>
            </div>
            <div className="filter-option">
              <label className="radio-option">
                <input
                  type="radio"
                  name="consultType"
                  checked={consultType === 'In Clinic'}
                  onChange={() => onConsultTypeChange('In Clinic')}
                  data-testid="filter-in-clinic"
                />
                <span className="radio-label">In-clinic Consultation</span>
              </label>
            </div>
            <div className="filter-option">
              <label className="radio-option">
                <input
                  type="radio"
                  name="consultType"
                  checked={consultType === ''}
                  onChange={() => onConsultTypeChange('')}
                  data-testid="filter-all"
                />
                <span className="radio-label">All</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FilterPanel; 