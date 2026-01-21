import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from './api';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonIcon from '@mui/icons-material/Person';
import RoomIcon from '@mui/icons-material/Room';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import styles from './Login.module.css';

const roles = [
  { label: "Tourist", icon: <PersonIcon color="success" /> },
  { label: "Guide", icon: <RoomIcon color="primary" /> },
  { label: "Admin", icon: <AdminPanelSettingsIcon color="info" /> },
  { label: "Hotel", icon: <HotelIcon color="error" /> },
  { label: "Hospital", icon: <LocalHospitalIcon color="secondary" /> },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState("Tourist");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleRole = (event, newRole) => {
    if (newRole !== null) setSelectedRole(newRole);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', {
        ...form,
        role: selectedRole.toLowerCase() // send role to backend
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      // Redirect based on role (no alert)
      if (res.data.user.role === 'guide') {
        window.location.href = '/guide-dashboard';
      } else if (res.data.user.role === 'admin') {
        window.location.href = '/admin-dashboard';
      } else if (res.data.user.role === 'tourist') {
        window.location.href = '/tourist-dashboard';
      } else {
        window.location.href = '/';
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box className={styles.bg} minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <Paper elevation={6} className={styles.paper}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Avatar className={styles.avatar} sx={{ bgcolor: 'success.main', width: 64, height: 64 }}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h4" fontWeight={700} mt={2}>
            Welcome Back
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={2}>
            Sign in to your Travelogue account
          </Typography>
        </Box>
        <Typography variant="subtitle2" fontWeight={600} mb={1}>
          Login As
        </Typography>
        <ToggleButtonGroup
          value={selectedRole}
          exclusive
          onChange={handleRole}
          fullWidth
          className={styles.roleGroup}
          sx={{ mb: 3 }}
        >
          {roles.map((role) => (
            <ToggleButton key={role.label} value={role.label} className={styles.roleBtn}>
              <Box display="flex" flexDirection="column" alignItems="center">
                {role.icon}
                <Typography variant="caption" fontWeight={600}>{role.label}</Typography>
              </Box>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            className={styles.loginBtn}
            sx={{ mt: 3, mb: 2, fontWeight: 700, fontSize: 18, background: 'linear-gradient(90deg, #22c55e 0%, #06b6d4 100%)' }}
          >
            Sign In
          </Button>
        </form>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link to="/register" className={styles.registerLink}>Register</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
