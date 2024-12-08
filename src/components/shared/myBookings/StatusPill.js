import React from 'react';

export default function StatusPill({ status }) {
  const statusStyles = {
    booked: 'bg-blue-100 text-blue-800',
    started: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    canceled: 'bg-red-100 text-red-800',
    rescheduled: 'bg-purple-100 text-purple-800',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusStyles[status]
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
