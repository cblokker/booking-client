import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function BookingTime({ startTime, endTime }) {
  return (
    <>
      <div className="flex items-center space-x-2">
        <Calendar className="w-5 h-5 text-gray-600" />
        <span className="font-medium text-gray-900">
          {format(new Date(startTime), 'PPP')}
        </span>
      </div>
      <div className="mt-1 flex items-center space-x-2 text-sm text-gray-600">
        <Clock className="w-4 h-4" />
        <span>
          {format(new Date(startTime), 'p')} - {format(new Date(endTime), 'p')}
        </span>
      </div>
    </>
  );
}
