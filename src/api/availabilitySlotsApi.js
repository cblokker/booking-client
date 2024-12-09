import getClient from './client';

const client = getClient();

const availabilitySlotsApi = {
  // TODO: Be able to get ranges w/ paginagion
  getAvailabilitySlots: (coachId, date) => {
    const params = date ? { date } : {};
    return client.get(`/coaches/${coachId}/availability_slots`, { params });
  },
};

export default availabilitySlotsApi;
