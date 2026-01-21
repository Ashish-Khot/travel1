import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Paper, Chip, Avatar, Stack } from '@mui/material';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import PlaceIcon from '@mui/icons-material/Place';

const LOCATIONS = [
  { label: 'Paris', value: 'paris' },
  { label: 'London', value: 'london' },
  { label: 'New York', value: 'newyork' },
  { label: 'Tokyo', value: 'tokyo' },
];

const EMERGENCY_CONTACTS = [
  {
    label: 'Police',
    number: '17',
    icon: <LocalPoliceIcon fontSize="large" />, 
    color: '#F44336',
  },
  {
    label: 'Ambulance',
    number: '15',
    icon: <LocalHospitalIcon fontSize="large" />, 
    color: '#FF9800',
  },
  {
    label: 'Fire',
    number: '18',
    icon: <LocalFireDepartmentIcon fontSize="large" />, 
    color: '#FBC02D',
  },
  {
    label: 'General Emergency',
    number: '112',
    icon: <LocalPhoneIcon fontSize="large" />, 
    color: '#448AFF',
  },
];

const HOSPITALS = {
  paris: [
    {
      name: 'Hôpital Européen Georges-Pompidou',
      address: '20 Rue Leblanc, 75015 Paris',
      phone: '+33 1 56 09 20 00',
      distance: '2.5 km',
    },
    {
      name: 'Hôpital Cochin',
      address: '27 Rue du Faubourg Saint-Jacques, 75014 Paris',
      phone: '+33 1 58 41 41 41',
      distance: '3.1 km',
    },
    {
      name: 'Hôpital Necker',
      address: '149 Rue de Sèvres, 75015 Paris',
      phone: '+33 1 44 49 40 00',
      distance: '1.8 km',
    },
  ],
  london: [
    {
      name: 'St Thomas’ Hospital',
      address: 'Westminster Bridge Rd, London SE1 7EH',
      phone: '+44 20 7188 7188',
      distance: '2.2 km',
    },
    {
      name: 'Royal London Hospital',
      address: 'Whitechapel Rd, London E1 1FR',
      phone: '+44 20 7377 7000',
      distance: '4.0 km',
    },
  ],
  newyork: [
    {
      name: 'NYU Langone Health',
      address: '550 1st Ave, New York, NY 10016',
      phone: '+1 212-263-7300',
      distance: '1.5 mi',
    },
    {
      name: 'Mount Sinai Hospital',
      address: '1468 Madison Ave, New York, NY 10029',
      phone: '+1 212-241-6500',
      distance: '2.8 mi',
    },
  ],
  tokyo: [
    {
      name: 'Tokyo Medical University Hospital',
      address: '6 Chome-7-1 Nishishinjuku, Shinjuku City, Tokyo',
      phone: '+81 3-3342-6111',
      distance: '3.0 km',
    },
    {
      name: 'St. Luke’s International Hospital',
      address: '9 Chome-1 Akashicho, Chuo City, Tokyo',
      phone: '+81 3-3541-5151',
      distance: '5.2 km',
    },
  ],
};

export default function EmergencySupportPanel() {
  const [location, setLocation] = useState('paris');
  const hospitals = HOSPITALS[location] || [];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#FCFCFA', minHeight: '100vh' }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        <Avatar sx={{ bgcolor: '#F44336', width: 40, height: 40 }}>
          <LocalPoliceIcon />
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight={700} color="text.primary">
            Emergency Support
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quick access to emergency contacts and nearby hospitals
          </Typography>
        </Box>
      </Stack>
      <Box mt={3} mb={2}>
        <Typography variant="subtitle2" fontWeight={600} mb={1}>
          Select Your Location
        </Typography>
        <Stack direction="row" spacing={2}>
          {LOCATIONS.map((loc) => (
            <Button
              key={loc.value}
              variant={location === loc.value ? 'contained' : 'outlined'}
              color={location === loc.value ? 'success' : 'inherit'}
              onClick={() => setLocation(loc.value)}
              sx={{
                borderRadius: 5,
                fontWeight: 600,
                px: 3,
                bgcolor: location === loc.value ? 'success.main' : 'white',
                color: location === loc.value ? 'white' : 'text.primary',
                boxShadow: location === loc.value ? 2 : 0,
                textTransform: 'none',
              }}
            >
              {loc.label}
            </Button>
          ))}
        </Stack>
      </Box>
      <Box mt={4} mb={2}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Emergency Contact Numbers
        </Typography>
        <Grid container spacing={3} alignItems="stretch">
          {EMERGENCY_CONTACTS.map((contact) => (
            <Grid item xs={12} sm={6} md={3} key={contact.label} sx={{ display: 'flex' }}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: contact.color,
                  color: '#fff',
                  borderRadius: '18px',
                  p: 0,
                  height: 140,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)',
                  transition: 'box-shadow 0.2s',
                  '&:hover': {
                    boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)',
                  },
                  pl: 3,
                  flex: 1,
                }}
              >
                <Box mb={1} display="flex" alignItems="center" justifyContent="flex-start">
                  {React.cloneElement(contact.icon, { fontSize: 'large', sx: { fontSize: 30 } })}
                </Box>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5, fontSize: 17, textAlign: 'left', lineHeight: 1 }}>
                  {contact.label}
                </Typography>
                <Typography variant="h5" fontWeight={700} sx={{ fontSize: 26, textAlign: 'left', lineHeight: 1 }}>
                  {contact.number}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mt={5}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Nearby Hospitals
        </Typography>
        <Stack spacing={2}>
          {hospitals.map((h, idx) => (
            <Paper
              key={h.name}
              elevation={0}
              sx={{
                borderRadius: 3,
                p: 2.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: '#fff',
                border: '1px solid #F0F0F0',
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: '#388E3C', width: 40, height: 40 }}>
                  <LocalHospitalIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>
                    {h.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {h.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {h.phone}
                  </Typography>
                </Box>
              </Box>
              <Chip
                label={h.distance}
                sx={{ bgcolor: '#E8F5E9', color: '#388E3C', fontWeight: 600, fontSize: 15 }}
                size="medium"
              />
            </Paper>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
