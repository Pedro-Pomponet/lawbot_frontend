import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import LawyerLayout from './components/Lawyer/Layout/LawyerLayout';
import LawyerDashboard from './components/Lawyer/Dashboard/LawyerDashboard';
import CaseManagement from './components/Lawyer/CaseManagement/CaseManagement';
import LegalLibrary from './components/Lawyer/Library/LegalLibrary';
import Analytics from './components/Lawyer/Analytics/Analytics';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/advogado" element={<LawyerLayout />}>
                    <Route index element={<LawyerDashboard />} />
                    <Route path="casos" element={<CaseManagement />} />
                    <Route path="biblioteca" element={<LegalLibrary />} />
                    <Route path="analytics" element={<Analytics />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;