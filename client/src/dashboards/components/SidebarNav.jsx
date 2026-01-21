// Collapsible Sidebar Navigation for Tourist Dashboard
// Layout logic: Uses MUI Drawer for a permanent sidebar. Navigation items are mapped with icons and labels. Collapsible with a toggle button. Responsive width for mobile/desktop.
import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExploreIcon from '@mui/icons-material/TravelExplore';
import PeopleAltIcon from '@mui/icons-material/Groups';
import BookingsIcon from '@mui/icons-material/EventAvailable';
import ChatIcon from '@mui/icons-material/Chat';
import ReviewsIcon from '@mui/icons-material/Reviews';
import TipsIcon from '@mui/icons-material/TipsAndUpdates';
import EmergencyIcon from '@mui/icons-material/ReportProblem';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

// Icons for each tab
const iconMap = {
  Dashboard: <DashboardIcon sx={{ color: 'primary.main' }} />,
  'Explore Destinations': <ExploreIcon sx={{ color: 'primary.main' }} />,
  'Explore Guides': <PeopleAltIcon sx={{ color: 'primary.main' }} />,
  'My Bookings': <BookingsIcon sx={{ color: 'primary.main' }} />,
  Chat: <ChatIcon sx={{ color: 'primary.main' }} />,
  Reviews: <ReviewsIcon sx={{ color: 'primary.main' }} />,
  'Travel Tips': <TipsIcon sx={{ color: 'primary.main' }} />,
  Emergency: <EmergencyIcon sx={{ color: 'error.main' }} />,
  Profile: <PersonIcon sx={{ color: 'primary.main' }} />,
  Settings: <SettingsIcon sx={{ color: 'primary.main' }} />,
};

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    borderRight: 'none',
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    transition: theme.transitions.create(['width', 'box-shadow'], {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

export default function SidebarNav({ open, onToggle, navItems = [], selectedTab, onSelect }) {
  return (
    <StyledDrawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : 64,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 64,
          overflowX: 'hidden',
          bgcolor: 'background.paper',
        },
      }}
    >
      <List sx={{ pt: 2 }}>
        <ListItem disablePadding sx={{ justifyContent: 'center', py: 1 }}>
          <Tooltip title={open ? 'Collapse' : 'Expand'} placement="right">
            <IconButton onClick={onToggle} size="large">
              {open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </Tooltip>
        </ListItem>
        <Divider sx={{ mb: 1 }} />
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ display: 'block', mb: 0.5 }}>
            <ListItemButton
              selected={selectedTab === item.value}
              onClick={() => onSelect && onSelect(item.value)}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                borderRadius: 3,
                my: 0.5,
                transition: 'background 0.2s',
                bgcolor: selectedTab === item.value ? 'rgba(76,175,80,0.08)' : undefined,
                boxShadow: selectedTab === item.value ? 2 : undefined,
                '&:hover': {
                  bgcolor: 'rgba(76,175,80,0.13)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {iconMap[item.label]}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  opacity: open ? 1 : 0,
                  transition: 'opacity 0.2s',
                  fontWeight: selectedTab === item.value ? 700 : 500,
                  color: selectedTab === item.value ? 'primary.main' : 'text.primary',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
}
