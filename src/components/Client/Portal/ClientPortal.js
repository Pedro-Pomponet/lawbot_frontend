import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import CaseUpdates from './CaseUpdates';
import DocumentSharing from './DocumentSharing';
import MeetingScheduler from './MeetingScheduler';
import FeedbackSystem from './FeedbackSystem';

const ClientPortal = () => {
    const [clientData, setClientData] = useState({
        cases: [],
        documents: [],
        meetings: [],
        notifications: []
    });
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('updates');

    useEffect(() => {
        loadClientData();
    }, []);

    const loadClientData = async () => {
        try {
            setLoading(true);
            const data = await api.getClientPortalData();
            setClientData(data);
        } catch (error) {
            console.error('Erro ao carregar dados do portal:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="client-portal">
            <header className="portal-header">
                <h1>Portal do Cliente</h1>
                <div className="notifications">
                    <button className="notification-btn">
                        🔔 {clientData.notifications.length}
                    </button>
                </div>
            </header>

            <nav className="portal-nav">
                <button 
                    className={activeSection === 'updates' ? 'active' : ''}
                    onClick={() => setActiveSection('updates')}
                >
                    Atualizações
                </button>
                <button 
                    className={activeSection === 'documents' ? 'active' : ''}
                    onClick={() => setActiveSection('documents')}
                >
                    Documentos
                </button>
                <button 
                    className={activeSection === 'meetings' ? 'active' : ''}
                    onClick={() => setActiveSection('meetings')}
                >
                    Reuniões
                </button>
                <button 
                    className={activeSection === 'feedback' ? 'active' : ''}
                    onClick={() => setActiveSection('feedback')}
                >
                    Feedback
                </button>
            </nav>

            <div className="portal-content">
                {activeSection === 'updates' && (
                    <CaseUpdates 
                        cases={clientData.cases}
                        loading={loading}
                    />
                )}
                {activeSection === 'documents' && (
                    <DocumentSharing 
                        documents={clientData.documents}
                        loading={loading}
                    />
                )}
                {activeSection === 'meetings' && (
                    <MeetingScheduler 
                        meetings={clientData.meetings}
                        loading={loading}
                    />
                )}
                {activeSection === 'feedback' && (
                    <FeedbackSystem 
                        loading={loading}
                    />
                )}
            </div>
        </div>
    );
};

export default ClientPortal; 