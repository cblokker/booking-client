import axios from 'axios';
axios.defaults.withCredentials = true;

const apiUrl = process.env.RAILS_APP_API_URL;
const apiVersion = process.env.RAILS_APP_API_VERSION;

const client = axios.create({
  baseURL: `${apiUrl}/api/#{${apiVersion}}` || 'http://localhost:3000/api/v1',
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
