import React from 'react';
import DayScheduleCard from './DayScheduleCard';
import { SCHEDULE_CONSTANTS } from '../../constants/schedule';

export default function WeeklySchedule({ schedule, errors }) {
  const { DAYS_MAP } = SCHEDULE_CONSTANTS;

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {Object.entries(DAYS_MAP).map(([id, name]) => (
          <DayScheduleCard
            key={id}
            dayId={id}
            dayName={name}
            schedule={schedule[id]}
            error={errors[id]}
          />
        ))}
      </div>
    </div>
  );
}
