import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, User, Repeat } from 'lucide-react';

export default function BookingConfirmation({ formData, coach, meetingType }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Review Booking Details</h2>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-6">

          <div className="flex items-start space-x-4">
            <User className="w-6 h-6 text-gray-400 mt-1" />

            <div>
              <h3 className="font-medium text-gray-900">Coach</h3>
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

          {/* Date & Time */}
          <div className="flex items-start space-x-4">
            <Calendar className="w-6 h-6 text-gray-400 mt-1" />

            <div>
              <h3 className="font-medium text-gray-900">Date & Time</h3>
              {formData.timeSlot && (
                <div className="mt-1 text-sm text-gray-500">
                  {format(formData.timeSlot.start_time, 'EEEE, MMMM d, yyyy')}
                  <br />
                  {format(formData.timeSlot.start_time, 'h:mm a')} - {format(formData.timeSlot.end_time, 'h:mm a')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
