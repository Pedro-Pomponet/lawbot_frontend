import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';

const LegislationBrowser = ({ onFavorite, favorites }) => {
    const [legislation, setLegislation] = useState([]);
    const [activeCases, setActiveCases] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadLegislation();
        loadActiveCases();
    }, []);

    const loadLegislation = async () => {
        setLoading(true);
        try {
            const data = await api.getLegislation(selectedCategory);
            setLegislation(data);
        } catch (error) {
            console.error('Erro ao carregar legislação:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadActiveCases = async () => {
        try {
            const cases = await api.getActiveCases();
            setActiveCases(cases);
        } catch (error) {
            console.error('Erro ao carregar casos:', error);
        }
    };

    const checkLawRelevance = (lawId) => {
        return activeCases.some(activeCase => 
            activeCase.relevantLaws.includes(lawId)
        );
    };

    const getRelatedCases = (lawId) => {
        return activeCases.filter(activeCase => 
            activeCase.relevantLaws.includes(lawId)
        );
    };

    return (
        <div className="legislation-browser">
            <div className="browser-header">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Pesquisar legislação..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="category-filter">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">Todas as Áreas</option>
                        <option value="constitutional">Constitucional</option>
                        <option value="civil">Civil</option>
                        <option value="criminal">Criminal</option>
                        <option value="labor">Trabalhista</option>
                        <option value="tax">Tributário</option>
                    </select>
                </div>
            </div>

            <div className="legislation-grid">
                {legislation.map(law => {
                    const isRelevant = checkLawRelevance(law.id);
                    const relatedCases = getRelatedCases(law.id);

                    return (
                        <div 
                            key={law.id} 
                            className={`law-card ${isRelevant ? 'relevant' : ''}`}
                        >
                            {isRelevant && (
                                <div className="relevance-alert">
                                    ⚠️ Lei relacionada a {relatedCases.length} 
                                    {relatedCases.length === 1 ? ' caso' : ' casos'} ativos
                                </div>
                            )}

                            <div className="law-header">
                                <h3>{law.name}</h3>
                                <button
                                    onClick={() => onFavorite(law.id, 'legislation')}
                                    className={`favorite-btn ${
                                        favorites.some(f => f.id === law.id) ? 'active' : ''
                                    }`}
                                >
                                    ★
                                </button>
                            </div>

                            <div className="law-meta">
                                <span>{law.number}</span>
                                <span>•</span>
                                <span>{law.date}</span>
                                <span>•</span>
                                <span>{law.status}</span>
                            </div>

                            <p className="law-description">{law.description}</p>

                            {isRelevant && (
                                <div className="related-cases">
                                    <h4>Casos Relacionados:</h4>
                                    <ul>
                                        {relatedCases.map(activeCase => (
                                            <li key={activeCase.id}>
                                                <a href={`/cases/${activeCase.id}`}>
                                                    {activeCase.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="law-actions">
                                <button className="view-btn">Ver Completo</button>
                                <button className="history-btn">Histórico</button>
                                <button className="annotations-btn">
                                    Anotações ({law.annotations?.length || 0})
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LegislationBrowser; 