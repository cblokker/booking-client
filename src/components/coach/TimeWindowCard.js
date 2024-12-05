import React from 'react';
import { Clock, Plus, Minus, X, AlertCircle } from 'lucide-react';
import { generateTimeSlots } from '../../utils/timeSlots';
// import { generateTimeSlots } from '../../utils/timeUtils';
import { addMinutes, parse, format } from 'date-fns';

const MAX_SLOTS = 8;
const MIN_SLOTS = 1;
const SLOT_DURATION = 2; // TODO: This needs to be global across entire app.

export default function TimeWindowCard({
  window,
  windowIndex,
  dayId,
  isOverlapping,
  onUpdate,
  onRemove,
}) {
  const handleSlotChange = (increment) => {
    const newSlots = increment 
      ? Math.min(window.slots + 1, MAX_SLOTS)
      : Math.max(window.slots - 1, MIN_SLOTS);

    const startTime = parse(window.start, 'HH:mm', new Date());
    const totalDuration = newSlots * SLOT_DURATION * 60;
    const newEndTime = addMinutes(startTime, totalDuration);
    const newEnd = format(newEndTime, 'HH:mm');

    onUpdate(dayId, windowIndex, { slots: newSlots, end: newEnd });
  };

  const timeSlots = generateTimeSlots(window.start, window.slots, window.meetingTypeId);

  return (
    <div className={`relative p-4 rounded-lg ${isOverlapping ? 'bg-red-50' : 'bg-gray-50'} border ${
      isOverlapping ? 'border-red-200' : 'border-gray-200'
    }`}>
      {/* REMOVE SLOT */}
      <button
        onClick={() => onRemove(dayId, windowIndex)}
        className="absolute top-2 right-2 p-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-full transition-colors"
      >
        <X className="h-4 w-4 text-gray-500" />
      </button>

 
      <div className="flex items-center gap-4">
  
        {/* MEETING TYPE INPUT - maybe make static for now */}
        <div className="w-[180px]">
          <select
            disabled={true}
            className={`w-full border rounded-md shadow-sm py-2 pl-3 pr-10 text-sm ${
              isOverlapping ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">2-hour session</option>
          </select>
        </div>

        {/* START TIME INPUT */}
        <div className="w-[140px]">
          {/* <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label> */}
          <div className="relative">
            <input
              type="time"
              value={window.start}
              onChange={(e) => onUpdate(dayId, windowIndex, { start: e.target.value })}
              className={`pl-8 pr-3 py-2 w-full border rounded-md shadow-sm text-sm ${
                isOverlapping ? 'border-red-300' : 'border-gray-300'
              }`}
            />
          </div>
        </div>

        {/* SLOT +/+ */}
        <div>
          {/* <label className="block text-sm font-medium text-gray-700 mb-1">Slots</label> */}
          <div className={`flex h-[38px] items-center border rounded-md bg-white ${
            isOverlapping ? 'border-red-300' : 'border-gray-300'
          }`}>
            <button
              onClick={() => handleSlotChange(false)}
              disabled={window.slots <= MIN_SLOTS}
              className="h-full px-3 text-gray-600 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="h-full w-8 flex items-center justify-center text-sm font-medium border-x border-gray-300">
              {window.slots}
            </span>
            <button
              onClick={() => handleSlotChange(true)}
              disabled={window.slots >= MAX_SLOTS}
              className="h-full px-3 text-gray-600 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* DYNAMIC TIME SLOT LIST */}
      <div className="mt-3">
        <div className="flex flex-wrap gap-2">
          {timeSlots.map((slot, index) => (
            <div
              key={index}
              className={`px-3 py-1 rounded-md text-sm ${
                isOverlapping ? 'bg-red-100 text-red-800' : 'bg-blue-50 text-blue-700'
              }`}
            >
              {slot.start} - {slot.end}
            </div>
          ))}
        </div>
      </div>

      {/* OVERLAPPING ERROR */}
      {isOverlapping && (
        <div className="mt-3 flex items-start space-x-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <p>This time window overlaps with another window.</p>
        </div>
      )}
    </div>
  );
}