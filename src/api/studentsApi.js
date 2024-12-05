import client from './client'; // Axios instance or fetch wrapper

const studentsApi = {
  // Fetch all bookings for a student
  getBookings: (studentId) => {
    return client.get(`/students/${studentId}/bookings`);
  },

  // Create a new booking for a student
  createBooking: (studentId, bookingData) => {
    return client.post(`/students/${studentId}/bookings`, bookingData);
  },

  // Mark a booking as complete for a student
  completeBooking: (studentId, bookingData) => {
    return client.put(`/students/${studentId}/bookings/complete`, bookingData);
  },
};

export default studentsApi;
