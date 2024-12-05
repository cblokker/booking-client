import client from './client';

const sessionsApi = {
  getCurrentUser: () => client.get('/show_current_user'),

  switchUser: (userId) => 
    client.post('/switch_user', { user_id: userId }, { withCredentials: true }),
};

export default sessionsApi;
