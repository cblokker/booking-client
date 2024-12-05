import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(duration);
dayjs.extend(advancedFormat);

export const parseTime = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return dayjs().hour(hours).minute(minutes).second(0);
};

export const formatTime = (dayjsObj) => {
  return dayjsObj.format('HH:mm');
};

export const calculateEndTime = (startTime, slots, meetingDuration) => {
  const startDateTime = parseTime(startTime);
  const totalDuration = dayjs.duration(slots * meetingDuration, 'minutes');
  const endDateTime = startDateTime.add(totalDuration.asMinutes(), 'minutes');
  return formatTime(endDateTime);
};

export const generateTimeSlots = (startTime, endTime, slots) => {
  const startDateTime = parseTime(startTime);
  const endDateTime = parseTime(endTime);
  const totalMinutes = endDateTime.diff(startDateTime, 'minutes');
  const slotDuration = totalMinutes / slots;
  const timeSlots = [];

  for (let i = 0; i < slots; i++) {
    const slotStart = startDateTime.add(i * slotDuration, 'minutes');
    const slotEnd = slotStart.add(slotDuration, 'minutes');

    timeSlots.push({
      start: formatTime(slotStart),
      end: formatTime(slotEnd),
    });
  }

  return timeSlots;
};
