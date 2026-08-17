import { useState } from 'react';
import VenueCard from '../components/VenueCard';
import SearchBar from '../components/SearchBar';

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
      image: 'https://images.unsplash.com/photo-1551524164-0fcf14fd51d0?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
      capacity: 8000,
      status: 'AVAILABLE'
    },
    {
      id: 4,
      name: 'Academy Club',
      location: 'Helwan, Cairo',
      price: 350,
      currency: 'EGP',
      rating: 4.1,
      reviews: 28,
      image: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=400&h=300&fit=crop',
      capacity: 4500,
      status: 'AVAILABLE'
    },
    {
      id: 5,
      name: 'Desert Sport Club',
      location: 'New Cairo',
      price: 450,
      currency: 'EGP',
      rating: 4.6,
      reviews: 44,
      image: 'https://images.unsplash.com/photo-1515632066519-c21e76319b31?w=400&h=300&fit=crop',
      capacity: 6000,
      status: 'AVAILABLE'
    },
    {
      id: 6,
      name: 'Elite Sports Complex',
      location: 'Giza, Cairo',
      price: 600,
      currency: 'EGP',
      rating: 4.9,
      reviews: 63,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
      capacity: 10000,
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
}
