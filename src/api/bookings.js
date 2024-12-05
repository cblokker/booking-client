import client from './client';

const bookingsApi = {
  getBookings: (params = {}) => {
    return client.get('/bookings', { params });
  },

  createBooking: (availabilitySlotId) => {
    return client.post('/bookings', {
      availability_slot_id: availabilitySlotId,
    });
  },

  completeBooking: (bookingId, bookingData) => {
    return client.put(`/bookings/${bookingId}/complete`, {
      booking: bookingData,
    });
  },
};

export default bookingsApi;
