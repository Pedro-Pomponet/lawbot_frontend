import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
    Schedule,
    Gavel,
    Description,
    People,
    AttachMoney,
    TrendingUp,
    Share,
    Assignment,
    Person,
    AccessTime,
    MenuBook
} from '@mui/icons-material';
import SmartCalendar from './SmartCalendar';
import './LawyerDashboard.css';
import NetworkingCard from './NetworkingCard';
import { networkingMocks } from '../../../mocks/networkingMocks';
import LegalLibraryCard from './LegalLibraryCard';
import TaskManagementCard from './TaskManagementCard';

const mockClientAccess = [
    {
        clientId: 1,
        name: "João Silva",
        email: "joao.silva@email.com",
        lastAccess: "2024-02-20",
        sharedDocs: 5,
        pendingReviews: 2,
        status: "active",
        processos: ["0001234-12.2024.8.26.0000", "0004567-89.2024.8.26.0000"],
        documentosRecentes: [
            { id: 1, nome: "Petição Inicial.pdf", data: "2024-02-19" },
            { id: 2, nome: "Procuração.pdf", data: "2024-02-18" }
        ]
    },
    {
        clientId: 2,
        name: "Maria Santos",
        email: "maria.santos@email.com",
        lastAccess: "2024-02-19",
        sharedDocs: 3,
        pendingReviews: 1,
        status: "active",
        processos: ["0007890-12.2024.8.26.0000"],
        documentosRecentes: [
            { id: 3, nome: "Contrato Social.pdf", data: "2024-02-17" }
        ]
    }
];

const LawyerDashboard = () => {
    const location = useLocation();
    const userData = location.state?.user;
    const [loading, setLoading] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [networkingData, setNetworkingData] = useState(networkingMocks);

    const mockData = {
        financials: {
            monthlyRevenue: 45750,
            yearlyGrowth: 15,
            pendingPayments: 12000,
            activeContracts: 28
        },
        performance: {
            casesWon: 87,
            clientSatisfaction: 92,
            avgResponseTime: "2h",
            activeClients: 45
        },
        activities: {
            activeCases: 47,
            pendingDocuments: 12,
            activeClients: 28,
            weeklyTrend: '+3'
        }
    };

    const dashboardCards = [
        {
            id: 'calendar',
            title: 'Agenda Inteligente',
            icon: <Schedule />,
            component: <SmartCalendar userId={userData?.id} />,
            fullWidth: true
        },
        {
            id: 'networking',
            title: 'Networking',
            icon: <People />,
            component: <NetworkingCard data={networkingData} />,
            fullWidth: false
        },
        {
            id: 'tasks',
            title: 'Gerenciamento de Tarefas',
            icon: <Assignment />,
            component: <TaskManagementCard />,
            fullWidth: false
        },
        {
            id: 'clients',
            title: 'Portal do Cliente',
            icon: <Person />,
            component: (
                <div className="clients-grid">
                    {mockClientAccess.map(client => (
                        <div key={client.clientId} className="client-card">
                            <div className="client-header">
                                <h3>{client.name}</h3>
                                <span className={`status-badge ${client.status}`}>
                                    {client.status}
                                </span>
                            </div>
                            
                            <div className="client-info">
                                <p className="client-email">{client.email}</p>
                                <div className="info-stats">
                                    <div className="stat">
                                        <Share />
                                        <span>{client.sharedDocs} documentos</span>
                                    </div>
                                    <div className="stat">
                                        <Assignment />
                                        <span>{client.pendingReviews} pendentes</span>
                                    </div>
                                    <div className="stat">
                                        <AccessTime />
                                        <span>Último acesso: {client.lastAccess}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="client-processes">
                                <h4>Processos Ativos</h4>
                                <ul>
                                    {client.processos.map(processo => (
                                        <li key={processo}>{processo}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="recent-documents">
                                <h4>Documentos Recentes</h4>
                                <ul>
                                    {client.documentosRecentes.map(doc => (
                                        <li key={doc.id}>
                                            {doc.nome}
                                            <span>{doc.data}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="client-actions">
                                <button className="action-button">
                                    Compartilhar
                                </button>
                                <button className="action-button">
                                    Gerenciar Acesso
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ),
            fullWidth: true
        }
    ];

    return (
        <div className="lawyer-dashboard">
            <div className="dashboard-header">
                <div className="welcome-section">
                    <h1>Bem-vindo(a), {userData?.name || 'Advogado(a)'}</h1>
                    <p>Aqui está o resumo da sua atividade</p>
                </div>
            </div>

            {/* Grid Principal */}
            <div className="dashboard-grid">
                {dashboardCards.map(card => (
                    <div 
                        key={card.id} 
                        className={`dashboard-card ${card.fullWidth ? 'full-width' : ''}`}
                    >
                        {card.component ? (
                            card.component
                        ) : (
                            <>
                                <div className="card-header">
                                    <div className="card-icon">
                                        {card.icon}
                                    </div>
                                    <h3>{card.title}</h3>
                                </div>
                                <div className="card-content">
                                    <div className="card-value">{card.value}</div>
                                    <div className="card-trend">{card.trend}</div>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LawyerDashboard; 