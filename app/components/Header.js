import Autocomplete from './Autocomplete';

const Header = ({ 
  doctors,
  searchQuery, 
  onSearchChange,
  onSelectSuggestion
}) => {
  return (
    <header className="header-search-container">
      <div className="header-search">
        <Autocomplete
          doctors={doctors}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onSelectSuggestion={onSelectSuggestion}
        />
      </div>
    </header>
  );
};

export default Header; 