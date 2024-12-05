import React from 'react';
import DayScheduleCard from './DayScheduleCard';

const DAYS = [
  { id: 0, name: 'SUN' },
  { id: 1, name: 'MON' },
  { id: 2, name: 'TUE' },
  { id: 3, name: 'WED' },
  { id: 4, name: 'THU' },
  { id: 5, name: 'FRI' },
  { id: 6, name: 'SAT' },
];

export default function WeeklySchedule({
  schedule,
  errors,
  onToggleDay,
  onUpdateWindow,
  onAddWindow,
  onRemoveWindow,
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {DAYS.map((day) => (
          <DayScheduleCard
            key={day.id}
            dayId={day.id}
            dayName={day.name}
            schedule={schedule[day.id]}
            error={errors[day.id]}
            onToggleDay={onToggleDay}
            onUpdateWindow={onUpdateWindow}
            onAddWindow={onAddWindow}
            onRemoveWindow={onRemoveWindow}
          />
        ))}
      </div>

    </div>
  );
}
