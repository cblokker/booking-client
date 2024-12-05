import axios from 'axios';
axios.defaults.withCredentials = true;

// Create the Axios instance
const client = axios.create({
  baseURL: process.env.REACT_APP_BOOKING_SERVER_BASE_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      `API Error: ${error.response?.status} - ${
        error.response?.data?.message || error.message
      }`
    );
    return Promise.reject(error);
  }
);

export default client;
