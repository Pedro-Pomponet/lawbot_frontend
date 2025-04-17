import React from 'react';
import { Link } from 'react-router-dom';
import { 
    People, 
    Event, 
    Forum, 
    NotificationsActive,
    BusinessCenter,
    School,
    LocationOn,
    ArrowForward
} from '@mui/icons-material';
import './NetworkingCard.css';

const NetworkingCard = ({ data }) => {
    const mockNetworkData = {
        stats: {
            connections: 2,
            events: 1,
            discussions: 1,
            requests: 1
        },
        recentConnections: [
            {
                id: 1,
                name: "Dra. Juliana Lima",
                specialty: "Direito Tributário",
                location: "Curitiba, PR",
                avatar: "/avatars/juliana.jpg",
                mutualConnections: 5,
                status: "pending"
            }
        ],
        upcomingEvents: [
            {
                id: 1,
                title: "Congresso de Direito Digital",
                date: "2024-03-25",
                time: "14:00",
                location: "Centro de Convenções",
                participants: 150,
                type: "Presencial"
            }
        ],
        opportunities: [
            {
                id: 1,
                title: "Parceria em Caso Tributário",
                author: "Dr. Ricardo Santos",
                area: "Tributário",
                location: "São Paulo, SP",
                type: "Colaboração"
            }
        ]
    };

    return (
        <div className="networking-card dashboard-card">
            <div className="card-header">
                <h3>Networking</h3>
                <Link to="/advogado/networking" className="view-all">Ver tudo</Link>
            </div>

            <div className="network-stats">
                <div className="stat-item">
                    <People />
                    <div className="stat-info">
                        <span className="stat-value">{mockNetworkData.stats.connections}</span>
                        <span className="stat-label">Conexões</span>
                    </div>
                </div>

                <div className="stat-item">
                    <Event />
                    <div className="stat-info">
                        <span className="stat-value">{mockNetworkData.stats.events}</span>
                        <span className="stat-label">Eventos</span>
                    </div>
                </div>

                <div className="stat-item">
                    <Forum />
                    <div className="stat-info">
                        <span className="stat-value">{mockNetworkData.stats.discussions}</span>
                        <span className="stat-label">Discussões</span>
                    </div>
                </div>

                <div className="stat-item">
                    <NotificationsActive />
                    <div className="stat-info">
                        <span className="stat-value">{mockNetworkData.stats.requests}</span>
                        <span className="stat-label">Solicitações</span>
                    </div>
                </div>
            </div>

            <div className="network-sections">
                <div className="section-connections">
                    <h4>Solicitações de Conexão</h4>
                    {mockNetworkData.recentConnections.map(connection => (
                        <div key={connection.id} className="connection-item">
                            <img src={connection.avatar} alt="" className="connection-avatar" />
                            <div className="connection-info">
                                <div className="connection-header">
                                    <p><strong>{connection.name}</strong></p>
                                    <span className="mutual-connections">
                                        {connection.mutualConnections} conexões em comum
                                    </span>
                                </div>
                                <div className="connection-details">
                                    <span className="specialty">
                                        <BusinessCenter />
                                        {connection.specialty}
                                    </span>
                                    <span className="location">
                                        <LocationOn />
                                        {connection.location}
                                    </span>
                                </div>
                                <div className="connection-actions">
                                    <button className="accept-btn">Aceitar</button>
                                    <button className="reject-btn">Recusar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="section-events">
                    <h4>Próximos Eventos</h4>
                    {mockNetworkData.upcomingEvents.map(event => (
                        <div key={event.id} className="event-item">
                            <div className="event-icon">
                                <School />
                            </div>
                            <div className="event-info">
                                <p><strong>{event.title}</strong></p>
                                <div className="event-details">
                                    <span>
                                        <Event /> {new Date(event.date).toLocaleDateString()} às {event.time}
                                    </span>
                                    <span>
                                        <LocationOn /> {event.location}
                                    </span>
                                    <span>
                                        <People /> {event.participants} participantes
                                    </span>
                                </div>
                                <button className="register-btn">
                                    Inscrever-se <ArrowForward />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="section-opportunities">
                    <h4>Oportunidades de Colaboração</h4>
                    {mockNetworkData.opportunities.map(opportunity => (
                        <div key={opportunity.id} className="opportunity-item">
                            <div className="opportunity-icon">
                                <BusinessCenter />
                            </div>
                            <div className="opportunity-info">
                                <p><strong>{opportunity.title}</strong></p>
                                <div className="opportunity-details">
                                    <span>{opportunity.author}</span>
                                    <span>{opportunity.area}</span>
                                    <span>{opportunity.location}</span>
                                </div>
                                <button className="details-btn">
                                    Ver Detalhes <ArrowForward />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NetworkingCard; 