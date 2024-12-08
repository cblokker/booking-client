import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import availabilityWindowsApi from '../../api/availability';
import { processScheduleData, formatScheduleForApi } from './../../utils/scheduleApiAdaptor';

export function useScheduleQuery(coachId) {
  return useQuery({
    queryKey: ['schedule', coachId],
    queryFn: async () => {
      const { data }= await availabilityWindowsApi.getAvailabilityWindows(coachId);
      return processScheduleData(data);
    },
    onError: (error) => {
      console.error('Error fetching schedule:', error);
    },
    enabled: !!coachId,
  });
}

export function useUpdateScheduleMutation(coachId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (schedule) => {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const formattedData = formatScheduleForApi(schedule);

      return await availabilityWindowsApi.bulkUpdateAvailabilityWindows(
        coachId,
        formattedData,
        timezone
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule', coachId] });
    },
  });
}
