import React, { useState } from 'react';
import { useCurrentUser } from './../../../queries/sessions/useSessions';
import { useBookingsQuery } from './../../../queries/booking/useBookings';
import BookingList from './BookingList';
import BookingFilters from './BookingFilters';

export default function MyBookings() {
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();
  const [state, setState] = useState('upcoming');
  const { data: bookings = [], isLoading: isBookingsLoading } = useBookingsQuery(state);

  if (isUserLoading || isBookingsLoading) {
    return; // TODO: Add <LoadingState /> - would be nice to have skeleton loading
  }

  if (!currentUser) {
    return; // <AuthCheck />
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Calls</h1>
      <BookingFilters activeFilter={state} onFilterChange={setState} />
      <BookingList bookings={bookings} currentUser={currentUser} />
    </div>
  );
}
