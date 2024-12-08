import { create } from 'zustand';
import { checkOverlap } from '../utils/timeValidation';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import { SCHEDULE_CONSTANTS } from './../constants/schedule';

dayjs.extend(customParseFormat);

const {
  INITIAL_SCHEDULE,
  MAX_SLOTS,
  MIN_SLOTS,
  SLOT_DURATION_MINUTES,
} = SCHEDULE_CONSTANTS;


export const useScheduleStore = create((set, get) => ({
  errors: {},
  localSchedule: INITIAL_SCHEDULE,

  setLocalSchedule: (changes) => {
    if (!changes) {
      console.warn('Attempted to set empty or invalid schedule changes');
      return;
    }
    set({ localSchedule: changes });
  },

  toggleDay: (dayId) => {
    set((state) => ({
      localSchedule: {
        ...state.localSchedule,
        [dayId]: {
          ...state.localSchedule[dayId],
          enabled: !state.localSchedule[dayId].enabled,
        },
      },
    }));

    get().validateSchedule();
  },

  handleStartTimeChange: (dayId, windowIndex, newStartTime) => {
    const { localSchedule } = get();
    const window = localSchedule[dayId].windows[windowIndex];

    const startTime = dayjs(`2024-01-01 ${newStartTime}`);
    const totalDuration = window.slots * SLOT_DURATION_MINUTES;
    const newEndTime = startTime.add(totalDuration, 'minute');
    const newEnd = newEndTime.format('HH:mm');

    get().updateWindow(dayId, windowIndex, { start: newStartTime, end: newEnd });
  },

  handleSlotChange: (dayId, windowIndex, increment) => {
    const { localSchedule } = get();
    const window = localSchedule[dayId].windows[windowIndex];

    const newSlots = increment
      ? Math.min(window.slots + 1, MAX_SLOTS)
      : Math.max(window.slots - 1, MIN_SLOTS);

    // TODO: Move this into a util function
    const startTime = dayjs(`2024-01-01 ${window.start}`);
    const totalDuration = newSlots * SLOT_DURATION_MINUTES;
    const newEndTime = startTime.add(totalDuration, 'minute');
    const newEnd = newEndTime.format('HH:mm');
 
    get().updateWindow(dayId, windowIndex, { slots: newSlots, end: newEnd });
  },

  updateWindow: (dayId, windowIndex, updates) => {
    set((state) => ({
      localSchedule: {
        ...state.localSchedule,
        [dayId]: {
          ...state.localSchedule[dayId],
          windows: state.localSchedule[dayId].windows.map((window, idx) =>
            idx === windowIndex ? { ...window, ...updates } : window
          ),
        },
      },
    }));

    get().validateSchedule();
  },

  addWindow: (dayId) => {
    const { localSchedule } = get();
    const daySchedule = localSchedule[dayId];
  
    if (!daySchedule?.windows?.length) {
      set((state) => ({
        localSchedule: {
          ...state.localSchedule,
          [dayId]: {
            ...state.localSchedule[dayId],
            windows: [{ start: '09:00', end: '11:00', slots: 1 }],
          },
        },
      }));
      return;
    }
  
    const lastWindow = daySchedule.windows[daySchedule.windows.length - 1];
    const endTime = dayjs(`2000-01-01 ${lastWindow.end}`);
    const newStart = endTime.add(60, 'minute').format('HH:mm');
    const newEnd = endTime.add(60 + SLOT_DURATION_MINUTES, 'minute').format('HH:mm');
  
    set((state) => ({
      localSchedule: {
        ...state.localSchedule,
        [dayId]: {
          ...state.localSchedule[dayId],
          windows: [
            ...state.localSchedule[dayId].windows,
            { start: newStart, end: newEnd, slots: 1 }
          ],
        },
      },
    }));
  },

  removeWindow: (dayId, windowIndex) => {
    set((state) => ({
      localSchedule: {
        ...state.localSchedule,
        [dayId]: {
          ...state.localSchedule[dayId],
          windows: state.localSchedule[dayId].windows.filter((_, idx) => idx !== windowIndex),
        },
      },
    }));
    get().validateSchedule();
  },

  validateSchedule: () => {
    const { localSchedule } = get();
    const newErrors = {};

    Object.entries(localSchedule).forEach(([dayId, daySchedule]) => {
      if (daySchedule.enabled && daySchedule.windows.length > 1) {
        const result = checkOverlap(daySchedule.windows);

        if (result.hasOverlap) {
          newErrors[Number(dayId)] = {
            message: result.message,
            overlappingPairs: result.overlappingPairs,
          };
        }
      }
    });

    set({ errors: newErrors });
  },
}));
