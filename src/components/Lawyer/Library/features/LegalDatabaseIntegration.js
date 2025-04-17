import React, { useState, useEffect } from 'react';
import { 
    Storage, 
    Link, 
    Sync, 
    Search,
    ImportExport,
    CheckCircle,
    Error,
    ArrowForward,
    Refresh,
    DataUsage
} from '@mui/icons-material';
import './LegalDatabaseIntegration.css';

const LegalDatabaseIntegration = () => {
    const [databases, setDatabases] = useState([]);
    const [connectedDatabases, setConnectedDatabases] = useState([]);
    const [loading, setLoading] = useState(false);
    const [syncStatus, setSyncStatus] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('connected');

    useEffect(() => {
        loadDatabases();
        loadConnectedDatabases();
    }, []);

    const loadDatabases = async () => {
        try {
            const response = await fetch('/api/legal-databases');
            const data = await response.json();
            setDatabases(data.databases);
        } catch (error) {
            console.error('Erro ao carregar bases de dados:', error);
        }
    };

    const loadConnectedDatabases = async () => {
        try {
            const response = await fetch('/api/legal-databases/connected');
            const data = await response.json();
            setConnectedDatabases(data.connectedDatabases);
            
            // Inicializar status de sincronização
            const initialStatus = {};
            data.connectedDatabases.forEach(db => {
                initialStatus[db.id] = {
                    lastSync: db.lastSync,
                    status: db.syncStatus || 'idle',
                    progress: 100
                };
            });
            setSyncStatus(initialStatus);
        } catch (error) {
            console.error('Erro ao carregar bases conectadas:', error);
        }
    };

    const connectDatabase = async (databaseId) => {
        setLoading(true);
        try {
            const response = await fetch('/api/legal-databases/connect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ databaseId })
            });
            const data = await response.json();
            
            if (data.success) {
                loadConnectedDatabases();
            }
        } catch (error) {
            console.error('Erro ao conectar base de dados:', error);
        } finally {
            setLoading(false);
        }
    };

    const disconnectDatabase = async (databaseId) => {
        setLoading(true);
        try {
            const response = await fetch('/api/legal-databases/disconnect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ databaseId })
            });
            const data = await response.json();
            
            if (data.success) {
                setConnectedDatabases(connectedDatabases.filter(db => db.id !== databaseId));
            }
        } catch (error) {
            console.error('Erro ao desconectar base de dados:', error);
        } finally {
            setLoading(false);
        }
    };

    const syncDatabase = async (databaseId) => {
        // Atualizar status para "sincronizando"
        setSyncStatus({
            ...syncStatus,
            [databaseId]: {
                ...syncStatus[databaseId],
                status: 'syncing',
                progress: 0
            }
        });

        try {
            // Iniciar sincronização
            const response = await fetch('/api/legal-databases/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ databaseId })
            });
            
            // Simular progresso de sincronização
            const syncInterval = setInterval(() => {
                setSyncStatus(prevStatus => {
                    const currentProgress = prevStatus[databaseId].progress;
                    if (currentProgress >= 100) {
                        clearInterval(syncInterval);
                        return prevStatus;
                    }
                    
                    return {
                        ...prevStatus,
                        [databaseId]: {
                            ...prevStatus[databaseId],
                            progress: currentProgress + 10
                        }
                    };
                });
            }, 500);

            // Aguardar resposta da API
            const data = await response.json();
            
            // Limpar intervalo quando a resposta chegar
            clearInterval(syncInterval);
            
            // Atualizar status final
            setSyncStatus({
                ...syncStatus,
                [databaseId]: {
                    status: data.success ? 'completed' : 'failed',
                    lastSync: data.success ? new Date().toISOString() : syncStatus[databaseId].lastSync,
                    progress: 100
                }
            });
        } catch (error) {
            console.error('Erro na sincronização:', error);
            setSyncStatus({
                ...syncStatus,
                [databaseId]: {
                    ...syncStatus[databaseId],
                    status: 'failed',
                    progress: 100
                }
            });
        }
    };

    const searchInDatabases = async () => {
        if (!searchTerm.trim()) return;
        
        setLoading(true);
        try {
            const response = await fetch(`/api/legal-databases/search?q=${encodeURIComponent(searchTerm)}`);
            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error('Erro na busca:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Nunca';
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <div className="legal-database-container">
            <div className="database-header">
                <h3>
                    <Storage />
                    Integração com Bases Jurídicas
                </h3>
                <div className="tab-navigation">
                    <button 
                        className={activeTab === 'connected' ? 'active' : ''}
                        onClick={() => setActiveTab('connected')}
                    >
                        Bases Conectadas
                    </button>
                    <button 
                        className={activeTab === 'available' ? 'active' : ''}
                        onClick={() => setActiveTab('available')}
                    >
                        Bases Disponíveis
                    </button>
                    <button 
                        className={activeTab === 'search' ? 'active' : ''}
                        onClick={() => setActiveTab('search')}
                    >
                        Busca Integrada
                    </button>
                </div>
            </div>

            <div className="database-content">
                {activeTab === 'connected' && (
                    <div className="connected-databases">
                        <h4>Bases de Dados Conectadas</h4>
                        {connectedDatabases.length === 0 ? (
                            <div className="empty-state">
                                <p>Nenhuma base de dados conectada.</p>
                                <button 
                                    onClick={() => setActiveTab('available')}
                                    className="connect-button"
                                >
                                    Conectar Base de Dados
                                </button>
                            </div>
                        ) : (
                            <div className="database-list">
                                {connectedDatabases.map(db => (
                                    <div key={db.id} className="database-item">
                                        <div className="database-info">
                                            <img src={db.logo} alt={db.name} className="database-logo" />
                                            <div>
                                                <h5>{db.name}</h5>
                                                <p>{db.description}</p>
                                                <div className="sync-info">
                                                    <span>Última sincronização: {formatDate(syncStatus[db.id]?.lastSync)}</span>
                                                    <span className={`sync-status ${syncStatus[db.id]?.status}`}>
                                                        {syncStatus[db.id]?.status === 'syncing' ? 'Sincronizando...' : 
                                                         syncStatus[db.id]?.status === 'completed' ? 'Sincronizado' : 
                                                         syncStatus[db.id]?.status === 'failed' ? 'Falha na sincronização' : 
                                                         'Aguardando sincronização'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="database-actions">
                                            <button 
                                                onClick={() => syncDatabase(db.id)}
                                                disabled={syncStatus[db.id]?.status === 'syncing'}
                                                className="sync-button"
                                            >
                                                <Sync />
                                                Sincronizar
                                            </button>
                                            <button 
                                                onClick={() => disconnectDatabase(db.id)}
                                                className="disconnect-button"
                                            >
                                                <Link />
                                                Desconectar
                                            </button>
                                        </div>
                                        {syncStatus[db.id]?.status === 'syncing' && (
                                            <div className="sync-progress">
                                                <div 
                                                    className="progress-bar" 
                                                    style={{ width: `${syncStatus[db.id].progress}%` }}
                                                ></div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'available' && (
                    <div className="available-databases">
                        <h4>Bases de Dados Disponíveis</h4>
                        <div className="database-list">
                            {databases
                                .filter(db => !connectedDatabases.some(connectedDb => connectedDb.id === db.id))
                                .map(db => (
                                    <div key={db.id} className="database-item">
                                        <div className="database-info">
                                            <img src={db.logo} alt={db.name} className="database-logo" />
                                            <div>
                                                <h5>{db.name}</h5>
                                                <p>{db.description}</p>
                                                <div className="database-meta">
                                                    <span>{db.documentCount} documentos</span>
                                                    <span>{db.type}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => connectDatabase(db.id)}
                                            disabled={loading}
                                            className="connect-button"
                                        >
                                            <Link />
                                            Conectar
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}

                {activeTab === 'search' && (
                    <div className="integrated-search">
                        <h4>Busca Integrada</h4>
                        <div className="search-form">
                            <div className="search-input-container">
                                <Search className="search-icon" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar em todas as bases conectadas..."
                                    className="search-input"
                                />
                                <button 
                                    onClick={searchInDatabases}
                                    disabled={loading || !searchTerm.trim()}
                                    className="search-button"
                                >
                                    {loading ? 'Buscando...' : 'Buscar'}
                                </button>
                            </div>
                        </div>

                        {searchResults.length > 0 && (
                            <div className="search-results">
                                <h5>Resultados da Busca</h5>
                                <div className="results-list">
                                    {searchResults.map(result => (
                                        <div key={result.id} className="result-item">
                                            <div className="result-source">
                                                <img src={result.databaseLogo} alt={result.databaseName} />
                                                <span>{result.databaseName}</span>
                                            </div>
                                            <h6>{result.title}</h6>
                                            <p>{result.excerpt}</p>
                                            <div className="result-meta">
                                                <span>{result.type}</span>
                                                <span>{result.date}</span>
                                            </div>
                                            <a href={result.url} target="_blank" rel="noopener noreferrer" className="view-link">
                                                Ver Documento
                                                <ArrowForward />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LegalDatabaseIntegration; 