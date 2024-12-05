import { create } from 'zustand';
import { calculateEndTime } from '../utils/timeUtils';

const INITIAL_SCHEDULE = Array.from({ length: 7 }, () => ({
  enabled: false,
  windows: [],
}));

export const useScheduleStore = create((set) => ({
  schedule: INITIAL_SCHEDULE,
  errors: {},

  setSchedule: (newSchedule) => set(() => ({ schedule: newSchedule })),
}));





// toggleDay: (dayId) => set((state) => ({
//   schedule: state.schedule.map((day, index) =>
//     index === dayId ? { ...day, enabled: !day.enabled } : day
//   ),
// })),

// updateWindow: (dayId, windowIndex, updates) => set((state) => ({
//   schedule: state.schedule.map((day, index) =>
//     index === dayId
//       ? {
//           ...day,
//           windows: day.windows.map((window, idx) =>
//             idx === windowIndex ? { ...window, ...updates } : window
//           ),
//         }
//       : day
//   ),
// })),

// addWindow: (dayId) => set((state) => {util
//   const day = state.schedule[dayId];
//   const lastWindow = day.windows[day.windows.length - 1] || { end: '08:00' };
//   const nextStartTime = lastWindow.end;
//   const slots = 1; // Default slots
//   const meetingDuration = 120; // Default meeting duration in minutes
//   const end = calculateEndTime(nextStartTime, slots, meetingDuration);

//   return {
//     schedule: state.schedule.map((d, index) =>
//       index === dayId
//         ? {
//             ...d,
//             windows: [
//               ...d.windows,
//               { start: nextStartTime, end, slots, meetingTypeId: 1 },
//             ],
//           }
//         : d
//     ),
//   };
// }),

// removeWindow: (dayId, windowIndex) => set((state) => ({
//   schedule: state.schedule.map((day, index) =>
//     index === dayId
//       ? { ...day, windows: day.windows.filter((_, idx) => idx !== windowIndex) }
//       : day
//   ),
// })),

// setErrors: (newErrors) => set(() => ({ errors: newErrors })),