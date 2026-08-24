import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol, faTableTennisPaddleBall, faTableTennis, faBasketball, faVolleyball, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const sports = [
  { name: 'Football', count: '320+ Venues', icon: faFutbol },
  { name: 'Padel', count: '180+ Venues', icon: faTableTennisPaddleBall },
  { name: 'Tennis', count: '120+ Venues', icon: faTableTennis },
  { name: 'Basketball', count: '90+ Venues', icon: faBasketball },
  { name: 'Volleyball', count: '60+ Venues', icon: faVolleyball },
];

export const ExploreSportsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#121417] py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Explore Top Sports</h2>
            <p className="text-gray-400 text-sm mt-1">Choose your favorite sport and book the best venues near you.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/pricing')}
            className="text-[#a8ff00] hover:underline text-xs font-semibold flex items-center gap-1 uppercase tracking-wider"
          >
            View all sports <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
          </button>
        </div>

        {/* Cards Grid */}
        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {sports.map((sport, index) => (
              <button
                type="button"
                key={index}
                onClick={() => navigate(`/pricing?sport=${encodeURIComponent(sport.name)}`)}
                className="bg-[#181b20] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-[#a8ff00]/40 transition duration-300 cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300">
                  <FontAwesomeIcon icon={sport.icon} className="text-2xl text-white group-hover:text-[#a8ff00] transition duration-300" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">{sport.name}</h3>
                <span className="text-xs font-medium text-[#a8ff00]">{sport.count}</span>
              </button>
            ))}
          </div>

          {/* Next Button Arrow */}
          <button
            type="button"
            onClick={() => navigate('/pricing')}
            className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white text-black rounded-full items-center justify-center shadow-lg hover:bg-gray-200 transition"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
          </button>
        </div>

      </div>
    </section>
  );
};
