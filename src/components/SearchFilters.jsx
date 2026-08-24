import { useState } from 'react';
import { Search, ChevronDown, Filter } from 'lucide-react';

export default function SearchFilters({ onSearch, onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedSport, setSelectedSport] = useState('All Sports');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showSportDropdown, setShowSportDropdown] = useState(false);

  const cities = ['All Cities', 'Cairo', 'Giza', 'Alexandria', 'Helwan', 'Maadi', 'Zamalek'];
  const sports = ['All Sports', 'Football', 'Tennis', 'Padel', 'Squash', 'Badminton'];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setShowCityDropdown(false);
    onFilterChange({ city, sport: selectedSport });
  };

  const handleSportChange = (sport) => {
    setSelectedSport(sport);
    setShowSportDropdown(false);
    onFilterChange({ city: selectedCity, sport });
  };

  return (
    <div className="bg-slate-900 rounded-full px-6 py-4 flex items-center gap-4 flex-wrap md:flex-nowrap">
      {/* Search Input */}
      <div className="flex-1 min-w-[250px] relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search venues by name..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full bg-slate-800 text-white pl-12 pr-4 py-2 rounded-full border border-gray-700 focus:border-yellow-400 focus:outline-none transition-colors placeholder-gray-500 text-sm"
        />
      </div>

      {/* City Filter */}
      <div className="relative">
        <button
          onClick={() => setShowCityDropdown(!showCityDropdown)}
          className="flex items-center gap-2 bg-slate-800 text-gray-300 px-4 py-2 rounded-full hover:text-white border border-gray-700 hover:border-yellow-400 transition-all text-sm font-medium"
        >
          {selectedCity}
          <ChevronDown className="w-4 h-4" />
        </button>
        {showCityDropdown && (
          <div className="absolute top-full mt-2 bg-slate-800 border border-gray-700 rounded-lg shadow-lg z-10 min-w-max">
            {cities.map(city => (
              <button
                key={city}
                onClick={() => handleCityChange(city)}
                className={`block w-full text-left px-4 py-2 transition-colors ${
                  selectedCity === city
                    ? 'bg-yellow-400 text-slate-900 font-semibold'
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sport Filter */}
      <div className="relative">
        <button
          onClick={() => setShowSportDropdown(!showSportDropdown)}
          className="flex items-center gap-2 bg-slate-800 text-gray-300 px-4 py-2 rounded-full hover:text-white border border-gray-700 hover:border-yellow-400 transition-all text-sm font-medium"
        >
          {selectedSport}
          <ChevronDown className="w-4 h-4" />
        </button>
        {showSportDropdown && (
          <div className="absolute top-full mt-2 bg-slate-800 border border-gray-700 rounded-lg shadow-lg z-10 min-w-max">
            {sports.map(sport => (
              <button
                key={sport}
                onClick={() => handleSportChange(sport)}
                className={`block w-full text-left px-4 py-2 transition-colors ${
                  selectedSport === sport
                    ? 'bg-yellow-400 text-slate-900 font-semibold'
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filters Button */}
      <button className="flex items-center gap-2 bg-slate-800 text-gray-300 px-4 py-2 rounded-full hover:text-white border border-gray-700 hover:border-yellow-400 transition-all text-sm font-medium">
        <Filter className="w-4 h-4" />
        Filters
      </button>
    </div>
  );
}
