import React, { useEffect, useState } from 'react';
import { useUserStore } from '../../stores/userStore';
import usersApi from '../../api/users';

export default function Header() {
  const { currentUser, switchUser } = useUserStore();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(currentUser?.id || '');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await usersApi.getUsers();
        setUsers(response.data);

        if (currentUser) {
          setSelectedUserId(currentUser.id);
        }
      } catch (err) {
        console.error('Failed to load users:', err);
      }
    };

    fetchUsers();
  }, [currentUser]);

  const handleUserSwitch = (userId) => {
    setSelectedUserId(userId); // Update the selected user
    switchUser(userId); // Trigger the switchUser action
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed right-0 top-0 left-64">
      <div className="h-full px-6 flex items-center justify-end">
        <select
          value={selectedUserId}
          onChange={(e) => handleUserSwitch(e.target.value)}
          className="border border-gray-300 rounded-md shadow-sm px-3 py-1.5 text-sm"
        >
          <option value="" disabled>
            Select a user
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {`(${user.role}) ${user.first_name} ${user.last_name}`}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
