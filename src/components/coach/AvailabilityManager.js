import React, { useState, useEffect } from 'react';
import WeeklySchedule from './WeeklySchedule';
import { checkOverlap } from '../../utils/timeValidation';
import { getWindowEndTime } from '../../utils/timeSlots';
import { useUserStore } from '../../stores/userStore';
import availabilityWindowsApi from '../../api/availability';
import { format, parse, differenceInMinutes } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';

const DEFAULT_MORNING_WINDOW = {
  start: '08:00',
  end: '12:00',
  slots: 2,
  meetingTypeId: '',
};

const DEFAULT_AFTERNOON_WINDOW = {
  start: '13:00',
  end: '17:00',
  slots: 2,
  meetingTypeId: '',
};

const INITIAL_SCHEDULE = {
  0: { enabled: false, windows: [{ ...DEFAULT_MORNING_WINDOW }, { ...DEFAULT_AFTERNOON_WINDOW }] },
  1: { enabled: false, windows: [{ ...DEFAULT_MORNING_WINDOW }, { ...DEFAULT_AFTERNOON_WINDOW }] },
  2: { enabled: false, windows: [{ ...DEFAULT_MORNING_WINDOW }, { ...DEFAULT_AFTERNOON_WINDOW }] },
  3: { enabled: false, windows: [{ ...DEFAULT_MORNING_WINDOW }, { ...DEFAULT_AFTERNOON_WINDOW }] },
  4: { enabled: false, windows: [{ ...DEFAULT_MORNING_WINDOW }, { ...DEFAULT_AFTERNOON_WINDOW }] },
  5: { enabled: false, windows: [{ ...DEFAULT_MORNING_WINDOW }, { ...DEFAULT_AFTERNOON_WINDOW }] },
  6: { enabled: false, windows: [{ ...DEFAULT_MORNING_WINDOW }, { ...DEFAULT_AFTERNOON_WINDOW }] },
};

const daysMap = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

const calculateSlots = (start, end, slotDuration) => {
  // Parse times into date objects
  const startTime = parse(start, 'HH:mm', new Date());
  const endTime = parse(end, 'HH:mm', new Date());

  // Calculate the duration in minutes
  const durationInMinutes = differenceInMinutes(endTime, startTime);

  // Calculate the number of slots
  return Math.floor(durationInMinutes / (slotDuration * 60));
};

// Calculate the next available start time
const getNextAvailableTimes = (dayId, schedule) => {
  const daySchedule = schedule[dayId];
  if (!daySchedule || !daySchedule.windows.length) {
    const start = '09:00';
    const end = '11:00';
    return { start, end };
  }

  const lastWindow = daySchedule.windows[daySchedule.windows.length - 1];
  const endTime = getWindowEndTime(lastWindow);
  const [hours, minutes] = endTime.split(':').map(Number);

  // Calculate new start and end times
  const newStartHours = (hours + 1) % 24;
  const newEndHours = (hours + 3) % 24;

  const start = `${newStartHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  const end = `${newEndHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return { start, end };
};

export default function UpcomingSessionsCoachDashboard() {
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [errors, setErrors] = useState({});
  const { currentUser } = useUserStore();
  const coachId = currentUser?.id;

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    if (!coachId) return;

    const fetchAvailability = async () => {
      try {
        const data = await availabilityWindowsApi.getAvailabilityWindows(coachId); // Fetch availability
        const transformedSchedule = transformData(data);
        setSchedule(transformedSchedule);
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };

    fetchAvailability();
  }, [coachId, userTimeZone]);

  useEffect(() => {
    validateSchedule();
  }, [schedule]);

  const transformData = (data) => {
    const schedule = Array.from({ length: 7 }, (_, index) => ({
      enabled: false,
      windows: [{ ...DEFAULT_MORNING_WINDOW }, { ...DEFAULT_AFTERNOON_WINDOW }],
    }));

    data.data.forEach(({ id, intervals, day_of_week }) => {
      const dayIndex = daysMap[day_of_week.toLowerCase()];

      schedule[dayIndex] = {
        id: id,
        day_of_week: day_of_week,
        enabled: intervals.length > 0,
        windows: intervals.map(({ start_time, end_time }) => ({
          start: start_time,
          end: end_time,
          slots: calculateSlots(start_time, end_time, 2)
        })),
      };
    });

    return schedule.reduce((acc, day, index) => {
      acc[index] = day;
      return acc;
    }, {});
  };

  const validateSchedule = () => {
    const newErrors = {};

    Object.entries(schedule).forEach(([dayId, daySchedule]) => {
      if (daySchedule.enabled && daySchedule.windows.length > 1) {
        const result = checkOverlap(daySchedule.windows);

        if (result.hasOverlap) {
          newErrors[Number(dayId)] = {
            message: result.message,
            overlappingPairs: result.overlappingPairs,
          };
        }
      }
    });

    setErrors(newErrors);
  };

  const handleToggleDay = (dayId) => {
    setSchedule((prev) => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        enabled: !prev[dayId].enabled,
      },
    }));
  };

  const handleUpdateWindow = (dayId, windowIndex, updates) => {
    setSchedule((prev) => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        windows: prev[dayId].windows.map((window, idx) =>
          idx === windowIndex ? { ...window, ...updates } : window
        ),
      },
    }));
  };

  const handleAddWindow = (dayId) => {
    const { start, end } = getNextAvailableTimes(dayId, schedule);
  
    setSchedule((prev) => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        windows: [
          ...prev[dayId].windows,
          {
            start: start,
            end: end,
            slots: 1,
          },
        ],
      },
    }));
  };

  const handleRemoveWindow = (dayId, windowIndex) => {
    setSchedule((prev) => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        windows: prev[dayId].windows.filter((_, idx) => idx !== windowIndex),
      },
    }));
  };

  const handleSubmit = async () => {
    console.log(schedule);
    const formattedData = Object.entries(schedule)
      .map(([dayId, day]) => {
        if (!day.enabled || !day.windows || day.windows.length === 0) return null;

        return {
          id: day.id,
          coach_id: coachId,
          timezone: userTimeZone,
          day_of_week: Object.keys(daysMap)[dayId],
          intervals: day.windows.map((window) => ({
            start_time: window.start,
            end_time: window.end,
          })),
        };
      })
      .filter(Boolean);

    try {
      await availabilityWindowsApi.bulkUpdateAvailabilityWindows(coachId, formattedData);
      alert('Availability updated successfully!');
    } catch (error) {
      console.error('Error submitting availability:', error);
      alert('Failed to update availability. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Update Weekly Availability</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <WeeklySchedule
          schedule={schedule}
          errors={errors}
          onToggleDay={handleToggleDay}
          onUpdateWindow={handleUpdateWindow}
          onAddWindow={handleAddWindow}
          onRemoveWindow={handleRemoveWindow}
        />
        <button
          onClick={handleSubmit}
          className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded shadow-sm hover:bg-indigo-700"
        >
          Save Availability
        </button>
      </div>
    </div>
  );
}
