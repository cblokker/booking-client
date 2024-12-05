import client from './client';

const availabilitySlotsApi = {
  /**
   * Fetch availability slots for a given coach and date.
   * 
   * @param {number|string} coachId - The ID of the coach.
   * @param {string} date - The date in YYYY-MM-DD format.
   * @returns {Promise} - A promise resolving to the fetched availability slots.
   */
  getAvailabilitySlots: (coachId, date) => {
    const params = date ? { date } : {};
    return client.get(`/coaches/${coachId}/availability_slots`, { params });
  },
};

export default availabilitySlotsApi;
