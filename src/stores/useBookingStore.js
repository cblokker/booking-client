import create from 'zustand';
import usersApi from '../api/users';
import availabilitySlotsApi from '../api/availabilitySlotsApi';

const useBookingStore = create((set, get) => ({
  formData: {
    coachId: null,
    meetingTypeId: null,
    timeSlot: null,
  },
  coaches: [],
  availableSlots: [],
  selectedDate: new Date().toISOString().split('T')[0], // Default to today's date
  loading: false,
  slotsLoading: false,
  error: null,

  // Actions
  setCoachId: (coachId) => set((state) => ({
    formData: { ...state.formData, coachId },
    availableSlots: [], // Reset slots when coach changes
  })),
  setMeetingTypeId: (meetingTypeId) => set((state) => ({
    formData: { ...state.formData, meetingTypeId },
  })),
  setTimeSlot: (timeSlot) => set((state) => ({
    formData: { ...state.formData, timeSlot },
  })),
  setSelectedDate: (selectedDate) => set({ selectedDate }),

  fetchCoaches: async () => {
    set({ loading: true });
    try {
      const response = await usersApi.getUsers('coach');
      set({ coaches: response.data });
    } catch (error) {
      console.error('Failed to fetch coaches:', error);
      set({ error: 'Failed to load coaches. Please try again later.' });
    } finally {
      set({ loading: false });
    }
  },

  fetchAvailableSlots: async () => {
    const { formData, selectedDate } = get();
    if (!formData.coachId || !selectedDate) return;

    set({ slotsLoading: true });
    try {
      const response = await availabilitySlotsApi.getAvailabilitySlots(
        formData.coachId,
        selectedDate
      );
      set({ availableSlots: response.data });
    } catch (error) {
      console.error('Failed to fetch available slots:', error);
      set({ availableSlots: [] });
    } finally {
      set({ slotsLoading: false });
    }
  },
}));

export default useBookingStore;
