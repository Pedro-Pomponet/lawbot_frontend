import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import './ClientDashboard.css';
import {
    Description,
    Chat,
    Notifications,
    Timeline,
    Person,
    Email,
    Phone
} from '@mui/icons-material';

const ClientDashboard = () => {
    const location = useLocation();
    const userData = location.state?.user;

    if (!userData) {
        return <Navigate to="/" />;
    }

    return (
        <div className="client-dashboard">
            <header className="dashboard-header">
                <div className="user-profile">
                    <Person className="profile-icon" />
                    <div className="user-info">
                        <h2>Bem-vindo, {userData.name}!</h2>
                        <div className="user-contacts">
                            <span><Email /> {userData.email}</span>
                            <span><Phone /> {userData.phone}</span>
                        </div>
                    </div>
                </div>
                <button className="notifications-btn">
                    <Notifications />
                </button>
            </header>

            <div className="dashboard-content">
                <div className="feature-cards">
                    <div className="feature-card">
                        <Timeline className="feature-icon" />
                        <h3>Acompanhamento de Processos</h3>
                        <p>Visualize o andamento dos seus processos em tempo real</p>
                        <button className="coming-soon">Em breve</button>
                    </div>
                    <div className="feature-card">
                        <Description className="feature-icon" />
                        <h3>Documentos</h3>
                        <p>Acesse e envie documentos relacionados ao seu caso</p>
                        <button className="coming-soon">Em breve</button>
                    </div>
                    <div className="feature-card">
                        <Chat className="feature-icon" />
                        <h3>Chat com Advogado</h3>
                        <p>Comunique-se diretamente com seu advogado</p>
                        <button className="coming-soon">Em breve</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard; 