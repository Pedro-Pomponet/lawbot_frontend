import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';

const LegislationUpdates = () => {
    const [updates, setUpdates] = useState([]);
    const [filters, setFilters] = useState({
        area: 'all',
        type: 'all',
        status: 'active'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUpdates();
    }, [filters]);

    const loadUpdates = async () => {
        try {
            const data = await api.getLegislationUpdates(filters);
            setUpdates(data);
        } catch (error) {
            console.error('Erro ao carregar atualizações:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="legislation-updates">
            <div className="updates-header">
                <div className="filters">
                    <select
                        value={filters.area}
                        onChange={e => setFilters(prev => ({
                            ...prev,
                            area: e.target.value
                        }))}
                    >
                        <option value="all">Todas as Áreas</option>
                        <option value="civil">Civil</option>
                        <option value="criminal">Criminal</option>
                        <option value="labor">Trabalhista</option>
                        <option value="tax">Tributário</option>
                    </select>

                    <select
                        value={filters.type}
                        onChange={e => setFilters(prev => ({
                            ...prev,
                            type: e.target.value
                        }))}
                    >
                        <option value="all">Todos os Tipos</option>
                        <option value="law">Lei</option>
                        <option value="decree">Decreto</option>
                        <option value="resolution">Resolução</option>
                    </select>

                    <select
                        value={filters.status}
                        onChange={e => setFilters(prev => ({
                            ...prev,
                            status: e.target.value
                        }))}
                    >
                        <option value="active">Em Vigor</option>
                        <option value="pending">Pendente</option>
                        <option value="revoked">Revogada</option>
                    </select>
                </div>
            </div>

            <div className="updates-list">
                {updates.map(update => (
                    <div key={update.id} className="update-card">
                        <div className="update-header">
                            <h3>{update.title}</h3>
                            <span className={`status ${update.status}`}>
                                {update.statusText}
                            </span>
                        </div>

                        <div className="update-content">
                            <p>{update.description}</p>
                            <div className="update-meta">
                                <span>Publicação: {update.publishDate}</span>
                                <span>Vigência: {update.effectiveDate}</span>
                            </div>
                            {update.changes && (
                                <div className="changes-list">
                                    <h4>Principais Alterações:</h4>
                                    <ul>
                                        {update.changes.map((change, index) => (
                                            <li key={index}>{change}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="update-actions">
                            <button className="view-full-btn">
                                Ver Completo
                            </button>
                            <button className="save-btn">
                                Salvar
                            </button>
                            <button className="share-btn">
                                Compartilhar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LegislationUpdates; 