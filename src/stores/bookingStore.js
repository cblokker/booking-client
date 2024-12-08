import { create } from 'zustand';
import dayjs from 'dayjs';

const MEETING_TYPES = [
  {
    id: '2',
    name: 'Deep Dive Session',
    durationMinutes: 120,
    color: '#10B981',
  },
];

// TODO: Probably want use "slices" pattern https://zustand.docs.pmnd.rs/guides/slices-pattern
const initialState = {
  // Step Management
  currentStep: 'coach',

  // Coach Selection
  selectedCoachId: null,
  selectedCoach: null,
  searchQuery: '',

  // Meeting Type Selection
  meetingTypes: MEETING_TYPES,
  selectedMeetingTypeId: null,

  // Time Slot Selection
  selectedTimeSlot: null,
  selectedDate: dayjs().format('YYYY-MM-DD'),

  // Status
  error: null,
  bookingError: null,
};

export const useBookingStore = create((set) => ({
  ...initialState,

  // Step Management
  setStep: (step) => set({ currentStep: step }),

  // Coach Selection
  selectCoach: (coachId) => set({ selectedCoachId: coachId }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Meeting Type Selection
  selectMeetingType: (typeId) => set({ selectedMeetingTypeId: typeId }),

  // Time Slot Selection
  selectTimeSlot: (slot) => {
    set({ selectedTimeSlot: slot })
  },
  setDate: (date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    set({ selectedDate: formattedDate });
  },

  // Reset state to start over
  reset: async () => {
    set(initialState);
  },
}));
