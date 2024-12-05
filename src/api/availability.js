import client from './client';

const availabilityWindowsApi = {
  getAvailabilityWindows: (coachId) => {
    return client.get(`/coaches/${coachId}/availability_windows`);
  },

  bulkUpdateAvailabilityWindows: (coachId, availabilityWindows) => {
    return client.put(`/coaches/${coachId}/availability_windows/bulk_update`, {
      availability_windows: availabilityWindows
    });
  },
};

export default availabilityWindowsApi;
