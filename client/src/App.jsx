


import React from 'react';
import NavigationBar from './layout/NavigationBar';
import MainLayout from './layout/MainLayout';
import LandingPage from './home/LandingPage';
import './App.css';





function App() {
  return (
    <MainLayout>
      <NavigationBar />
      <LandingPage />
    </MainLayout>
  );
}

export default App;
