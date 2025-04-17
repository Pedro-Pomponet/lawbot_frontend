import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../components/Landing/LandingPage';
import LawyerLayout from '../components/Lawyer/Layout/LawyerLayout';
import LawyerDashboard from '../components/Lawyer/Dashboard/LawyerDashboard';
import LegalLibrary from '../components/Lawyer/Library/LegalLibrary';
import Analytics from '../components/Lawyer/Analytics/Analytics';
import CaseManagement from '../components/Lawyer/CaseManagement/CaseOverview';
import Automation from '../components/Lawyer/Automation/Automation';
import ClientDashboard from '../components/Client/Dashboard/ClientDashboard';
import IAJuridica from '../pages/IAJuridica';
import AnalyticsDashboard from '../components/Lawyer/Analytics/AnalyticsDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      {/* Rotas do Advogado */}
      <Route path="/advogado" element={<LawyerLayout />}>
        <Route index element={<LawyerDashboard />} />
        <Route path="biblioteca" element={<LegalLibrary />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="casos" element={<CaseManagement />} />
        <Route path="automacao" element={<Automation />} />
        <Route path="ia-juridica" element={<IAJuridica />} />
        <Route path="analytics-dashboard" element={<AnalyticsDashboard />} />
      </Route>
      
      {/* Rotas do Cliente */}
      <Route path="/cliente" element={<ClientDashboard />} />
      
      {/* Rota padrão para página não encontrada */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;