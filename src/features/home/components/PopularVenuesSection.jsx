import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLocationDot, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const venues = [
  {
    name: 'Victory Football Club',
    location: 'New Cairo',
    price: '250 EGP',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Padel Hub 5th Settlement',
    location: '5th Settlement',
    price: '200 EGP',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Smash Padel Club',
    location: 'Sheikh Zayed',
    price: '200 EGP',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1626248801379-51a0748a5f96?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Goal Makers Field',
    location: 'October',
    price: '180 EGP',
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=600&q=80',
  },
];

export const PopularVenuesSection = () => {
  return (
    <section className="w-full bg-[#121417] py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Popular Venues</h2>
            <p className="text-gray-400 text-sm mt-1">Discover top-rated venues in your area.</p>
          </div>
          <a href="#" className="text-[#a8ff00] hover:underline text-xs font-semibold flex items-center gap-1 uppercase tracking-wider">
            View all venues <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {venues.map((item, index) => (
            <div key={index} className="bg-[#181b20] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-white/20 transition duration-300 group">
              
              {/* Image & Rating Badge */}
              <div className="relative h-48 w-full overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 border border-white/10">
                  <FontAwesomeIcon icon={faStar} className="text-[#a8ff00] text-[10px]" />
                  <span>{item.rating}</span>
                </div>
              </div>

              {/* Details */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">{item.name}</h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mb-4">
                    <FontAwesomeIcon icon={faLocationDot} className="text-gray-500" />
                    {item.location}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">FROM</span>
                    <p className="text-base font-extrabold text-[#a8ff00]">
                      {item.price} <span className="text-xs text-gray-400 font-normal">/ hr</span>
                    </p>
                  </div>
                  <button className="bg-[#a8ff00] text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#96e600] transition">
                    Book
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};