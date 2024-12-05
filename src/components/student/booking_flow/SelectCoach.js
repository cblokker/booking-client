import React, { useState, useRef, useEffect } from 'react';
import { Users, Search } from 'lucide-react';

export default function CoachSelector({ coaches, selectedCoach, onSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedCoachData = coaches.find(coach => coach.id === selectedCoach);

  const filteredCoaches = coaches.filter(coach =>
    coach.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coach.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCoachSelect = (coach) => {
    onSelect(coach.id);
    setSearchQuery(coach.first_name);
    setIsDropdownOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-gray-500" />
        <h3 className="text-lg font-medium text-gray-900">Select a Coach</h3>
      </div>

      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            placeholder="Search coaches by name or specialty..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
            {filteredCoaches.length > 0 ? (
              filteredCoaches.map((coach) => (
                <button
                  key={coach.id}
                  onClick={() => handleCoachSelect(coach)}
                  className={`w-full flex items-center p-3 hover:bg-gray-50 transition-colors ${
                    selectedCoach === coach.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <img
                    src={coach.image_url}
                    alt={coach.first_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="ml-3 text-left">
                    <p className="font-medium text-gray-900">{`${coach.first_name} ${coach.last_name}`}</p>
                    <p className="text-sm text-gray-500">{coach.title}</p>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No coaches found matching your search.
              </div>
            )}
          </div>
        )}
      </div>

      {selectedCoachData && !isDropdownOpen && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <img
              src={selectedCoachData.image_url}
              alt={selectedCoachData.first_name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-3">
              <p className="font-medium text-gray-900">{`${selectedCoachData.first_name} ${selectedCoachData.last_name}`}</p>
              <p className="text-sm text-gray-500">{selectedCoachData.title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
