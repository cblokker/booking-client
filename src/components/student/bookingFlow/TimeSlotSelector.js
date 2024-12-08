import React from 'react';
import { Globe } from 'lucide-react';
import DateSelector from './DateSelector';
import TimeSlotList from './TimeSlotList';
import { useBookingStore } from '../../../stores/bookingStore';
import { useAvailableSlotsQuery } from '../../../queries/booking/useTimeSlots';


export default function TimeSlotSelector() {
  const {
    selectedCoachId,
    selectTimeSlot,
    selectedDate,
    setDate,
    selectedTimeSlot,
  } = useBookingStore();

  const { data: availableSlots, error, status } = useAvailableSlotsQuery(selectedCoachId, selectedDate);
  console.log({ availableSlots, error, status });
  console.log({ selectedCoachId, selectedDate });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <DateSelector
            selectedDate={selectedDate}
            setDate={setDate}
          />
        </div>
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Globe className="w-4 h-4 mr-2" />
            <span>Times shown in your timezone</span>
          </div>
          <TimeSlotList
            slots={availableSlots}
            onSlotSelect={selectTimeSlot}
            selectedTimeSlot={selectedTimeSlot}
          />
        </div>
      </div>
    </div>
  );
}

