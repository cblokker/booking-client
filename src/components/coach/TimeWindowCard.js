import React from 'react';
import { AlertCircle, Minus, Plus, X } from 'lucide-react';
import { generateTimeSlots } from '../../utils/timeSlots';
import { useScheduleStore } from '../../stores/scheduleStore';
import { SCHEDULE_CONSTANTS } from '../../constants/schedule';

export default function TimeWindowCard({ window, windowIndex, dayId, isOverlapping }) {
  const { MAX_SLOTS, MIN_SLOTS } = SCHEDULE_CONSTANTS;
  const { removeWindow, handleSlotChange, handleStartTimeChange } = useScheduleStore();
  const timeSlots = generateTimeSlots(window.start, window.slots, window.meetingTypeId);

  return (
    <div
      className={`relative p-4 rounded-lg ${
        isOverlapping ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
      } border`}
    >
      <RemoveWindowButton onClick={() => removeWindow(dayId, windowIndex)} />

      <div className="flex items-center gap-4">
        <MeetingTypeSelection isOverlapping={isOverlapping} />
        <StartTimeSelection
          isOverlapping={isOverlapping}
          value={window.start}
          onChange={(value) => handleStartTimeChange(dayId, windowIndex, value)}
        />
        <EndTimeSelection
          slots={window.slots}
          isOverlapping={isOverlapping}
          onDecrease={() => handleSlotChange(dayId, windowIndex, false)}
          onIncrease={() => handleSlotChange(dayId, windowIndex, true)}
          canDecrease={window.slots > MIN_SLOTS}
          canIncrease={window.slots < MAX_SLOTS}
        />
      </div>

      <TimeSlotsList timeSlots={timeSlots} isOverlapping={isOverlapping} />

      {isOverlapping && <OverlapError />}
    </div>
  );
}

// Sub components

function RemoveWindowButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 right-2 p-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-full transition-colors"
    >
      <X className="h-4 w-4 text-gray-500" />
    </button>
  );
}

function MeetingTypeSelection({ isOverlapping }) {
  return (
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
  );
}

function StartTimeSelection({ isOverlapping, value, onChange }) {
  return (
    <div className="w-[140px]">
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`pl-8 pr-3 py-2 w-full border rounded-md shadow-sm text-sm ${
          isOverlapping ? 'border-red-300' : 'border-gray-300'
        }`}
      />
    </div>
  );
}

function EndTimeSelection({ slots, isOverlapping, onDecrease, onIncrease, canDecrease, canIncrease }) {
  return (
    <div>
      <div
        className={`flex h-[38px] items-center border rounded-md bg-white ${
          isOverlapping ? 'border-red-300' : 'border-gray-300'
        }`}
      >
        <button
          onClick={onDecrease}
          disabled={!canDecrease}
          className="h-full px-3 text-gray-600 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="h-full w-8 flex items-center justify-center text-sm font-medium border-x border-gray-300">
          {slots}
        </span>
        <button
          onClick={onIncrease}
          disabled={!canIncrease}
          className="h-full px-3 text-gray-600 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function TimeSlotsList({ timeSlots, isOverlapping }) {
  return (
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
  );
}

function OverlapError() {
  return (
    <div className="mt-3 flex items-start space-x-2 text-sm text-red-600">
      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
      <p>This time window overlaps with another window.</p>
    </div>
  );
}
