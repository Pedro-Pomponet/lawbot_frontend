import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';

const NetworkingSystem = () => {
    const [activeTab, setActiveTab] = useState('correspondents');
    const [networkData, setNetworkData] = useState({
        correspondents: [],
        partnerships: [],
        referrals: [],
        events: [],
        opportunities: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNetworkData();
    }, []);

    const loadNetworkData = async () => {
        try {
            const data = await api.getNetworkingData();
            setNetworkData(data);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="networking-system">
            <nav className="network-nav">
                <button 
                    className={activeTab === 'correspondents' ? 'active' : ''}
                    onClick={() => setActiveTab('correspondents')}
                >
                    Correspondentes
                </button>
                <button 
                    className={activeTab === 'partnerships' ? 'active' : ''}
                    onClick={() => setActiveTab('partnerships')}
                >
                    Parcerias
                </button>
                <button 
                    className={activeTab === 'referrals' ? 'active' : ''}
                    onClick={() => setActiveTab('referrals')}
                >
                    Indicações
                </button>
                <button 
                    className={activeTab === 'events' ? 'active' : ''}
                    onClick={() => setActiveTab('events')}
                >
                    Eventos
                </button>
                <button 
                    className={activeTab === 'opportunities' ? 'active' : ''}
                    onClick={() => setActiveTab('opportunities')}
                >
                    Oportunidades
                </button>
            </nav>

            <div className="network-content">
                {/* Rede de Correspondentes */}
                {activeTab === 'correspondents' && (
                    <div className="correspondents-section">
                        <div className="section-header">
                            <h2>Rede de Correspondentes</h2>
                            <button className="add-btn">+ Adicionar Correspondente</button>
                        </div>
                        <div className="correspondents-grid">
                            {networkData.correspondents.map(corr => (
                                <div key={corr.id} className="correspondent-card">
                                    <div className="profile-header">
                                        <img src={corr.photo} alt={corr.name} />
                                        <div className="profile-info">
                                            <h3>{corr.name}</h3>
                                            <span>{corr.location}</span>
                                        </div>
                                    </div>
                                    <div className="specialties">
                                        {corr.specialties.map((spec, i) => (
                                            <span key={i} className="specialty-tag">{spec}</span>
                                        ))}
                                    </div>
                                    <div className="rating">
                                        ⭐ {corr.rating} ({corr.totalCases} casos)
                                    </div>
                                    <button className="contact-btn">Contatar</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Parcerias Estratégicas */}
                {activeTab === 'partnerships' && (
                    <div className="partnerships-section">
                        <div className="section-header">
                            <h2>Parcerias Estratégicas</h2>
                            <button className="add-btn">+ Nova Parceria</button>
                        </div>
                        <div className="partnerships-list">
                            {networkData.partnerships.map(partner => (
                                <div key={partner.id} className="partnership-card">
                                    <div className="partner-info">
                                        <img src={partner.logo} alt={partner.name} />
                                        <div>
                                            <h3>{partner.name}</h3>
                                            <p>{partner.description}</p>
                                        </div>
                                    </div>
                                    <div className="partnership-details">
                                        <div className="detail-item">
                                            <span>Tipo de Parceria</span>
                                            <strong>{partner.type}</strong>
                                        </div>
                                        <div className="detail-item">
                                            <span>Início</span>
                                            <strong>{partner.startDate}</strong>
                                        </div>
                                        <div className="detail-item">
                                            <span>Status</span>
                                            <strong className={`status ${partner.status}`}>
                                                {partner.status}
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Indicações de Clientes */}
                {activeTab === 'referrals' && (
                    <div className="referrals-section">
                        <div className="section-header">
                            <h2>Indicações de Clientes</h2>
                            <button className="add-btn">+ Nova Indicação</button>
                        </div>
                        <div className="referrals-stats">
                            <div className="stat-card">
                                <span>Total de Indicações</span>
                                <strong>{networkData.referrals.total}</strong>
                            </div>
                            <div className="stat-card">
                                <span>Conversões</span>
                                <strong>{networkData.referrals.conversions}%</strong>
                            </div>
                        </div>
                        <div className="referrals-list">
                            {networkData.referrals.list.map(ref => (
                                <div key={ref.id} className="referral-card">
                                    <div className="referral-info">
                                        <h4>{ref.clientName}</h4>
                                        <p>{ref.description}</p>
                                    </div>
                                    <div className="referral-meta">
                                        <span>Indicado por: {ref.referredBy}</span>
                                        <span>Data: {ref.date}</span>
                                        <span className={`status ${ref.status}`}>
                                            {ref.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Eventos do Setor */}
                {activeTab === 'events' && (
                    <div className="events-section">
                        <div className="section-header">
                            <h2>Eventos do Setor</h2>
                            <button className="add-btn">+ Adicionar Evento</button>
                        </div>
                        <div className="events-calendar">
                            {networkData.events.map(event => (
                                <div key={event.id} className="event-card">
                                    <div className="event-date">
                                        <span className="day">{event.day}</span>
                                        <span className="month">{event.month}</span>
                                    </div>
                                    <div className="event-info">
                                        <h3>{event.title}</h3>
                                        <p>{event.description}</p>
                                        <div className="event-meta">
                                            <span>🕒 {event.time}</span>
                                            <span>📍 {event.location}</span>
                                        </div>
                                    </div>
                                    <div className="event-actions">
                                        <button className="register-btn">
                                            {event.registered ? 'Inscrito' : 'Inscrever-se'}
                                        </button>
                                        <button className="details-btn">
                                            Ver Detalhes
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Oportunidades de Negócio */}
                {activeTab === 'opportunities' && (
                    <div className="opportunities-section">
                        <div className="section-header">
                            <h2>Oportunidades de Negócio</h2>
                            <button className="add-btn">+ Nova Oportunidade</button>
                        </div>
                        <div className="opportunities-grid">
                            {networkData.opportunities.map(opp => (
                                <div key={opp.id} className="opportunity-card">
                                    <div className="opportunity-header">
                                        <h3>{opp.title}</h3>
                                        <span className={`status ${opp.status}`}>
                                            {opp.status}
                                        </span>
                                    </div>
                                    <p>{opp.description}</p>
                                    <div className="opportunity-details">
                                        <div className="detail-item">
                                            <span>Área</span>
                                            <strong>{opp.area}</strong>
                                        </div>
                                        <div className="detail-item">
                                            <span>Potencial</span>
                                            <strong>R$ {opp.potential}</strong>
                                        </div>
                                        <div className="detail-item">
                                            <span>Prazo</span>
                                            <strong>{opp.deadline}</strong>
                                        </div>
                                    </div>
                                    <button className="interest-btn">
                                        Demonstrar Interesse
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NetworkingSystem; 