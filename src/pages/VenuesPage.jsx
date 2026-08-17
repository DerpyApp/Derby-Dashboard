import { useState } from 'react';
import VenueCard from '../components/VenueCard';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function VenuesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('grid');

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
      {/* Header with Navigation and Hero */}
      <Header onViewChange={setView} />

      {/* Venues Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {view === 'grid' ? (
            filteredVenues.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredVenues.map(venue => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">No venues found. Try a different search.</p>
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">Map view coming soon...</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
