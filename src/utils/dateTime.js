import { parse, format } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';

export const getUserTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const localToUtc = (timeString, timeZone) => {
  // Create a date object for today with the given time
  const today = new Date();
  const dateString = format(today, 'yyyy-MM-dd');
  const localDateTime = parse(`${dateString} ${timeString}`, 'yyyy-MM-dd HH:mm', new Date());
  
  // Convert to UTC
  const utcTime = fromZonedTime(localDateTime, timeZone);
  return format(utcTime, 'HH:mm');
};

export const utcToLocal = (timeString, timeZone) => {
  // Create a UTC date object for today with the given time
  const today = new Date();
  const dateString = format(today, 'yyyy-MM-dd');
  const utcDateTime = parse(`${dateString} ${timeString}`, 'yyyy-MM-dd HH:mm', new Date());
  
  // Convert to local time zone
  const localTime = toZonedTime(utcDateTime, timeZone);
  return format(localTime, 'HH:mm');
};

export const getDayShift = (timeString, sourceTimeZone, targetTimeZone) => {
  const today = new Date();
  const dateString = format(today, 'yyyy-MM-dd');
  const dateTime = parse(`${dateString} ${timeString}`, 'yyyy-MM-dd HH:mm', new Date());
  
  const sourceTime = toZonedTime(dateTime, sourceTimeZone);
  const targetTime = toZonedTime(dateTime, targetTimeZone);
  
  return targetTime.getDay() - sourceTime.getDay();
};
