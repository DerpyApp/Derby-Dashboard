import { Star, MapPin, Users } from 'lucide-react';

export default function VenueCard({ venue }) {
  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300 shadow-lg">
      {/* Image Container */}
      <div className="relative h-48 bg-slate-700 overflow-hidden">
        <img 
          src={venue.image} 
          alt={venue.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-lime-400 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold">
          {venue.status}
        </div>
        <div className="absolute top-4 left-4 flex items-center gap-1 bg-black bg-opacity-60 px-2 py-1 rounded">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-white text-sm font-semibold">{venue.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <h3 className="text-xl font-bold text-white mb-2">
          {venue.name}
        </h3>
        
        {/* Location */}
        <div className="flex items-center text-gray-400 mb-3 text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          {venue.location}
        </div>

        {/* Capacity */}
        <div className="flex items-center text-gray-400 mb-4 text-sm">
          <Users className="w-4 h-4 mr-2" />
          Capacity: {venue.capacity.toLocaleString()} people
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center text-gray-400 text-sm mb-4">
          <span className="text-yellow-400 font-semibold">{venue.reviews}</span>
          <span className="ml-1">reviews</span>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-700 my-4"></div>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm mb-1">Price per hour</p>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-white">{venue.price}</span>
              <span className="text-gray-400 ml-2">{venue.currency}</span>
            </div>
          </div>
          <button className="bg-lime-400 text-slate-900 px-6 py-2 rounded font-semibold hover:bg-lime-300 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
