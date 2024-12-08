import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, User, CheckCircle } from 'lucide-react';
import { useBookingStore } from '../../../stores/bookingStore';
import { useUsers } from '../../../queries/user/useUsers';

function BookingConfirmed() {
  const reset = useBookingStore((state) => state.reset);
  const {
    selectedTimeSlot,
    selectedMeetingTypeId,
    selectedCoachId,
  } = useBookingStore();

  const { data: allUsers = [] } = useUsers();
  const coaches = useMemo(() => allUsers.filter((user) => user.role === 'coach'), [allUsers]);

  const coach = coaches?.find((c) => c.id === selectedCoachId) || null;
  const meetingType = useBookingStore.getState().meetingTypes.find((t) => t.id === selectedMeetingTypeId) || null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Success Message */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600">
          Your coaching session been scheduled.
        </p>
      </div>

      {/* Meeting Details Card */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Coach Details */}
          <div className="flex items-start space-x-4">
            <User className="w-6 h-6 text-gray-400 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Your Coach</h3>
              <div className="mt-2 flex items-center">
                <img
                  src={coach.image_url}
                  alt={coach.first_name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{coach.first_name} {coach.last_name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Meeting Type */}
          <div className="flex items-start space-x-4">
            <Clock className="w-6 h-6 text-gray-400 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Meeting Type</h3>
              <p className="mt-1 text-sm text-gray-500">
                {meetingType.name} ({meetingType.durationMinutes} minutes)
              </p>
            </div>
          </div>

          {/* Schedule */}
          <div className="flex items-start space-x-4">
            <Calendar className="w-6 h-6 text-gray-400 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Schedule</h3>
              {selectedTimeSlot && (
                <div className="mt-2 space-y-3">
                  <p className="text-sm text-gray-600">
                    {format(selectedTimeSlot.start_time, 'EEEE, MMMM d, yyyy')} at{' '}
                    {format(selectedTimeSlot.start_time, 'h:mm a')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-4">Next Steps</h3>
        <ul className="space-y-3 text-sm text-blue-800">
          <li>• Check your email for a confirmation with meeting details</li>
          <li>• Add the session to your calendar to receive reminders</li>
          <li>• Prepare any specific topics or questions you'd like to discuss</li>
          <li>• Join the meeting link 5 minutes before your scheduled time</li>
        </ul>
      </div>

      <button
        onClick={reset}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Book Another Session
      </button>
    </div>
  );
}

export default BookingConfirmed;
