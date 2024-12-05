import React from 'react';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { Clock } from 'lucide-react';

export default function TimeSlotList({ slots, selectedSlot, onSlotSelect }) {
  // Get the user's current time zone
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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
        // Convert slot times to the user's time zone
        const startTimeInUserTimeZone = toZonedTime(new Date(slot.start_time), userTimeZone);
        const endTimeInUserTimeZone = toZonedTime(new Date(slot.end_time), userTimeZone);
        const isSelected = selectedSlot?.start_time === slot.start_time;

        // debugger;

        return (
          <button
            key={slot.start_time}
            onClick={() => onSlotSelect(slot)}
            className={`flex items-center p-3 rounded-lg border transition-colors ${
              isSelected
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-200 text-gray-700'
            }`}
          >
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            {new Date(slot.start_time).toISOString().substring(11, 16)} - {new Date(slot.end_time).toISOString().substring(11, 16)}
          </button>
        );
      })}
    </div>
  );
}
