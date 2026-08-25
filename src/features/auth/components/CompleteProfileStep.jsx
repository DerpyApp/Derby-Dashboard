import { useState } from 'react';
import { UserCheck, Zap, TrendingUp, MapPin, Flag, Search, ArrowRight } from 'lucide-react';

export const CompleteProfileStep = ({ formData, isSubmitting = false, setFormData, onSubmit }) => {
  const positions = ['GK', 'Defender', 'Winger', 'Striker'];
  const cities = ['Cairo', 'Giza', 'Alexandria', 'Aswan', 'Luxor'];
  const sportsList = [
    { id: 'football', label: 'Football', icon: '⚽' },
    { id: 'padel', label: 'Padel', icon: '🎾' },
    { id: 'basketball', label: 'Basketball', icon: '🏀' },
    { id: 'volleyball', label: 'Volleyball', icon: '🏐' },
  ];

  const [searchCity, setSearchCity] = useState('');

  // Control Handlers
  const handlePositionSelect = (position) => {
    setFormData((prev) => ({ ...prev, position }));
  };

  const handleSkillChange = (e) => {
    setFormData((prev) => ({ ...prev, skillLevel: Number(e.target.value) }));
  };

  const handleCitySelect = (city) => {
    setFormData((prev) => ({ ...prev, city }));
  };

  const handleSportToggle = (sportId) => {
    setFormData((prev) => {
      const currentSports = prev.favoriteSports || [];
      const updated = currentSports.includes(sportId)
        ? currentSports.filter((id) => id !== sportId)
        : [...currentSports, sportId];
      return { ...prev, favoriteSports: updated };
    });
  };

  const filteredCities = cities.filter((c) =>
    c.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
      {/* Header Info */}
      <div className="flex flex-col items-center text-center">
        <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#1a1d24] border border-[#C8F13A]/20 shadow-lg shadow-[#C8F13A]/5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C8F13A] text-black">
            <UserCheck className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Step Indicator (4 of 4) */}
        <div className="mb-1 flex items-center justify-center gap-1.5">
          <span className="h-1 w-5 rounded-full bg-[#C8F13A]"></span>
          <span className="h-1 w-5 rounded-full bg-[#C8F13A]"></span>
          <span className="h-1 w-5 rounded-full bg-[#C8F13A]"></span>
          <span className="h-1 w-5 rounded-full bg-[#C8F13A]"></span>
        </div>
        <p className="mb-2 font-mono text-[10px] text-gray-400">Step 4 of 4</p>
      </div>

      {/* Intro Box */}
      <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#16191e] p-3.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#C8F13A]">
          <UserCheck className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">Complete your Profile</h2>
          <p className="text-[11px] leading-tight text-gray-400 mt-0.5">
            Tell us how you play and what you like—we use this to serve better courts, matches, and teammates.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-3.5">
        {/* 1. POSITION */}
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-[10px] font-semibold text-[#C8F13A] font-mono">
            <Zap className="h-3 w-3" />
            <span>POSITION</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#16191e] p-3">
            <p className="mb-2 text-[10px] text-gray-400">Tap the role that fits you well on the pitch</p>
            <div className="flex flex-wrap gap-2">
              {positions.map((pos) => {
                const isSelected = formData.position === pos;
                return (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => handlePositionSelect(pos)}
                    className={`rounded-full px-3.5 py-1 text-xs transition-all ${
                      isSelected
                        ? 'border border-[#C8F13A] bg-[#C8F13A]/10 font-semibold text-[#C8F13A]'
                        : 'border border-white/10 bg-white/5 text-gray-300 hover:border-white/30'
                    }`}
                  >
                    {pos}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. SKILL LEVEL */}
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-[10px] font-semibold text-[#C8F13A] font-mono">
            <TrendingUp className="h-3 w-3" />
            <span>SKILL LEVEL</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#16191e] p-3">
            <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-gray-400">SLIDE ACROSS 1-5</p>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={formData.skillLevel || 3}
              onChange={handleSkillChange}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-[#C8F13A]"
            />
            <div className="mt-1 flex justify-between text-[9px] font-mono text-gray-500">
              <span>Novice</span>
              <span>Pro</span>
            </div>
          </div>
        </div>

        {/* 3. YOUR CITY */}
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-[10px] font-semibold text-[#C8F13A] font-mono">
            <MapPin className="h-3 w-3" />
            <span>YOUR CITY</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#16191e] p-3 space-y-2.5">
            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5">
              <Search className="mr-2 h-3.5 w-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Cities"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {filteredCities.map((city) => {
                const isSelected = formData.city === city;
                return (
                  <button
                    key={city}
                    type="button"
                    onClick={() => handleCitySelect(city)}
                    className={`rounded-full px-3 py-1 text-xs transition-all ${
                      isSelected
                        ? 'border border-[#C8F13A] bg-[#C8F13A]/10 font-semibold text-[#C8F13A]'
                        : 'border border-white/10 bg-white/5 text-gray-300 hover:border-white/30'
                    }`}
                  >
                    {city}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. FAVORITE SPORTS */}
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-[10px] font-semibold text-[#C8F13A] font-mono">
            <Flag className="h-3 w-3" />
            <span>FAVORITE SPORTS</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {sportsList.map((sport) => {
              const isSelected = (formData.favoriteSports || []).includes(sport.id);
              return (
                <button
                  key={sport.id}
                  type="button"
                  onClick={() => handleSportToggle(sport.id)}
                  className={`flex flex-col items-center justify-center rounded-2xl p-3 transition-all ${
                    isSelected
                      ? 'border border-[#C8F13A] bg-[#C8F13A]/10 text-white'
                      : 'border border-white/10 bg-[#16191e] text-gray-400 hover:border-white/20'
                  }`}
                >
                  <span className="text-xl mb-1">{sport.icon}</span>
                  <span className="text-xs font-medium">{sport.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Finish Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C8F13A] py-3 text-xs font-semibold text-black transition-all hover:bg-[#b0d82d] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="inline-block h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
          ) : (
            <>
              <span>Finish</span>
              <ArrowRight className="h-4 w-4 text-black" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
