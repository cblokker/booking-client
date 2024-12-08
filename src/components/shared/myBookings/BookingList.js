import React, { useState } from 'react';
import { useCompleteBookingMutation } from './../../../queries/booking/useBookings';
import BookingCard from './BookingCard';
import CompleteCallModal from './CompleteCallModal';

export default function BookingList({ bookings, currentUser }) {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const completeBookingMutation = useCompleteBookingMutation();

  const handleCompleteCall = async (satisfaction_score, notes) => {
    if (!selectedBooking) return;

    completeBookingMutation.mutate({
      timeSlotId: selectedBooking.id,
      bookingData: { satisfaction_score, notes }
    },
    {
      onSuccess: () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
      },
      onError: () => {
        alert('Failed to complete booking. Please try again.');
      }
    });
  };

  return (
    <div>
      <div className="grid gap-6">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            currentUser={currentUser}
            onStartCall={() => {
              setSelectedBooking(booking);
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>

      <CompleteCallModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBooking(null);
        }}
        onSubmit={handleCompleteCall}
      />
    </div>
  );
}
