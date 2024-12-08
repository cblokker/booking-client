import React from 'react';
import { useCurrentUser, useSwitchUser } from './../../queries/sessions/useSessions';
import { useUsers } from './../../queries/user/useUsers';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export default function Header() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: currentUser, isLoading: isCurrentUserLoading } = useCurrentUser();
  const { data: users, isLoading: isUsersLoading } = useUsers();
  const { mutate: switchUser, isLoading: isSwitching } = useSwitchUser();

  const handleUserSwitch = (userId) => {
    switchUser(userId, {
      onSuccess: async () => {
        await queryClient.invalidateQueries();
        queryClient.resetQueries();
        navigate('/my-calls');
      },
    });
  };

  if (isCurrentUserLoading || isUsersLoading) {
    return null; // <LoadingState />
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed right-0 top-0 left-64">
      <div className="h-full px-6 flex items-center justify-end">
        <select
          value={currentUser?.id || ''}
          onChange={(e) => handleUserSwitch(e.target.value)}
          className="border border-gray-300 rounded-md shadow-sm px-3 py-1.5 text-sm"
          disabled={isSwitching}
        >
          <option value="" disabled>Select a user</option>
          {users?.map((user) => (
            <option key={user.id} value={user.id}>
              {`(${user.role}) ${user.first_name} ${user.last_name}`}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
