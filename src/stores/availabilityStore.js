// import create from 'zustand';
// import { apiClient } from '../apiClient';
// import { useUserStore } from './userStore'; // Import the user store

// export const useAvailabilityStore = create((set, get) => ({
//   availability: [],
//   bookingTypes: [],

//   fetchBookingTypes: async () => {
//     const { currentUser } = useUserStore.getState();
//     if (currentUser?.role !== 'coach') return;

//     try {
//       const { bookingTypes } = await apiClient.getBookingTypes(currentUser.id);

//       set(bookingTypes);
//     } catch (error) {
//       console.error('Error fetching booking types:', error.message);
//     }
//   },

//   fetchAvailability: async () => {
//     const { currentUser } = useUserStore.getState();
//     if (currentUser?.role !== 'coach') return;

//     try {
//       const data = await apiClient.getAvailability(currentUser.id);
  
//       set((state) => ({
//         availability: state.initializeAvailability(data),
//       }));
//     } catch (error) {
//       console.error('Error fetching availability:', error.message);
//     }
//   },

//   initializeAvailability: (data) =>
//     daysOfWeek.map((day) => {
//       const dayData = data.find((item) => item.day_of_week === day.value) || {};

//       return {
//         ...day,
//         intervals: (dayData.intervals || []).map((interval) => ({
//           start: format(parse(interval.start_time, 'HH:mm', new Date()), 'h:mm a'),
//           slots: interval.slots || 1,
//         })),
//       };
//     }),

//   updateAvailability: async (formattedData) => {
//     const { currentUser } = useUserStore.getState();
//     if (currentUser?.role !== 'coach') return;

//     try {
//       await apiClient.updateAvailability(currentUser.id, formattedData);
//       alert('Availability updated successfully!');
//     } catch (error) {
//       alert(`Failed to update: ${error.message}`);
//     }
//   },
// }));