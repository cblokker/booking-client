// TODO: Clean this up
// - match keys btw API & client for clarity
// - ?? flatten windows on a start_date, end_date for api GET & PUT, client can group by day.
// - use dayjs throughout entire codebase for consitency


import { SCHEDULE_CONSTANTS } from './../constants/schedule';
import { parse, differenceInMinutes } from 'date-fns';

const calculateSlots = (start, end, slotDuration) => {
  const startTime = parse(start, 'HH:mm', new Date());
  const endTime = parse(end, 'HH:mm', new Date());
  const durationInMinutes = differenceInMinutes(endTime, startTime);

  return Math.floor(durationInMinutes / (slotDuration * 60));
};


export function processScheduleData(data) {
  // Maybe do this "default state" in component not to muddy the to <-> from data transform
  const {
    DEFAULT_MORNING_WINDOW,
    DEFAULT_AFTERNOON_WINDOW,
    DAYS_MAP_REVERSE
  } = SCHEDULE_CONSTANTS;
  // Default schedule structure for 7 days
  const schedule = Array.from({ length: 7 }, () => ({
    enabled: false,
    windows: [
      { ...DEFAULT_MORNING_WINDOW },
      { ...DEFAULT_AFTERNOON_WINDOW },
    ],
  }));

  if (data) {
    data.forEach(({ id, intervals, day_of_week }) => {
      const dayIndex = DAYS_MAP_REVERSE[day_of_week.toLowerCase()];

      schedule[dayIndex] = {
        id,
        day_of_week,
        enabled: intervals.length > 0,
        windows: intervals.map(({ start_time, end_time }) => ({
          start: start_time,
          end: end_time,
          slots: calculateSlots(start_time, end_time, 2),
          meetingTypeId: '', // Placeholder
        })),
      };
    });
  }

  return schedule.reduce((acc, day, index) => {
    acc[index] = day;
    return acc;
  }, {});
}

export function formatScheduleForApi(schedule) {
  const { DAYS_MAP } = SCHEDULE_CONSTANTS;

  return Object.entries(schedule)
    .map(([dayId, day]) => {
      if (!day.enabled || !day.windows || day.windows.length === 0) return null;

      return {
        id: day.id,
        day_of_week: DAYS_MAP[dayId],
        intervals: day.windows.map((window) => ({
          start_time: window.start,
          end_time: window.end,
        })),
      };
    })
    .filter(Boolean); // Remove null values
}
