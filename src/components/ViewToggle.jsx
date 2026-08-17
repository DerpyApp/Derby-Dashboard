import { useState } from 'react';

export default function ViewToggle({ onViewChange }) {
  const [view, setView] = useState('grid');

  const handleViewChange = (newView) => {
    setView(newView);
    onViewChange(newView);
  };

  return (
    <div className="inline-flex bg-slate-800 rounded-full p-1 gap-1">
      <button
        onClick={() => handleViewChange('grid')}
        className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
          view === 'grid'
            ? 'bg-slate-900 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        ⊞ Grid
      </button>
      <button
        onClick={() => handleViewChange('map')}
        className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
          view === 'map'
            ? 'bg-slate-900 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        ◱ Map
      </button>
    </div>
  );
}
