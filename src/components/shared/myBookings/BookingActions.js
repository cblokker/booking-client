import React from 'react';
import { Phone } from 'lucide-react';
import StatusPill from './StatusPill';

export default function BookingActions({ status, isBooked, isCoachView, onStartCall }) {
  if (isBooked && isCoachView) {
    return (
      <button
        onClick={onStartCall}
        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 flex items-center space-x-2"
      >
        <Phone className="w-4 h-4" />
        <span>Start Call</span>
      </button>
    );
  }

  return <StatusPill status={status} />;
}
