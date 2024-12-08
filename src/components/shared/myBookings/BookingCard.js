import React from 'react';
import BookingTime from './BookingTime';
import BookingActions from './BookingActions';
import UserDetails from './UserDetails';
import BookingNotes from './BookingNotes';

export default function BookingCard({ booking, currentUser, onStartCall }) {
  const isBooked = booking.status === 'booked';
  const isCoachView = currentUser.role === 'coach';

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <BookingTime startTime={booking.start_time} endTime={booking.end_time} />
          <UserDetails booking={booking} isCoachView={isCoachView} />
        </div>

        <div className="flex flex-col items-end space-y-2">
          <BookingActions
            status={booking.status}
            isBooked={isBooked}
            isCoachView={isCoachView}
            onStartCall={onStartCall}
          />
        </div>
      </div>

      <BookingNotes notes={booking.notes} />
    </div>
  );
}
