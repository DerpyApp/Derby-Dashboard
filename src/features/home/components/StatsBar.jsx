import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faFutbol } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

const StadiumCustomIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#a8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10C3 7.5 7 6 12 6C17 6 21 7.5 21 10V15C21 17.5 17 19 12 19C7 19 3 17.5 3 15V10Z" />
    <path d="M3 10C3 12.5 7 14 12 14C17 14 21 12.5 21 10" />
    <path d="M10 19V15H14V19" />
    <path d="M6 6V3L8 4.5L6 6" fill="#a8ff00" />
    <path d="M12 6V3L14 4.5L12 6" fill="#a8ff00" />
    <path d="M18 6V3L20 4.5L18 6" fill="#a8ff00" />
  </svg>
);

const stats = [
  { isCustom: true, icon: <StadiumCustomIcon />, value: '1,500+', label: 'Sports Facilities' },
  { isCustom: false, icon: faUsers, value: '50K+', label: 'Active Players' },
  { isCustom: false, icon: faFutbol, value: '10+', label: 'Sports' },
  { isCustom: false, icon: faStar, value: '4.8', label: 'Average Rating' },
];

export default function StatsBar() {
  return (
    <section className="w-full bg-[#1c1f24] border-y border-[#434933] py-8">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-between">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="flex-shrink-0">
              {stat.isCustom ? (
                stat.icon
              ) : (
                <FontAwesomeIcon icon={stat.icon} className="text-3xl text-[#a8ff00]" />
              )}
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-black text-white tracking-tight leading-none mb-1">
                {stat.value}
              </span>
              <span className="text-xs font-medium text-gray-400 leading-none">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}