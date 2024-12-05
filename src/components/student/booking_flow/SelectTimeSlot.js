import React, { useState } from 'react';
import { format, isSameDay } from 'date-fns';
import { Globe } from 'lucide-react';
import DateSelector from './DateSelector';
import TimeSlotList from './TimeSlotList';

export default function SelectTimeSlot({ availableSlots, selectedDate, onSlotSelect, onDateChange }) {
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Filter slots for the selected date
  const slotsForSelectedDate = availableSlots.filter((slot) =>
    isSameDay(new Date(slot.start_time), selectedDate)
  );

  const handleDateSelect = (date) => {
    setSelectedSlot(null); // Reset selected slot on date change
    onDateChange(date); // Notify parent of the date change
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot); // Update selected slot
    onSlotSelect(slot); // Notify parent of slot selection
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <DateSelector
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
          </div>

          <div>
            <div className="mt-6 flex items-center text-sm text-gray-500">
              <Globe className="w-4 h-4 mr-2" />
              <span>Times shown in your timezone</span>
            </div>

            <TimeSlotList
              slots={slotsForSelectedDate}
              selectedSlot={selectedSlot}
              onSlotSelect={handleSlotSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
