import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header() {
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
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Filters */}
          <div className="flex gap-3 flex-wrap">
            <button className="border border-gray-600 text-gray-300 px-4 py-2 rounded hover:border-yellow-400 transition-colors text-sm">
              All Cities
            </button>
            <button className="border border-gray-600 text-gray-300 px-4 py-2 rounded hover:border-yellow-400 transition-colors text-sm">
              All Sports
            </button>
            <button className="border border-gray-600 text-gray-300 px-4 py-2 rounded hover:border-yellow-400 transition-colors text-sm">
              All Prices
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 ml-auto">
            <button className="text-gray-400 hover:text-white p-2 transition-colors">
              📊 Grid
            </button>
            <button className="text-gray-400 hover:text-white p-2 transition-colors">
              📋 Row
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search venues by name..."
            className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded focus:border-yellow-400 focus:outline-none transition-colors placeholder-gray-500"
          />
        </div>

        {/* Tags */}
        <div className="flex gap-2 mt-4">
          <span className="inline-block bg-slate-800 text-gray-300 px-3 py-1 rounded text-sm">
            Explore ✕
          </span>
          <span className="inline-block bg-slate-800 text-gray-300 px-3 py-1 rounded text-sm">
            Football ✕
          </span>
        </div>
      </div>
    </header>
  );
}
