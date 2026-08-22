import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faCreditCard, faUserGroup, faTrophy, faTag } from '@fortawesome/free-solid-svg-icons';

const features = [
  { icon: faCalendarCheck, title: 'Easy Booking', desc: 'Book in just a few seconds' },
  { icon: faCreditCard, title: 'Split Payment', desc: 'Split the cost easily with your team' },
  { icon: faUserGroup, title: 'AI Matchmaking', desc: 'Find players that match your level' },
  { icon: faTrophy, title: 'Tournaments', desc: 'Join exciting tournaments' },
  { icon: faTag, title: 'Best Prices', desc: 'Exclusive deals and last-minute offers' },
];

export const WhyUsSection = () => {
  return (
    <section className="w-full bg-[#121417] py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        <div className="bg-[#181b20] border border-white/5 rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-10 tracking-tight">Why Players Love Derby</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {features.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:border-[#a8ff00] group-hover:bg-[#a8ff00]/10 transition duration-300">
                  <FontAwesomeIcon icon={item.icon} className="text-xl text-[#a8ff00]" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                <p className="text-xs text-gray-400 max-w-[160px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};