import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Add, Notifications } from '@mui/icons-material';
import './LawyerLayout.css';

const LawyerLayout = () => {
    const location = useLocation();
    const userData = location.state?.user;

    if (!userData) {
        return <Navigate to="/" />;
    }
    
    // Função para gerar o título da página baseado na rota atual
    const getPageTitle = () => {
        switch(location.pathname) {
            case '/advogado':
                return 'Dashboard';
            case '/advogado/biblioteca':
                return 'Biblioteca Jurídica';
            case '/advogado/analytics':
                return 'Analytics';
            case '/advogado/casos':
                return 'Gestão de Casos';
            case '/advogado/automacao':
                return 'Automação';
            default:
                return 'Dashboard';
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar userData={userData} />
            <div className="dashboard-main">
                <header className="page-header">
                    <h1>{getPageTitle()}</h1>
                    <div className="header-actions">
                        <button className="action-button">
                            <Add /> Novo Caso
                        </button>
                        <button className="notification-button">
                            <Notifications />
                            <span className="notification-dot"></span>
                        </button>
                    </div>
                </header>
                <main className="page-content">
                    <Outlet context={userData} />
                </main>
            </div>
        </div>
    );
};

export default LawyerLayout; 