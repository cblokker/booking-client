import React from 'react';
import { Clock } from 'lucide-react';
import { formatTime, convertToUserTimezone } from '../../../utils/dateUtils';

export default function TimeSlotList({ slots, onSlotSelect, selectedTimeSlot }) {
  // slots for today
  if (!slots || slots.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No available time slots for this date. Please select a different date.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {slots.map((slot) => {
        const isSelected = selectedTimeSlot?.id === slot.id;
        const startTime = convertToUserTimezone(slot.start_time);
        const endTime = convertToUserTimezone(slot.end_time);

        return (
          <button
            key={slot.id}
            onClick={() => onSlotSelect(slot)}
            className={`flex items-center w-full p-3 rounded-lg border transition-colors ${
              isSelected
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-200 text-gray-700'
            }`}
          >
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            <span>
              {formatTime(startTime)} - {formatTime(endTime)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
