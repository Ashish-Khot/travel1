
// Modern, premium Tourist Dashboard using MUI v5 and Framer Motion
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import AppBarTop from './components/AppBarTop';
import SidebarNav from './components/SidebarNav';
import WelcomeSection from './components/WelcomeSection';
import PopularDestinations from './components/PopularDestinations';
import TopRatedGuides from './components/TopRatedGuides';
import TrendingTravelogues from './components/TrendingTravelogues';
import UpcomingTripsCard from './components/UpcomingTripsCard';
import ExploreGuides from './components/ExploreGuides';
import ChatPanel from './components/ChatPanel';
import ReviewsPanel from './components/ReviewsPanel';
import TravelTipsPanel from './components/TravelTipsPanel';
import EmergencySupportPanel from './components/EmergencySupportPanel';
import TouristProfile from './components/TouristProfile';
import TouristSettings from './components/TouristSettings';
import MyBookings from './components/MyBookings';


export default function TouristDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useMediaQuery('(max-width:900px)');
  const [selectedTab, setSelectedTab] = useState('Dashboard');

  // Responsive sidebar toggle
  const handleSidebarToggle = () => setSidebarOpen((open) => !open);

  // Sidebar navigation items
  const navItems = [
    { label: 'Dashboard', value: 'Dashboard' },
    { label: 'Explore Destinations', value: 'Explore Destinations' },
    { label: 'Explore Guides', value: 'Explore Guides' },
    { label: 'My Bookings', value: 'My Bookings' },
    { label: 'Chat', value: 'Chat' },
    { label: 'Reviews', value: 'Reviews' },
    { label: 'Travel Tips', value: 'Travel Tips' },
    { label: 'Emergency', value: 'Emergency' },
    { label: 'Profile', value: 'Profile' },
    { label: 'Settings', value: 'Settings' },
  ];

  return (
    <ThemeProvider theme={theme('light')}>
      <CssBaseline />
      {/* AppBar */}
      <AppBarTop user={user} />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Sidebar Navigation */}
        <SidebarNav
          open={!isMobile && sidebarOpen}
          onToggle={handleSidebarToggle}
          navItems={navItems}
          selectedTab={selectedTab}
          onSelect={setSelectedTab}
        />
        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 4 },
            pt: { xs: 9, sm: 11 }, // Add top padding for fixed AppBar
            maxWidth: '1600px',
            mx: 'auto',
            transition: 'padding 0.2s',
          }}
        >
          {selectedTab === 'Dashboard' && (
            <>
              <WelcomeSection user={user} />
              <PopularDestinations />
              <TopRatedGuides />
              <TrendingTravelogues />
              <UpcomingTripsCard />
            </>
          )}
          {selectedTab === 'Explore Guides' && <ExploreGuides />}
          {selectedTab === 'My Bookings' && <MyBookings />}
          {selectedTab === 'Chat' && <ChatPanel />}
          {selectedTab === 'Reviews' && <ReviewsPanel />}
          {selectedTab === 'Travel Tips' && <TravelTipsPanel />}
          {selectedTab === 'Emergency' && <EmergencySupportPanel />}
          {selectedTab === 'Profile' && <TouristProfile user={user} />}
          {selectedTab === 'Settings' && <TouristSettings />}
          {/* Add other tab content as needed */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
