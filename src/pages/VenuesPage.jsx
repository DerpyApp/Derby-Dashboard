import { useState } from 'react';
import VenueCard from '../components/VenueCard';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

export default function VenuesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const venues = [
    {
      id: 1,
      name: 'Zamalek Club',
      location: 'Zamalek, Cairo',
      price: 250,
      currency: 'EGP',
      rating: 4.5,
      reviews: 42,
      image: '/Zamalek.png',
      capacity: 5000,
      status: 'AVAILABLE'
    },
    {
      id: 2,
      name: 'Smash Club',
      location: 'Maadi, Cairo',
      price: 400,
      currency: 'EGP',
      rating: 4.2,
      reviews: 38,
      image: '/Smash Club Padel Court.png',
      capacity: 3000,
      status: 'AVAILABLE'
    },
    {
      id: 3,
      name: 'Victory Field',
      location: 'Nasr City, Cairo',
      price: 500,
      currency: 'EGP',
      rating: 4.8,
      reviews: 56,
      image: '/Victory Field Tennis Court.png',
      capacity: 8000,
      status: 'AVAILABLE'
    }
  ];

  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    venue.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Venues in Egypt
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl">
            Discover and book the best sports venues across Cairo, Giza, and Alexandria.
            Find your perfect spot for football, tennis, and more.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-slate-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery}
            placeholder="Search venues by name or location..."
          />
        </div>
      </section>

      {/* Venues Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredVenues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredVenues.map(venue => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No venues found. Try a different search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
