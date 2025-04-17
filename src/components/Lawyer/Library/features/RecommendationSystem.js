import React, { useState, useEffect } from 'react';
import { 
    Recommend, 
    TrendingUp, 
    Bookmarks,
    History,
    Star,
    StarBorder,
    Visibility,
    VisibilityOff,
    ThumbUp,
    ThumbDown,
    FilterList,
    Sort,
    ArrowForward
} from '@mui/icons-material';
import './RecommendationSystem.css';

const RecommendationSystem = ({ documentId, userId }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [trendingDocuments, setTrendingDocuments] = useState([]);
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('recommendations');
    const [filterType, setFilterType] = useState('all');
    const [sortBy, setSortBy] = useState('relevance');
    const [showFilters, setShowFilters] = useState(false);
    
    useEffect(() => {
        if (documentId) {
            loadRecommendations();
        }
        
        loadTrendingDocuments();
        loadRecentlyViewed();
    }, [documentId, userId]);
    
    useEffect(() => {
        if (documentId) {
            loadRecommendations();
        }
    }, [filterType, sortBy]);
    
    const loadRecommendations = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/recommendations?documentId=${documentId}&filterType=${filterType}&sortBy=${sortBy}`);
            const data = await response.json();
            setRecommendations(data.recommendations);
        } catch (error) {
            console.error('Erro ao carregar recomendações:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const loadTrendingDocuments = async () => {
        try {
            const response = await fetch('/api/documents/trending');
            const data = await response.json();
            setTrendingDocuments(data.documents);
        } catch (error) {
            console.error('Erro ao carregar documentos em alta:', error);
        }
    };
    
    const loadRecentlyViewed = async () => {
        try {
            const response = await fetch(`/api/users/${userId}/recently-viewed`);
            const data = await response.json();
            setRecentlyViewed(data.documents);
        } catch (error) {
            console.error('Erro ao carregar visualizações recentes:', error);
        }
    };
    
    const toggleFavorite = async (docId, isFavorite) => {
        try {
            await fetch(`/api/documents/${docId}/favorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isFavorite: !isFavorite })
            });
            
            // Atualizar estado local
            if (activeTab === 'recommendations') {
                setRecommendations(recommendations.map(doc => 
                    doc.id === docId ? { ...doc, isFavorite: !isFavorite } : doc
                ));
            } else if (activeTab === 'trending') {
                setTrendingDocuments(trendingDocuments.map(doc => 
                    doc.id === docId ? { ...doc, isFavorite: !isFavorite } : doc
                ));
            } else if (activeTab === 'history') {
                setRecentlyViewed(recentlyViewed.map(doc => 
                    doc.id === docId ? { ...doc, isFavorite: !isFavorite } : doc
                ));
            }
        } catch (error) {
            console.error('Erro ao atualizar favorito:', error);
        }
    };
    
    const provideFeedback = async (docId, isPositive) => {
        try {
            await fetch(`/api/recommendations/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    documentId: docId, 
                    sourceDocumentId: documentId,
                    isPositive 
                })
            });
            
            // Atualizar estado local
            setRecommendations(recommendations.map(doc => 
                doc.id === docId ? { 
                    ...doc, 
                    userFeedback: isPositive ? 'positive' : 'negative' 
                } : doc
            ));
        } catch (error) {
            console.error('Erro ao enviar feedback:', error);
        }
    };
    
    const hideRecommendation = async (docId) => {
        try {
            await fetch(`/api/recommendations/hide`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    documentId: docId, 
                    userId
                })
            });
            
            // Remover do estado local
            setRecommendations(recommendations.filter(doc => doc.id !== docId));
        } catch (error) {
            console.error('Erro ao ocultar recomendação:', error);
        }
    };
    
    const renderDocumentList = (documents, showFeedback = false) => {
        if (documents.length === 0) {
            return (
                <div className="empty-recommendations">
                    <p>Nenhum documento encontrado.</p>
                </div>
            );
        }
        
        return (
            <div className="recommendations-grid">
                {documents.map(doc => (
                    <div key={doc.id} className="recommendation-item">
                        <div className="recommendation-header">
                            <div className="document-type-tag">{doc.type}</div>
                            <button 
                                onClick={() => toggleFavorite(doc.id, doc.isFavorite)}
                                className="favorite-button"
                            >
                                {doc.isFavorite ? <Star /> : <StarBorder />}
                            </button>
                        </div>
                        
                        <h4 className="document-title">{doc.title}</h4>
                        
                        <div className="document-meta">
                            <span className="document-date">{formatDate(doc.date)}</span>
                            <span className="document-author">{doc.author}</span>
                        </div>
                        
                        <p className="document-excerpt">{doc.excerpt}</p>
                        
                        <div className="match-info">
                            <div 
                                className="match-percentage" 
                                style={{ 
                                    width: `${doc.matchPercentage}%`,
                                    background: getMatchColor(doc.matchPercentage)
                                }}
                            ></div>
                            <span>{doc.matchPercentage}% de relevância</span>
                        </div>
                        
                        <div className="recommendation-actions">
                            <a href={`/documents/${doc.id}`} className="view-document">
                                Ver Documento
                                <ArrowForward />
                            </a>
                            
                            {showFeedback && (
                                <div className="feedback-actions">
                                    <button 
                                        onClick={() => provideFeedback(doc.id, true)}
                                        className={`feedback-button ${doc.userFeedback === 'positive' ? 'active' : ''}`}
                                    >
                                        <ThumbUp />
                                    </button>
                                    <button 
                                        onClick={() => provideFeedback(doc.id, false)}
                                        className={`feedback-button ${doc.userFeedback === 'negative' ? 'active' : ''}`}
                                    >
                                        <ThumbDown />
                                    </button>
                                    <button 
                                        onClick={() => hideRecommendation(doc.id)}
                                        className="hide-button"
                                    >
                                        <VisibilityOff />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };
    
    const getMatchColor = (percentage) => {
        if (percentage >= 80) return 'var(--success-color)';
        if (percentage >= 60) return 'var(--primary-color)';
        return 'var(--warning-color)';
    };
    
    return (
        <div className="recommendation-system-container">
            <div className="recommendation-header">
                <h3>
                    <Recommend />
                    Sistema de Recomendações
                </h3>
                
                <div className="tab-navigation">
                    <button 
                        className={activeTab === 'recommendations' ? 'active' : ''}
                        onClick={() => setActiveTab('recommendations')}
                    >
                        <Recommend />
                        Recomendações
                    </button>
                    <button 
                        className={activeTab === 'trending' ? 'active' : ''}
                        onClick={() => setActiveTab('trending')}
                    >
                        <TrendingUp />
                        Em Alta
                    </button>
                    <button 
                        className={activeTab === 'history' ? 'active' : ''}
                        onClick={() => setActiveTab('history')}
                    >
                        <History />
                        Histórico
                    </button>
                </div>
            </div>
            
            <div className="recommendation-content">
                {activeTab === 'recommendations' && (
                    <>
                        <div className="recommendation-toolbar">
                            <button 
                                className="filter-toggle"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <FilterList />
                                Filtros
                            </button>
                            
                            {showFilters && (
                                <div className="filter-options">
                                    <div className="filter-group">
                                        <label>Tipo</label>
                                        <select 
                                            value={filterType}
                                            onChange={(e) => setFilterType(e.target.value)}
                                        >
                                            <option value="all">Todos</option>
                                            <option value="contract">Contratos</option>
                                            <option value="lawsuit">Processos</option>
                                            <option value="opinion">Pareceres</option>
                                            <option value="article">Artigos</option>
                                        </select>
                                    </div>
                                    
                                    <div className="filter-group">
                                        <label>Ordenar por</label>
                                        <select 
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                        >
                                            <option value="relevance">Relevância</option>
                                            <option value="date">Data</option>
                                            <option value="title">Título</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {loading ? (
                            <div className="loading-recommendations">
                                <p>Carregando recomendações...</p>
                            </div>
                        ) : (
                            renderDocumentList(recommendations, true)
                        )}
                    </>
                )}
                
                {activeTab === 'trending' && (
                    <div className="trending-section">
                        <h4>Documentos em Alta</h4>
                        {renderDocumentList(trendingDocuments)}
                    </div>
                )}
                
                {activeTab === 'history' && (
                    <div className="history-section">
                        <h4>Visualizados Recentemente</h4>
                        {renderDocumentList(recentlyViewed)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecommendationSystem; 