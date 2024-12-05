import client from './client'; // Axios instance or fetch wrapper

const coachesApi = {
  getAvailabilitySlots: (coachId) => {
    return client.get(`/coaches/${coachId}/availability_slots`);
  },

  getBookings: (coachId) => {
    return client.get(`/coaches/${coachId}/bookings`);
  },

  getAvailabilityWindows: (coachId) => {
    return client.get(`/coaches/${coachId}/availability_windows`);
  },

  bulkUpdateAvailabilityWindows: (coachId, availabilityData) => {
    return client.put(`/coaches/${coachId}/availability_windows/bulk_update`, availabilityData);
  },
};

export default coachesApi;
