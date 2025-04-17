import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CaseManagement from '../components/Lawyer/CaseManagement/CaseManagement';
// ... outros imports

const LawyerRoutes = () => {
    return (
        <Routes>
            <Route path="/casos" element={<CaseManagement />} />
            {/* ... outras rotas */}
        </Routes>
    );
};

export default LawyerRoutes; 