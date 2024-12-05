import React from 'react';

export default function TimeGrid({ slots, selectedDate, onSlotSelect }) {
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const filteredSlots = slots.filter(slot => 
    isSameDay(slot.startTime, selectedDate)
  );

  if (filteredSlots.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No available time slots for this date.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {filteredSlots.map((slot, index) => (
        <button
          key={index}
          onClick={() => onSlotSelect(slot)}
          className="p-3 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <time dateTime={slot.startTime.toISOString()} className="font-medium text-blue-900">
            {slot.startTime.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
          </time>
        </button>
      ))}
    </div>
  );
}
