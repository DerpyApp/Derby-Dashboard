import { useState } from 'react';

export default function VenuesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');
  const [selectedArea, setSelectedArea] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [visibleCount, setVisibleCount] = useState(3); // يبدأ بـ 3 ملاعب فقط

  // مصفوفة الملاعب المحدثة بالكامل مع جميع اللوكيشنز والخرائط
  const venues = [
    {
      id: 1,
      name: "Cairo Padel",
      sport: "Padel",
      area: "New Cairo",
      location: "Mountain View Hyde Park",
      price: 250.0,
      currency: "EGP",
      priceDetails: "1 hour for 250 EGP per player",
      mapUrl: "https://maps.app.goo.gl/wCPqeYzn4kF8vnsh8",
      openingHours: "9:00 am to 11:00 pm",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80",
      isLive: true
    },
    {
      id: 2,
      name: "J Padel",
      sport: "Padel",
      area: "New Cairo",
      location: "Swan Lake Residence",
      price: 300.0,
      currency: "EGP",
      priceDetails: "1 hour for 300 EGP per player",
      mapUrl: "https://maps.app.goo.gl/nizMRUbdFcCALJiM7",
      openingHours: "8:00 am to 12:00 am",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
      isLive: false
    },
    {
      id: 3,
      name: "SR Padel Club 7",
      sport: "Padel",
      area: "Maadi",
      location: "The Field Maadi",
      price: 360.0,
      currency: "EGP",
      priceDetails: "1 hour for 360 EGP per player",
      mapUrl: "https://maps.app.goo.gl/s3ULmwqZRPJddxBe6",
      openingHours: "8:00 am to 12:00 am",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
      isLive: true
    },
    {
      id: 4,
      name: "Pro Padel",
      sport: "Padel",
      area: "Maadi",
      location: "Maadi Club",
      price: 2400.0,
      currency: "EGP",
      priceDetails: "2400 EGP per group of 3 (8 sessions)",
      mapUrl: "https://maps.app.goo.gl/oy4mrSWB4n7LL9E47",
      openingHours: "9:00 am to 11:00 pm",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
      isLive: false
    },
    {
      id: 5,
      name: "Padel Up Elite",
      sport: "Padel",
      area: "Maadi",
      location: "Street 250 Maadi",
      price: 300.0,
      currency: "EGP",
      priceDetails: "range of 300 EGP per hour per player",
      mapUrl: "https://maps.app.goo.gl/7Qa2sPKLjGU41iao6",
      openingHours: "9:00 am to 12:00 am",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
      isLive: true
    },
    {
      id: 6,
      name: "Padel Point",
      sport: "Padel",
      area: "Cairo",
      location: "Talaaea Sporting Club",
      price: 400.0,
      currency: "EGP",
      priceDetails: "an average of 400 EGP per hour",
      mapUrl: "https://maps.app.goo.gl/XyDxt8SCWmLN1qNVA",
      openingHours: "6:00 am to 3:00 am",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=800&q=80",
      isLive: false
    },
    {
      id: 7,
      name: "The Padel Zone",
      sport: "Padel",
      area: "Cairo",
      location: "Almazah",
      price: 250.0,
      currency: "EGP",
      priceDetails: "one hour for 250 EGP per player",
      mapUrl: "https://maps.app.goo.gl/Eiiw1eHAw78nCWZVA",
      openingHours: "10:00 am to 2:00 am",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80",
      isLive: true
    },
    {
      id: 8,
      name: "Padel Co",
      sport: "Padel",
      area: "Cairo",
      location: "El Shorouk City",
      price: 300.0,
      currency: "EGP",
      priceDetails: "an average of 300 EGP per hour",
      mapUrl: "https://maps.app.goo.gl/AxpFWg49Uu5ngU1a9",
      openingHours: "12:00 pm to 2:00 am",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=800&q=80",
      isLive: false
    },
    {
      id: 9,
      name: "Padel Beats",
      sport: "Padel",
      area: "6 October",
      location: "Dreamland",
      price: 400.0,
      currency: "EGP",
      priceDetails: "400 EGP per hour per player",
      mapUrl: "https://maps.app.goo.gl/kY82wpKqHqakPuh18",
      openingHours: "24 hours",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
      isLive: true
    },
    {
      id: 10,
      name: "Padel House",
      sport: "Padel",
      area: "6 October",
      location: "Six Ten Park",
      price: 500.0,
      currency: "EGP",
      priceDetails: "one hour for 500 EGP per player",
      mapUrl: "https://maps.app.goo.gl/F2k7cJpRKKrTkaAf6",
      openingHours: "24 hours",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1518619892911-8f772714a672?auto=format&fit=crop&w=800&q=80",
      isLive: false
    },
    {
      id: 11,
      name: "Mexico Padel",
      sport: "Padel",
      area: "6 October",
      location: "26th of July Corridor",
      price: 350.0,
      currency: "EGP",
      priceDetails: "1 hour for 350 EGP per person",
      mapUrl: "https://maps.app.goo.gl/ALKufpok1k1SUA5i7",
      openingHours: "24 hours",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
      isLive: true
    },
    {
      id: 12,
      name: "The Padel Club",
      sport: "Padel",
      area: "El Sheikh Zayed",
      location: "Inside Galleria 40",
      price: 400.0,
      currency: "EGP",
      priceDetails: "range of 400 EGP per person",
      mapUrl: "https://maps.app.goo.gl/uGhfegRBHZQvcKqA8",
      openingHours: "6:00 am to 1:00 am",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=800&q=80",
      isLive: false
    },
    {
      id: 13,
      name: "Padel It",
      sport: "Padel",
      area: "El Sheikh Zayed",
      location: "Arkan Plaza",
      price: 400.0,
      currency: "EGP",
      priceDetails: "one hour for 400 EGP per person",
      mapUrl: "https://maps.app.goo.gl/BV4eQ3S7axiAZTaz7",
      openingHours: "8:00 am to 1:00 am",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1569517282132-25d22f29236e?auto=format&fit=crop&w=800&q=80",
      isLive: true
    },
    {
      id: 14,
      name: "Pro Padel (Zayed)",
      sport: "Padel",
      area: "El Sheikh Zayed",
      location: "El Seginy Riding Club",
      price: 300.0,
      currency: "EGP",
      priceDetails: "range of 300 EGP per hour",
      mapUrl: "https://maps.app.goo.gl/cAPm9r6HgeV4nzg99",
      openingHours: "24 hours",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80",
      isLive: false
    },
    {
      id: 15,
      name: "Combat Station",
      sport: "Padel",
      area: "Cairo",
      location: "Shubra, Egypt",
      price: 250.0,
      currency: "EGP",
      priceDetails: "250 EGP",
      mapUrl: "https://maps.app.goo.gl/gJpgHVwN47woA9Ps9",
      openingHours: "12:00 pm to 12:00 am",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
      isLive: true
    },
    {
      id: 16,
      name: "Golden Padel",
      sport: "Padel",
      area: "Giza",
      location: "Dakhlia Sporting Club",
      price: 300.0,
      currency: "EGP",
      priceDetails: "300 EGP",
      mapUrl: "https://maps.app.goo.gl/iY3Khc3BwBnPjBB89",
      openingHours: "8:00 am to 11:00 pm",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80",
      isLive: false
    },
    {
      id: 17,
      name: "Madinaty Football Stadium 1",
      sport: "Football",
      area: "Menoufiya",
      location: "Sadat City",
      price: 200.0,
      currency: "EGP",
      priceDetails: "200 EGP",
      mapUrl: "https://maps.app.goo.gl/ecksF1vJnbbYxwLK9",
      openingHours: "1:00 pm to 4:00 pm",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
      isLive: true
    },
    {
      id: 18,
      name: "Al Dawly Playground",
      sport: "Football",
      area: "Giza",
      location: "Street 10 EL Warak",
      price: 75.0,
      currency: "EGP",
      priceDetails: "75 EGP",
      mapUrl: "https://maps.app.goo.gl/E2c8d54JjwEB28Ut8",
      openingHours: "1:00 am to 1:00 pm",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
      isLive: false
    },
    {
      id: 19,
      name: "Sultan Resort",
      sport: "Football",
      area: "Fayoum",
      location: "Fayoum City",
      price: 200.0,
      currency: "EGP",
      priceDetails: "200 EGP",
      mapUrl: "https://maps.app.goo.gl/Ai9Egv2z3iNQ8gzQA?g_st=ic",
      openingHours: "5:00 pm to 2:00 am",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1518619892911-8f772714a672?auto=format&fit=crop&w=800&q=80",
      isLive: true
    },
    {
      id: 20,
      name: "Dream Plaza Playground",
      sport: "Football",
      area: "Giza",
      location: "October Gardens",
      price: 300.0,
      currency: "EGP",
      priceDetails: "300 EGP",
      mapUrl: "https://maps.app.goo.gl/rffazCcmAypjKZqG7",
      openingHours: "10:00 am to 12:00 am",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=800&q=80",
      isLive: false
    },
    {
      id: 21,
      name: "Go Padel",
      sport: "Padel",
      area: "New Cairo",
      location: "Katameya Heights Compound",
      price: 350.0,
      currency: "EGP",
      priceDetails: "1 hour for 350 EGP, 2 hours for 600 EGP",
      mapUrl: "https://maps.app.goo.gl/nEoWZzLCRD8FWZQv9",
      openingHours: "10:00 am to 12:00 am",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
      isLive: false
    }
  ];

  // استخراج الفلاتر ديناميكياً
  const areas = ['All', ...new Set(venues.map(v => v.area))];
  const sports = ['All', ...new Set(venues.map(v => v.sport))];

  // تصفية النتائج حسب البحث والفلاتر
  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          venue.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = selectedSport === 'All' || venue.sport === selectedSport;
    const matchesArea = selectedArea === 'All' || venue.area === selectedArea;
    return matchesSearch && matchesSport && matchesArea;
  });

  const displayedVenues = filteredVenues.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#111317] text-[#FFFFFF] flex flex-col font-sans">
      <div className="w-full max-w-[1280px] mx-auto flex flex-col pt-[40px] pr-[24px] pb-[48px] pl-[24px] gap-[48px]">
        
        {/* Hero & Title Section */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF] mb-2">
                Venues in Egypt
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                Discover and book top-tier sports facilities across Egypt.<br />
                High-energy arenas await.
              </p>
            </div>

            {/* Grid & Map View Toggles */}
            <div className="flex items-center bg-[#1E2023] p-1 rounded-full border border-[#434933] self-start md:self-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  viewMode === 'grid' ? 'bg-[#282A2D] text-[#FFFFFF] shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>⊞</span> Grid
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  viewMode === 'map' ? 'bg-[#282A2D] text-[#FFFFFF] shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>🗺</span> Map ({filteredVenues.length})
              </button>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-wrap items-center bg-[#1E2023] border border-[#434933] rounded-[24px] p-[16px] gap-[16px]">
            <div className="relative flex-1 min-w-[280px]">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search venues by name..."
                className="w-full pl-11 pr-4 py-3 bg-[#111317] border border-[#434933] rounded-full text-sm text-[#FFFFFF] placeholder-gray-500 focus:outline-none transition-colors"
              />
            </div>

            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="px-5 py-3 bg-[#111317] border border-[#434933] rounded-full text-sm text-gray-300 focus:outline-none cursor-pointer"
            >
              {areas.map(area => (
                <option key={area} value={area}>{area === 'All' ? 'All Cities' : area}</option>
              ))}
            </select>

            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="px-5 py-3 bg-[#111317] border border-[#434933] rounded-full text-sm text-gray-300 focus:outline-none cursor-pointer"
            >
              {sports.map(sport => (
                <option key={sport} value={sport}>{sport === 'All' ? 'All Sports' : sport}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Content View Section */}
        <section className="flex flex-col gap-6">
          {viewMode === 'grid' ? (
            <>
              {displayedVenues.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {displayedVenues.map(venue => (
                    <div key={venue.id} className="bg-[#282A2D] border border-[#434933] rounded-[24px] overflow-hidden p-4 flex flex-col justify-between transition-all">
                      <div>
                        {/* صورة الملعب */}
                        <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                          <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
                          {venue.isLive && (
                            <span className="absolute top-3 left-3 bg-[#B9F600] text-black text-xs font-bold px-2.5 py-0.5 rounded shadow">Live</span>
                          )}
                          <span className="absolute top-3 right-3 bg-black/50 p-1.5 rounded-full text-white cursor-pointer hover:bg-black/70">♡</span>
                        </div>
                        
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="text-lg font-bold text-[#FFFFFF] truncate pr-2">{venue.name}</h3>
                          <span className="bg-yellow-500/10 text-yellow-500 text-xs px-2 py-0.5 rounded font-bold shrink-0">★ {venue.rating}</span>
                        </div>
                        <p className="text-gray-400 text-xs mb-2">📍 {venue.location}, {venue.area}</p>
                        <p className="text-gray-500 text-[11px] mb-3">🕒 {venue.openingHours}</p>
                        
                        {/* أيقونات الرياضة */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="bg-[#111317] border border-[#434933] p-1.5 rounded-lg text-xs text-gray-300">
                            {venue.sport === 'Football' ? '⚽' : '🎾'}
                          </span>
                          <span className="bg-[#111317] border border-[#434933] p-1.5 rounded-lg text-xs text-gray-300">👤</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#434933]">
                        <div>
                          <p className="text-[10px] text-gray-400">Starting From</p>
                          <p className="text-[#B9F600] font-bold text-base">{venue.price} EGP <span className="text-xs text-gray-400">/hr</span></p>
                        </div>
                        <button 
                          onClick={() => window.open(venue.mapUrl, '_blank')}
                          className="px-4 py-2 border border-[#B9F600] rounded-full text-xs text-[#B9F600] hover:bg-[#B9F600]/10 transition-colors text-center font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-400 text-lg">No venues found matching your filters.</p>
                </div>
              )}

              {/* Load More Button */}
              {visibleCount < filteredVenues.length && (
                <div className="mt-8 flex justify-center">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 3)}
                    className="px-6 py-3 bg-[#111317] border border-[#434933] rounded-[9999px] text-xs font-medium text-gray-300 hover:border-gray-500 transition-colors flex items-center gap-2 shadow-sm"
                  >
                    Load More Venues <span className="text-xs">▼</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Map View Section - يعرض كل الملاعب المفلترة مع خريطة حقيقية لكل واحد */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVenues.map(venue => (
                <div key={venue.id} className="bg-[#1E2023] border border-[#434933] rounded-[20px] p-4 flex flex-col justify-between gap-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] bg-[#111317] text-[#B9F600] border border-[#B9F600]/30 px-2 py-0.5 rounded-full font-bold">
                        {venue.sport}
                      </span>
                      <h4 className="text-white font-bold text-base mt-2">{venue.name}</h4>
                      <p className="text-gray-400 text-xs mt-0.5">📍 {venue.location}, {venue.area}</p>
                    </div>
                    <span className="text-yellow-500 bg-yellow-500/10 text-xs px-2 py-0.5 rounded font-bold">★ {venue.rating}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#434933]/60 text-xs">
                    <span className="text-[#B9F600] font-bold">{venue.price} EGP /hr</span>
                    <button 
                      onClick={() => window.open(venue.mapUrl, '_blank')}
                      className="bg-[#B9F600] text-black px-3.5 py-1.5 rounded-full font-bold hover:opacity-90"
                    >
                      Open Map
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}