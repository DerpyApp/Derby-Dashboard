import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search venues...' }) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-slate-800 text-white pl-12 pr-6 py-3 rounded-lg border border-slate-700 focus:border-lime-400 focus:outline-none transition-colors placeholder-gray-500"
        />
      </div>
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-400"
        >
          ✕
        </button>
      )}
    </div>
  );
}
