import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Student Satisfaction
      </label>
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className={`p-2 rounded-full transition-colors ${
              rating >= value 
                ? 'text-yellow-400 hover:text-yellow-500' 
                : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            <Star className="w-6 h-6" fill={rating >= value ? 'currentColor' : 'none'} />
          </button>
        ))}
      </div>
    </div>
  );
}
