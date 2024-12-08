import React, { useEffect } from 'react';
import { useCurrentUser } from '../../queries/sessions/useSessions';
import { useScheduleStore } from '../../stores/scheduleStore';
import { useScheduleQuery, useUpdateScheduleMutation } from '../../queries/availability/useSchedule';
import WeeklySchedule from './WeeklySchedule';
import { Save } from 'lucide-react';
import isEqual from 'lodash.isequal';

function AvailabilityManager() {
  const { data: currentUser } = useCurrentUser();
  const { errors, setLocalSchedule, localSchedule } = useScheduleStore();

  const { data: schedule, isLoading } = useScheduleQuery(currentUser?.id);
  const updateScheduleMutation = useUpdateScheduleMutation(currentUser?.id);

  const hasErrors = Object.keys(errors).length > 0;

  useEffect(() => {
    if (schedule && !isEqual(schedule, localSchedule)) {
      setLocalSchedule(schedule);
    }
  }, [schedule, setLocalSchedule, localSchedule]);

  const handleSubmit = async () => {
    if (!localSchedule) return;

    try {
      await updateScheduleMutation.mutateAsync(localSchedule);
      alert('Schedule updated successfully!');
    } catch (error) {
      console.error('Failed to update schedule:', error);
      alert('Failed to update schedule.');
    }
  };

  if (isLoading || Object.keys(localSchedule).length === 0) {
    return null;  // <LoadingState />
  }

  if (!currentUser) {
    return null; // <AuthState />
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Update Weekly Availability</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <WeeklySchedule schedule={localSchedule} errors={errors} />

        <button
          onClick={handleSubmit}
          disabled={hasErrors}
          className={`inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white
            ${hasErrors 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default AvailabilityManager;
