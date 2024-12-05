import { create } from 'zustand';
import sessionsApi from '../api/sessions';

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,

  initializeCurrentUser: async () => {
    try {
      const { data } = await sessionsApi.getCurrentUser();
      set({ currentUser: data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      set({ currentUser: null, isLoading: false });
    }
  },

  switchUser: async (userId) => {
    try {
      const { data } = await sessionsApi.switchUser(userId);
      set({ currentUser: data, isLoading: false });
    } catch (err) {
      console.error('Failed to switch user:', err);
      set({ currentUser: null, isLoading: false });
    }
  },
}));


// export const useUserStore = create((set) => ({
//   currentUser: null,
//   isLoading: true, // Add a loading state

//   initializeCurrentUser: async () => {
//     try {
//       const { data } = await sessionsApi.getCurrentUser();
//       set({ currentUser: data, isLoading: false });
//     } catch (error) {
//       console.error('Failed to fetch current user:', error);
//       set({ currentUser: null, isLoading: false });
//     }
//   },