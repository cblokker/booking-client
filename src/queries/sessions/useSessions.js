import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import sessionsApi from './../../api/sessions';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const { data } = await sessionsApi.getCurrentUser();
      return data;
    },
  });
}

export function useSwitchUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      const { data } = await sessionsApi.switchUser(userId);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data);
    },
  });
}
