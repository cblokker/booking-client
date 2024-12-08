import React from 'react';
import { Plus } from 'lucide-react';
import TimeWindowCard from './TimeWindowCard';
import { useScheduleStore } from '../../stores/scheduleStore';

export default function DayScheduleCard({ dayId, dayName, schedule, error }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4">
        <ToggleDay dayId={dayId} dayName={dayName} schedule={schedule} />
        {schedule.enabled && (
          <TimeWindowList
            dayId={dayId}
            schedule={schedule}
            error={error}
          />
        )}
      </div>
    </div>
  );
}

// Sub components

function ToggleDay({ dayId, dayName, schedule }) {
  const { toggleDay } = useScheduleStore();

  return (
    <div className="flex items-center">
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={schedule.enabled}
          onChange={() => toggleDay(dayId)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="ml-2 text-base font-medium text-gray-900">{dayName}</span>
      </label>
      {!schedule.enabled && (
        <span className="ml-4 text-sm text-gray-500">Unavailable</span>
      )}
    </div>
  );
}

// Sub-component for TimeWindowList
function TimeWindowList({ dayId, schedule, error }) {
  const { addWindow } = useScheduleStore();

  return (
    <div className="mt-4 space-y-3">
      {schedule.windows.map((window, windowIndex) => (
        <TimeWindowCard
          key={windowIndex}
          window={window}
          windowIndex={windowIndex}
          dayId={dayId}
          isOverlapping={error?.overlappingPairs.some((pair) =>
            pair.includes(windowIndex)
          )}
        />
      ))}

      <button
        onClick={() => addWindow(dayId)}
        className="w-full mt-2 flex items-center justify-center px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add time window
      </button>
    </div>
  );
}
