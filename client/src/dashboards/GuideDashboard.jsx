import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TourIcon from '@mui/icons-material/TravelExplore';
import BookingsIcon from '@mui/icons-material/BookOnline';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import MessageIcon from '@mui/icons-material/Chat';
import EarningsIcon from '@mui/icons-material/BarChart';
import ReviewsIcon from '@mui/icons-material/StarRate';
import ProfileIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { alpha } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

const drawerWidth = 240;

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon /> },
  { label: 'My Tours', icon: <TourIcon /> },
  { label: 'Bookings', icon: <BookingsIcon /> },
  { label: 'Calendar', icon: <CalendarIcon /> },
  { label: 'Messages', icon: <MessageIcon /> },
  { label: 'Earnings', icon: <EarningsIcon /> },
  { label: 'Reviews', icon: <ReviewsIcon /> },
  { label: 'Profile', icon: <ProfileIcon /> },
  { label: 'Settings', icon: <SettingsIcon /> },
];

const glassBg = theme => `
  linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.7)}, ${alpha(theme.palette.primary.light, 0.2)}),
  rgba(255,255,255,0.4)
`;

const GlassCard = styled(Box)(({ theme }) => ({
  background: glassBg(theme),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
  borderRadius: 20,
  border: '1px solid rgba(255,255,255,0.18)',
  backdropFilter: 'blur(12px)',
  padding: theme.spacing(3),
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px) scale(1.03)',
    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.22)',
  },
}));

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(4),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })
  (({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      background: glassBg(theme),
      borderRight: 'none',
      backdropFilter: 'blur(10px)',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      ...(open ? {} : {
        width: theme.spacing(8),
        overflowX: 'hidden',
      }),
    },
  }));

const metrics = [
  { title: 'Total Bookings', value: 128, icon: <BookingsIcon fontSize="large" color="primary" />, color: 'primary.main', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { title: 'Monthly Earnings', value: '$2,340', icon: <EarningsIcon fontSize="large" color="success" />, color: 'success.main', gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)' },
  { title: 'Upcoming Tours', value: 7, icon: <TourIcon fontSize="large" color="info" />, color: 'info.main', gradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' },
  { title: 'Rating', value: '4.9', icon: <ReviewsIcon fontSize="large" color="warning" />, color: 'warning.main', gradient: 'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)' },
];

const theme = createTheme({
  palette: {
    mode: 'light', // Change to 'dark' for dark mode
    primary: { main: '#1976d2' },
    background: { default: '#f4f6fb', paper: '#fff' },
  },
  shape: { borderRadius: 16 },
});

function DashboardPage({ user, bookings, guideProfile, tours }) {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Welcome, {user?.name || 'Guide'}
      </Typography>
      <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, mb: 4 }}>
        <GlassCard sx={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <BookingsIcon fontSize="large" color="primary" />
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Total Bookings</Typography>
              <Typography variant="h5" fontWeight={700}>{bookings.length}</Typography>
            </Box>
          </Box>
        </GlassCard>
        <GlassCard sx={{ background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <EarningsIcon fontSize="large" color="success" />
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Monthly Earnings</Typography>
              <Typography variant="h5" fontWeight={700}>{guideProfile?.earnings ? `$${guideProfile.earnings}` : '$0'}</Typography>
            </Box>
          </Box>
        </GlassCard>
        <GlassCard sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TourIcon fontSize="large" color="info" />
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Upcoming Tours</Typography>
              <Typography variant="h5" fontWeight={700}>{tours.length}</Typography>
            </Box>
          </Box>
        </GlassCard>
        <GlassCard sx={{ background: 'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ReviewsIcon fontSize="large" color="warning" />
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Rating</Typography>
              <Typography variant="h5" fontWeight={700}>{guideProfile?.ratings || '4.9'}</Typography>
            </Box>
          </Box>
        </GlassCard>
      </Box>
    </Box>
  );
}

// --- My Tours with Create Tour ---
const MyToursPage = ({ tours, onCreateTour }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', price: '', duration: '', image: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    onCreateTour(form);
    setOpen(false);
    setForm({ title: '', price: '', duration: '', image: '' });
  };
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight={700}>My Tours</Typography>
        <Button variant="contained" onClick={() => setOpen(true)} sx={{ borderRadius: 2 }}>Create Tour</Button>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Tour</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 320 }}>
            <TextField label="Title" name="title" value={form.title} onChange={handleChange} required />
            <TextField label="Price" name="price" value={form.price} onChange={handleChange} required type="number" />
            <TextField label="Duration" name="duration" value={form.duration} onChange={handleChange} required />
            <TextField label="Image URL" name="image" value={form.image} onChange={handleChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Create</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Box sx={{
        display: 'grid',
        gap: 4,
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)'
        },
        alignItems: 'stretch',
        minHeight: '260px',
        paddingBottom: 2
      }}>
        {tours.map(tour => (
          <TourCard key={tour._id || tour.id} {...tour} onEdit={() => {}} />
        ))}
      </Box>
    </Box>
  );
};
import BookingsDataGrid from '../components/BookingsDataGrid';
const BookingsPage = ({ bookings }) => (
  <Box>
    <Typography variant="h5" fontWeight={700} mb={3}>Bookings</Typography>
    <BookingsDataGrid bookings={bookings} />
  </Box>
);
import BookingCalendar from '../components/BookingCalendar';
const CalendarPage = () => (
  <Box>
    <Typography variant="h5" fontWeight={700} mb={3}>Calendar</Typography>
    <BookingCalendar />
  </Box>
);
import MessagesPanel from '../components/MessagesPanel';
const MessagesPage = () => (
  <Box>
    <Typography variant="h5" fontWeight={700} mb={3}>Messages</Typography>
    <MessagesPanel />
  </Box>
);
import EarningsCharts from '../components/EarningsCharts';
const EarningsPage = () => (
  <Box>
    <Typography variant="h5" fontWeight={700} mb={3}>Earnings</Typography>
    <EarningsCharts />
  </Box>
);
import ReviewsList from '../components/ReviewsList';
const ReviewsPage = () => (
  <Box>
    <Typography variant="h5" fontWeight={700} mb={3}>Reviews</Typography>
    <ReviewsList />
  </Box>
);
import api from '../api';

