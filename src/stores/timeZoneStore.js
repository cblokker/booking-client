import { create } from 'zustand';
import { getUserTimeZone } from '../utils/dateTime';

export const useTimeZoneStore = create((set) => ({
  timeZone: getUserTimeZone(),
  setTimeZone: (timeZone) => set({ timeZone }),
}));
