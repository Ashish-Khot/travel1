import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "./api";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Avatar from "@mui/material/Avatar";

import PersonIcon from "@mui/icons-material/Person";
import RoomIcon from "@mui/icons-material/Room";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import styles from "./Register.module.css";

const roles = [
  { label: "Tourist", icon: <PersonIcon color="success" /> },
  { label: "Guide", icon: <RoomIcon color="primary" /> },
  { label: "Admin", icon: <AdminPanelSettingsIcon color="info" /> },
  { label: "Hotel", icon: <HotelIcon color="error" /> },
  { label: "Hospital", icon: <LocalHospitalIcon color="secondary" /> }
];

export default function Register() {
  const [selectedRole, setSelectedRole] = useState("Tourist");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    interests: ""
  });

  const handleRole = (event, newRole) => {
    if (newRole !== null) setSelectedRole(newRole);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        country: form.country,
        interests: form.interests,
        role: selectedRole.toLowerCase()
      };

      console.log("Sending to backend 👉", payload);

      await api.post("/register", payload);

      alert("Account created successfully!");
      window.location.href = "/login";

    } catch (err) {
      console.log("REGISTER ERROR 👉", err.response || err);

      let msg = "Registration failed";

      if (err.response) {
        msg = err.response.data?.message || err.response.data || "Server error";
      } else {
        msg = err.message;
      }

      alert(msg);
    }
  };

  return (
    <Box
      className={styles.bg}
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Paper elevation={6} className={styles.paper}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Avatar
            className={styles.avatar}
            sx={{ bgcolor: "success.main", width: 64, height: 64 }}
          >
            <PersonIcon fontSize="large" />
          </Avatar>

          <Typography component="h1" variant="h4" fontWeight={700} mt={2}>
            Create Account
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" mb={2}>
            Join Travelogue community today
          </Typography>
        </Box>

        <Typography variant="subtitle2" fontWeight={600} mb={1}>
          Register As
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
            <ToggleButton
              key={role.label}
              value={role.label}
              className={styles.roleBtn}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                {role.icon}
                <Typography variant="caption" fontWeight={600}>
                  {role.label}
                </Typography>
              </Box>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField fullWidth margin="normal" required label="Full Name" name="name" value={form.name} onChange={handleChange} />
          <TextField fullWidth margin="normal" required label="Email" name="email" value={form.email} onChange={handleChange} />
          <TextField fullWidth margin="normal" required label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
          <TextField fullWidth margin="normal" required label="Phone" name="phone" value={form.phone} onChange={handleChange} />
          <TextField fullWidth margin="normal" required label="Country" name="country" value={form.country} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Interests" name="interests" value={form.interests} onChange={handleChange} />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              mb: 2,
              fontWeight: 700,
              fontSize: 18,
              background: "linear-gradient(90deg, #22c55e 0%, #06b6d4 100%)"
            }}
          >
            Create Account
          </Button>
        </form>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link to="/login" className={styles.registerLink}>
              Sign In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
