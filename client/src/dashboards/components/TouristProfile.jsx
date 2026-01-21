import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function TouristProfile({ user }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, minWidth: 340, maxWidth: 400 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Avatar src={user?.avatar} alt={user?.name} sx={{ width: 90, height: 90, mb: 2 }} />
          <Typography variant="h5" fontWeight={700}>{user?.name}</Typography>
          <Typography variant="body1" color="text.secondary">{user?.email}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Role: {user?.role}
          </Typography>
          {/* Add more profile info here if available */}
          <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
            Edit Profile
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
