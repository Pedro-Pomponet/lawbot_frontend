import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LawyerRoutes from './routes/LawyerRoutes';
import LandingPage from './components/LandingPage/LandingPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/advogado/*" element={<LawyerRoutes />} />
    </Routes>
  );
}

export default App;