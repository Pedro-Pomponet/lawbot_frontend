import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    LibraryBooks, 
    BarChart, 
    Gavel, 
    SmartToy, 
    FlashOn,
    Email,
    Phone
} from '@mui/icons-material';
import './Sidebar.css';

const Sidebar = () => {
    const [showChat, setShowChat] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const userData = location.state?.user;

    const handleNavigation = (path) => {
        navigate(path, { state: { user: userData } });
    };

    return (
        <div className="dashboard-sidebar">
            <div className="user-profile">
                <div className="profile-pic">
                    <img src={userData?.photo || '/default-avatar.png'} alt="Perfil" />
                </div>
                <div className="profile-info">
                    <h3>{userData?.name}</h3>
                    <p>OAB {userData?.oab}</p>
                    <span>{userData?.specialty}</span>
                </div>
            </div>

            <nav className="dashboard-nav">
                <Link 
                    to="/advogado"
                    className={`nav-item ${location.pathname === '/advogado' ? 'active' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavigation('/advogado');
                    }}
                >
                    <Gavel />
                    Dashboard
                </Link>

                <Link 
                    to="/advogado/biblioteca" 
                    className={`nav-item ${location.pathname === '/advogado/biblioteca' ? 'active' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavigation('/advogado/biblioteca');
                    }}
                >
                    <LibraryBooks />
                    Biblioteca Jurídica
                </Link>
                
                <Link 
                    to="/advogado/analytics" 
                    className={`nav-item ${location.pathname === '/advogado/analytics' ? 'active' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavigation('/advogado/analytics');
                    }}
                >
                    <BarChart />
                    Analytics
                </Link>
                
                <Link 
                    to="/advogado/casos" 
                    className={`nav-item ${location.pathname === '/advogado/casos' ? 'active' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavigation('/advogado/casos');
                    }}
                >
                    <Gavel />
                    Gestão de Casos
                </Link>
                
                <button 
                    className={`nav-item ai-button ${showChat ? 'active' : ''}`}
                    onClick={() => setShowChat(!showChat)}
                >
                    <SmartToy />
                    IA Jurídica
                </button>
                
                <Link 
                    to="/advogado/automacao" 
                    className={`nav-item ${location.pathname === '/advogado/automacao' ? 'active' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavigation('/advogado/automacao');
                    }}
                >
                    <FlashOn />
                    Automação
                </Link>
            </nav>

            <div className="lawyer-contact-info">
                <div className="contact-item">
                    <Email className="contact-icon" />
                    {userData?.email}
                </div>
                <div className="contact-item">
                    <Phone className="contact-icon" />
                    {userData?.phone}
                </div>
            </div>
        </div>
    );
};

export default Sidebar; 