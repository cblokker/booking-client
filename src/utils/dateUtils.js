import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const getUserTimezone = () => {
  return dayjs.tz.guess() || 'UTC';
};

export const formatDate = (date) => {
  return dayjs(date).tz(getUserTimezone()).format('dddd, MMMM D, YYYY');
};

export const formatTime = (date) => {
  return dayjs(date).tz(getUserTimezone()).format('h:mm A');
};

export const convertToUserTimezone = (date) => {
  return dayjs(date).tz(getUserTimezone()).toDate();
};

export const convertFromUserTimezone = (date) => {
  return dayjs(date).tz(getUserTimezone()).utc().format();
};
