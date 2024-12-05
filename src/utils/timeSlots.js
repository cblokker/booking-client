import { parse, format, addMinutes } from 'date-fns';
// import { MEETING_TYPES } from '../data/meetingTypes';
// TODO: Hook up to API
const MEETING_TYPES = [
  { id: 1, name: '2 hour session', durationMinutes: 120 }
];

export function generateTimeSlots(startTime, slots, meetingTypeId) {
  const timeSlots = [];

  const start = parse(startTime, 'HH:mm', new Date());

  const meetingType = MEETING_TYPES.find(type => type.id === meetingTypeId);
  const slotDuration = meetingType ? meetingType.durationMinutes : 120;

  for (let i = 0; i < slots; i++) {
    const slotStart = addMinutes(start, i * slotDuration);
    const slotEnd = addMinutes(slotStart, slotDuration);
    
    timeSlots.push({
      start: format(slotStart, 'h:mm a'),
      end: format(slotEnd, 'h:mm a'),
    });
  }

  return timeSlots;
}

export function getWindowEndTime(window) {
  const start = parse(window.start, 'HH:mm', new Date());
  const meetingType = MEETING_TYPES.find(type => type.id === window.meetingTypeId);
  const slotDuration = meetingType ? meetingType.durationMinutes : 120; // Default to 2 hours
  const totalDuration = slotDuration * window.slots;
  const end = addMinutes(start, totalDuration);
  return format(end, 'HH:mm');
}
