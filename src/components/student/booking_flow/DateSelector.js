import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';

export default function DateSelector({ selectedDate, availableDates, onDateSelect }) {
  // Note: Place in utils of use a helper method?
  const pastDates = (date) => {
    return dayjs(date).isBefore(dayjs(), 'day');
  };

  // collect current date.

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        value={dayjs(selectedDate)}
        onChange={(newDate) => {
          if (newDate) {
            onDateSelect(newDate.toDate());
          }
        }}
        shouldDisableDate={pastDates}
          slotProps={{
            actionBar: {
              actions: [],
            },
          }}
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
