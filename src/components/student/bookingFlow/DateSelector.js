import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default function DateSelector({ selectedDate, setDate }) {

  const shouldDisableDate = (date) => {
    return date.isBefore(dayjs().startOf('day'));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        value={dayjs(selectedDate)}
        onChange={(newDate) => {
          if (newDate) {
            setDate(newDate.toDate());
          }
        }}
        shouldDisableDate={shouldDisableDate}
        sx={{
          width: '100%',
          '& .MuiPickersDay-root': {
            '&.Mui-selected': {
              backgroundColor: '#2563eb',
              '&:hover': {
                backgroundColor: '#1d4ed8',
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
