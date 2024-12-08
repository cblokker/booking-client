import { useQuery } from '@tanstack/react-query';
import availabilitySlotsApi from './../../api/availabilitySlotsApi';

export function useAvailableSlotsQuery(coachId, date) {
  return useQuery({
    queryKey: ['timeSlots', coachId, date],
    queryFn: async () => {
      if (!coachId || !date) return [];
      const { data } = await availabilitySlotsApi.getAvailabilitySlots(coachId, date);
      return data;
    },
    enabled: !!coachId && !!date
  });
}
