import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useUserStore } from '../../stores/userStore'; // Import user store
import bookingsApi from '../../api/bookings';
import { Phone, User, Calendar, Clock } from 'lucide-react';
import CompleteCallModal from '../coach/CompleteCallModal';

export default function BookingHistory() {
  const { currentUser } = useUserStore();
  const [sessions, setSessions] = useState([]);
  const [state, setState] = useState('upcoming'); // Default state
  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (currentUser?.id) {
      fetchBookings(state);
    }
  }, [currentUser?.id, state]);

  if (!currentUser) {
    return <div>Loading...</div>; // Handle edge case where user is not initialized
  }

  const fetchBookings = async (bookingState) => {
    try {
      const response = await bookingsApi.getBookings({
        state: bookingState,
      });
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleCompleteCall = async (satisfaction_score, notes) => {
    if (!selectedSession) return;

    try {
      await bookingsApi.completeBooking(selectedSession.id, { satisfaction_score, notes });
      setIsModalOpen(false);
      setSelectedSession(null);
      fetchBookings(state);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  const StatusPill = ({ status }) => {
    const statusStyles = {
      booked: 'bg-blue-100 text-blue-800',
      started: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      canceled: 'bg-red-100 text-red-800',
      rescheduled: 'bg-purple-100 text-purple-800',
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const renderSessionCard = (session) => {
    const isBooked = session.status === 'booked';
  
    return (
      <div key={session.id} className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">
                {format(new Date(session.start_time), 'PPP')}
              </span>
            </div>
            <div className="mt-1 flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>
                {format(new Date(session.start_time), 'p')} - {format(new Date(session.end_time), 'p')}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>
                {session.student?.first_name} {session.student?.last_name}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{session.student?.phone_number}</span>
            </div>
          </div>
  
          <div className="flex flex-col items-end space-y-2">
            {isBooked && currentUser.role === 'coach' ? (
              <button
                onClick={() => {
                  setSelectedSession(session);
                  setIsModalOpen(true);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Start Call</span>
              </button>
            ) : (
              <StatusPill status={session.status} />
            )}
          </div>
        </div>
  
        {session.notes && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-800">Notes</h4>
            <p className="text-sm text-gray-600">{session.notes}</p>
          </div>
        )}
      </div>
    );
  };
  

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Calls</h1>

      <div className="flex space-x-4">
        {['upcoming', 'missed', 'completed'].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded ${
              state === filter
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setState(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {sessions.map(renderSessionCard)}
      </div>

      <CompleteCallModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSession(null);
        }}
        onSubmit={handleCompleteCall}
      />
    </div>
  );
}
