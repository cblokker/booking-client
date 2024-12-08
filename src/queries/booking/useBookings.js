import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import bookingsApi from './../../api/bookings';


export function useBookingsQuery(state) {
  return useQuery({
    queryKey: ['bookings', state],
    queryFn: async () => {
      const response = await bookingsApi.getBookings({ state });
      return response.data;
    },
    onError: (error) => {
      console.error('Error fetching bookings:', error);
    },
  });
}

export function useCreateBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (timeSlotId) => {
      return await bookingsApi.createBooking(timeSlotId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    }
  });
}

export function useCompleteBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await bookingsApi.completeBooking(data.timeSlotId, data.bookingData) ;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    }
  });
}
