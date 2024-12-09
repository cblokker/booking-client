// import axios from 'axios';
// axios.defaults.withCredentials = true;

// const apiUrl = process.env.REACT_APP_BOOKING_API_URL;
// const apiVersion = process.env.REACT_APP_BOOKING_API_VERSION;

// console.log({ apiUrl, apiVersion });

// const client = axios.create({
//   baseURL: `${apiUrl}/api/${apiVersion}`,
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// });

// client.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error(
//       `API Error: ${error.response?.status} - ${
//         error.response?.data?.message || error.message
//       }`
//     );
//     return Promise.reject(error);
//   }
// );

// export default client;

import axios from 'axios';

axios.defaults.withCredentials = true;

const getClient = () => {
  const apiUrl = process.env.REACT_APP_BOOKING_API_URL;
  const apiVersion = process.env.REACT_APP_BOOKING_API_VERSION;

  if (!apiUrl || !apiVersion) {
    console.error('Environment variables are missing or not loaded:', { apiUrl, apiVersion });
  }

  return axios.create({
    baseURL: `${apiUrl}/api/${apiVersion}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};

export default getClient;