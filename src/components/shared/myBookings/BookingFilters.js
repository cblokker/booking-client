import React from 'react';

export default function BookingFilters({ activeFilter, onFilterChange }) {
  const filters = ['upcoming', 'missed', 'completed'];

  return (
    <div className="flex space-x-4">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-4 py-2 rounded ${
            activeFilter === filter
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
          onClick={() => onFilterChange(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}
