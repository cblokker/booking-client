import { parse, addMinutes, isWithinInterval, areIntervalsOverlapping } from 'date-fns';
const MEETING_TYPES = [
  { id: 1, name: '2 hour session', durrationMinutes: 120 }
];

export function getWindowInterval(window) {
  const start = parse(window.start, 'HH:mm', new Date());
  const meetingType = MEETING_TYPES.find(type => type.id === window.meetingTypeId);
  const slotDuration = meetingType ? meetingType.durationMinutes : 120; // Default to 2 hours
  const end = addMinutes(start, window.slots * slotDuration);
  return { start, end };
}

// must be better way to do this!
export function checkOverlap(windows) {
  if (windows.length < 2) {
    return { hasOverlap: false, message: '', overlappingPairs: [] };
  }

  const overlappingPairs = [];

  for (let i = 0; i < windows.length; i++) {
    const currentInterval = getWindowInterval(windows[i]);
    
    for (let j = i + 1; j < windows.length; j++) {
      const compareInterval = getWindowInterval(windows[j]);
      
      if (areIntervalsOverlapping(currentInterval, compareInterval)) {
        overlappingPairs.push([i, j]);
      }
    }
  }

  if (overlappingPairs.length > 0) {
    return {
      hasOverlap: true,
      message: `Time windows overlap. Please adjust the start times or number of slots.`,
      overlappingPairs
    };
  }

  return { hasOverlap: false, message: '', overlappingPairs: [] };
}

export function isWindowOverlapping(windowIndex, overlappingPairs) {
  return overlappingPairs.some(pair => pair.includes(windowIndex));
}