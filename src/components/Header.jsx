import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import ViewToggle from './ViewToggle';
import SearchFilters from './SearchFilters';

export default function Header({ onViewChange, onSearch, onFilterChange }) {
  return (
    <header className="bg-slate-950 border-b border-yellow-400">
      {/* Top Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Derby Logo" className="h-6 w-auto" />
          <span className="ml-2 text-white font-bold text-lg">DERBY</span>
        </div>

        {/* Menu Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Home</a>
          <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Tournaments</a>
          <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Pricing</a>
          <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Contact</a>
          <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">About us</a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button className="text-gray-300 hover:text-white text-sm transition-colors">
            Sign in
          </button>
          <button className="bg-yellow-400 text-slate-900 px-6 py-2 rounded font-semibold hover:bg-yellow-300 transition-colors text-sm">
            Sign up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">
          Venues in Egypt
        </h1>
        <p className="text-gray-400 mb-6">
          Discover and book the best sports facilities across Cairo, Giza, and Alexandria.
          High-energy arenas await!
        </p>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Filters Component */}
          <div className="w-full md:flex-1">
            <SearchFilters onSearch={onSearch} onFilterChange={onFilterChange} />
          </div>

          {/* View Toggle */}
          <div>
            <ViewToggle onViewChange={onViewChange} />
          </div>
        </div>
      </div>
    </header>
  );
}