export default function GuideDashboard() {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState('Dashboard');
  const [user, setUser] = useState(null);
  const [guideProfile, setGuideProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [tours, setTours] = useState([]);
  const muiTheme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login', { replace: true });
      return;
    }
    const userObj = JSON.parse(storedUser);
    if ((userObj.role || '').toLowerCase() !== 'guide') {
      navigate('/login', { replace: true });
      return;
    }
    setUser(userObj);
    // Fetch guide profile, bookings, and tours
    const fetchGuideData = async () => {
      try {
        // Fetch guide profile
        const profileRes = await api.get(`/guide/profile`);
        setGuideProfile(profileRes.data.guide);
        // Fetch bookings for this guide
        const bookingsRes = await api.get(`/booking/guide/${userObj._id}`);
        setBookings(bookingsRes.data.bookings);
        // Fetch tours for this guide
        const toursRes = await api.get(`/tour/guide/${userObj._id}`);
        setTours(toursRes.data.tours);
      } catch (err) {
        // handle error (optional: show error message)
      }
    };
    fetchGuideData();
  }, [navigate]);

  // ProfilePage now uses guideProfile
  const ProfilePage = () => {
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({
      name: user?.name || '',
      email: user?.email || '',
      phone: guideProfile?.phone || user?.phone || '',
      language: guideProfile?.languages?.[0] || '',
      bio: guideProfile?.bio || '',
    });
    useEffect(() => {
      setForm({
        name: user?.name || '',
        email: user?.email || '',
        phone: guideProfile?.phone || user?.phone || '',
        language: guideProfile?.languages?.[0] || '',
        bio: guideProfile?.bio || '',
      });
    }, [user, guideProfile]);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = async e => {
      e.preventDefault();
      try {
        await api.put('/guide/profile', {
          bio: form.bio,
          languages: [form.language],
          phone: form.phone,
        });
        // Optionally update user name/phone if backend supports
        setEdit(false);
        window.location.reload();
      } catch (err) {
        alert('Failed to update profile');
      }
    };
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', bgcolor: '#fafaf6', p: 4, borderRadius: 4, boxShadow: 2 }}>
        <Typography variant="h4" fontWeight={700} mb={1} sx={{ fontFamily: 'serif' }}>My Profile</Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={3}>
          Manage your account settings and preferences
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <Typography fontWeight={600} mb={0.5}><ProfileIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Full Name</Typography>
            <TextField fullWidth name="name" value={form.name} onChange={handleChange} disabled sx={{ bgcolor: '#f8f8f2' }} />
          </Box>
          <Box mb={2}>
            <Typography fontWeight={600} mb={0.5}><ProfileIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Email Address</Typography>
            <TextField fullWidth name="email" value={form.email} disabled sx={{ bgcolor: '#f8f8f2' }} />
            <Typography variant="caption" color="text.secondary">Email cannot be changed</Typography>
          </Box>
          <Box mb={2}>
            <Typography fontWeight={600} mb={0.5}><span role="img" aria-label="phone">📞</span> Phone Number</Typography>
            <TextField fullWidth name="phone" value={form.phone} onChange={handleChange} sx={{ bgcolor: '#f8f8f2' }} />
          </Box>
          <Box mb={2}>
            <Typography fontWeight={600} mb={0.5}><span role="img" aria-label="language">🌐</span> Preferred Language</Typography>
            <TextField fullWidth name="language" value={form.language} onChange={handleChange} sx={{ bgcolor: '#f8f8f2' }} />
          </Box>
          <Box mb={2}>
            <Typography fontWeight={600} mb={0.5}><span role="img" aria-label="bio">📝</span> Bio</Typography>
            <TextField fullWidth name="bio" value={form.bio} onChange={handleChange} multiline rows={2} sx={{ bgcolor: '#f8f8f2' }} />
          </Box>
          <Button type="submit" variant="contained" color="success" fullWidth sx={{ borderRadius: 8, py: 1.5, fontWeight: 700, fontSize: 18, mt: 2 }}>
            Save Changes
          </Button>
        </form>
      </Box>
    );
  };

  const SettingsPage = () => (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>Settings</Typography>
      <Box sx={{ maxWidth: 400, mx: 'auto' }}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 4, boxShadow: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Account Settings</Typography>
          <Typography color="text.secondary">Change password, notification preferences, and more.</Typography>
        </Box>
      </Box>
    </Box>
  );

  const handleCreateTour = async (tourData) => {
    try {
      const res = await api.post(`/travelogue/submit`, {
        ...tourData,
        guideId: user._id
      });
      setTours(prev => [...prev, res.data.travelogue]);
    } catch (err) {
      alert('Failed to create tour');
    }
  };

  const pageMap = {
    Dashboard: <DashboardPage user={user} bookings={bookings} guideProfile={guideProfile} tours={tours} />,
    'My Tours': <MyToursPage tours={tours} onCreateTour={handleCreateTour} />,
    Bookings: <BookingsPage bookings={bookings} />,
    Calendar: <CalendarPage />,
    Messages: <MessagesPage />,
    Earnings: <EarningsPage />,
    Reviews: <ReviewsPage />,
    Profile: <ProfilePage />,
    Settings: <SettingsPage />,
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default', position: 'relative' }}>
        <CssBaseline />
        {/* Sidebar */}
        <Drawer variant="permanent" open={open} sx={{ position: 'fixed', left: 0, top: 0, height: '100vh', zIndex: 1200 }}>
          <Toolbar />
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    borderRadius: 2,
                    my: 0.5,
                    background: selected === item.label ? alpha(muiTheme.palette.primary.main, 0.08) : 'none',
                    transition: 'background 0.2s',
                  }}
                  selected={selected === item.label}
                  onClick={() => setSelected(item.label)}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center', color: selected === item.label ? 'primary.main' : 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0, transition: 'opacity 0.2s' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        {/* Main Content */}
        <Box sx={{ flex: 1, marginLeft: `${drawerWidth}px`, width: `calc(100% - ${drawerWidth}px)`, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <AppBar position="fixed" open={open} elevation={0} color="inherit" sx={{ left: `${drawerWidth}px`, width: `calc(100% - ${drawerWidth}px)`, backdropFilter: 'blur(8px)', background: glassBg(muiTheme) }}>
            <Toolbar>
              <IconButton color="inherit" aria-label="open drawer" onClick={() => setOpen(!open)} edge="start" sx={{ mr: 2 }}>
                {open ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                Guide Dashboard
              </Typography>
              <Tooltip title="Profile">
                <Avatar sx={{ bgcolor: 'primary.main', boxShadow: 2 }}>G</Avatar>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <Main open={open} sx={{ pt: 10 }}>
            {/* Add top padding to avoid AppBar overlap */}
            {pageMap[selected]}
          </Main>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
