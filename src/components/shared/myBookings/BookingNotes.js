import React from 'react';

export default function BookingNotes({ notes }) {
  if (!notes) return null;

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h4 className="text-sm font-semibold text-gray-800">Notes</h4>
      <p className="text-sm text-gray-600">{notes}</p>
    </div>
  );
}
