// BookGuideDialog.jsx - Modal for booking a guide
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// Layout logic: Shows booking form with destination, start/end date, total price, and confirm/cancel buttons
export default function BookGuideDialog({ open, guide, onClose, onConfirm }) {
  const [destination, setDestination] = React.useState('');
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  React.useEffect(() => {
    if (open) {
      setDestination('');
      setStartDate(null);
      setEndDate(null);
    }
  }, [open]);

  const totalPrice = guide && startDate && endDate
    ? guide.price * (dayjs(endDate).diff(dayjs(startDate), 'day') + 1)
    : guide?.price || 0;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Book {guide?.name}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Destination"
            value={destination}
            onChange={e => setDestination(e.target.value)}
            fullWidth
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={setStartDate}
              format="DD-MM-YYYY"
              slotProps={{ textField: { fullWidth: true } }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={setEndDate}
              format="DD-MM-YYYY"
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
          <TextField
            label="Total Price"
            value={totalPrice}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>Cancel</Button>
        <Button onClick={() => onConfirm({ destination, startDate, endDate, totalPrice })} variant="contained" color="primary" sx={{ borderRadius: 2 }}>Confirm Booking</Button>
      </DialogActions>
    </Dialog>
  );
}
