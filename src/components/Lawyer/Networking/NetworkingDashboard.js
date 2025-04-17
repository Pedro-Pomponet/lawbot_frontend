import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import ProfessionalDirectory from './ProfessionalDirectory';
import EventsCalendar from './EventsCalendar';
import ForumDiscussions from './ForumDiscussions';
import ConnectionRequests from './ConnectionRequests';

const NetworkingDashboard = () => {
    const [networkData, setNetworkData] = useState({
        professionals: [],
        events: [],
        discussions: [],
        requests: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNetworkData();
    }, []);

    const loadNetworkData = async () => {
        try {
            const [professionals, events, discussions, requests] = await Promise.all([
                api.getProfessionals(),
                api.getNetworkEvents(),
                api.getForumDiscussions(),
                api.getConnectionRequests()
            ]);

            setNetworkData({
                professionals,
                events,
                discussions,
                requests
            });
        } catch (error) {
            console.error('Erro ao carregar dados de networking:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="networking-dashboard">
            <header className="dashboard-header">
                <h1>Networking Profissional</h1>
                <div className="quick-actions">
                    <button onClick={() => {/* Implementar */}}>
                        Novo Evento
                    </button>
                    <button onClick={() => {/* Implementar */}}>
                        Nova Discussão
                    </button>
                    <button onClick={() => {/* Implementar */}}>
                        Buscar Profissionais
                    </button>
                </div>
            </header>

            <div className="dashboard-grid">
                <ProfessionalDirectory 
                    professionals={networkData.professionals}
                    onConnect={loadNetworkData}
                />
                
                <EventsCalendar 
                    events={networkData.events}
                    onEventUpdate={loadNetworkData}
                />
                
                <ForumDiscussions 
                    discussions={networkData.discussions}
                    onDiscussionUpdate={loadNetworkData}
                />
                
                <ConnectionRequests 
                    requests={networkData.requests}
                    onRequestUpdate={loadNetworkData}
                />
            </div>
        </div>
    );
};

export default NetworkingDashboard; 