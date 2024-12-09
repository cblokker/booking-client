import getClient from './client';

const client = getClient();

const usersApi = {
  getUsers: (role = null) => {
    const params = role ? { role } : {};
    return client.get('/users', { params });
  },

  getUserById: (id) => client.get(`/users/${id}`),
};

export default usersApi;
