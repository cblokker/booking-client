import client from './client';

const availabilityWindowsApi = {
  // For current_user in rails session
  getAvailabilityWindows: (coachId) => {
    return client.get(`/availability_windows`);
  },

  // For current_user in rails session
  bulkUpdateAvailabilityWindows: (coachId, availabilityWindows, timezone) => {
    return client.put(`/availability_windows/bulk_update`, {
      availability_windows: availabilityWindows,
      timezone: timezone
    });
  },
};

export default availabilityWindowsApi;
