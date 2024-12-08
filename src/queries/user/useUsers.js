import { useQuery } from '@tanstack/react-query';
import usersApi from './../../api/users';

export function useUsers(role) {
  return useQuery({
    queryKey: ['users', role || 'all'],
    queryFn: async () => {
      const { data } = await usersApi.getUsers(role || undefined);
      return data;
    },
  });
}
