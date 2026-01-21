

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
 

import App from './App.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import GuideDashboard from './dashboards/GuideDashboard';
import TouristDashboard from './dashboards/TouristDashboard.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/guide-dashboard" element={<GuideDashboard />} />
        <Route path="/tourist-dashboard" element={
          <ProtectedRoute allowedRole="tourist">
            <TouristDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
