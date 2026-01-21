import * as React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const sampleBookings = [
  '2026-01-15',
  '2026-01-18',
  '2026-01-20',
  '2026-01-22',
];

export default function BookingCalendar() {
  const [value, setValue] = React.useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ borderRadius: 4, p: 2, bgcolor: 'background.paper', maxWidth: 400, mx: 'auto' }}>
        <Typography variant="h6" fontWeight={700} mb={2}>Booking Calendar</Typography>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={value}
          onChange={setValue}
          renderDay={(day, _value, DayComponentProps) => {
            const isBooked = sampleBookings.includes(day.format('YYYY-MM-DD'));
            return (
              <Box sx={{ position: 'relative' }}>
                <span style={{ position: 'absolute', top: 2, right: 2, fontSize: 10, color: isBooked ? '#1976d2' : 'transparent' }}>●</span>
                <span>
                  <DayComponentProps.Day {...DayComponentProps} />
                </span>
              </Box>
            );
          }}
        />
      </Paper>
    </LocalizationProvider>
  );
}
