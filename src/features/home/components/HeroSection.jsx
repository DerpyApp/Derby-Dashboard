import { useNavigate } from 'react-router-dom';
import headerBack from '@/assets/headerBack.jpg';
import headerFront from '@/assets/headerFront.jpg';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-[#121417] text-white pt-12 pb-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column - Content */}
        <div className="space-y-6 max-w-xl">
          <div className="flex items-center gap-2 text-[#a8ff00] text-xs font-semibold uppercase tracking-widest">
            <span>☆ BOOK</span>
            <span>•</span>
            <span>PLAY</span>
            <span>•</span>
            <span>ENJOY</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-black leading-tight tracking-tight">
            One App. <br />
            Every Sport. <br />
            <span className="text-[#a8ff00]">Every Moment.</span>
          </h1>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Book football fields, padel courts and more. Play with friends, join matches, and compete in tournaments.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/pricing')}
              className="bg-[#a8ff00] text-black font-bold px-7 py-3.5 rounded-full hover:bg-[#96e600] transition duration-200 text-sm"
            >
              Book a Court
            </button>
            <button
              type="button"
              onClick={() => navigate('/tournaments')}
              className="border border-gray-700 bg-gray-900/50 text-white font-medium px-7 py-3.5 rounded-full hover:border-gray-500 transition duration-200 text-sm"
            >
              Join a Match
            </button>
          </div>
        </div>

        {/* Right Column - Overlapping Rotated Images */}
        <div className="relative h-[420px] sm:h-[480px] flex items-center justify-center lg:justify-end">
          {/* Container wrapper for relative positioning of floating badge */}
          <div className="relative">
            
            {/* Back Card */}
            <div className="w-[280px] sm:w-[340px] h-[360px] sm:h-[420px] rounded-3xl overflow-hidden border border-gray-800 transform rotate-[8deg] shadow-2xl">
              <img src={headerBack} alt="Padel Court" className="w-full h-full object-cover" />
            </div>

            {/* Front Card */}
            <div className="absolute top-4 -left-10 sm:-left-16 w-[290px] sm:w-[350px] h-[360px] sm:h-[420px] rounded-3xl overflow-hidden border border-[#a8ff00]/30 transform -rotate-[6deg] shadow-2xl z-10">
              <img src={headerFront} alt="Football Match" className="w-full h-full object-cover" />
            </div>

            {/* Floating Badge (Pixel Perfect Matching Image) */}
            <div className="absolute bottom-6 right-6 z-20 bg-[#16181c]/95 border border-white/10 backdrop-blur-md px-5 py-3 rounded-full flex items-center gap-3.5 shadow-2xl">
              {/* Overlapping Avatar Circles with Gradient */}
              <div className="flex -space-x-2.5 items-center">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#d4ff32] to-[#80b300] border-2 border-[#16181c]"></div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2a3038] to-[#111317] border-2 border-[#16181c]"></div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#ccff00] via-[#80b300] to-[#121417] border-2 border-[#16181c]"></div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-white leading-tight tracking-tight">4.8k+</span>
                <span className="text-[11px] font-medium text-gray-400 leading-tight">Active Players</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
