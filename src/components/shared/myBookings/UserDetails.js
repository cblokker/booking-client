import React from 'react';
import { User, Phone } from 'lucide-react';

export default function UserDetails({ booking, isCoachView }) {
  const user = isCoachView ? booking.student : booking.coach;

  if (!user) return null;

  return (
    <>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <User className="w-4 h-4" />
        <span>
          {user.first_name} {user.last_name}
        </span>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Phone className="w-4 h-4" />
        <span>{user.phone_number}</span>
      </div>
    </>
  );
}
