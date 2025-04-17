import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import { debounce } from 'lodash';

const AdvancedSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        type: 'all',
        dateRange: 'all',
        status: 'all',
        assignee: 'all'
    });
    const [results, setResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const debouncedSearch = debounce(async (term, filters) => {
        if (!term) return;
        
        try {
            setLoading(true);
            const data = await api.advancedSearch(term, filters);
            setResults(data.results);
            setSuggestions(data.suggestions);
        } catch (error) {
            console.error('Erro na busca:', error);
        } finally {
            setLoading(false);
        }
    }, 300);

    useEffect(() => {
        loadSearchHistory();
    }, []);

    const loadSearchHistory = async () => {
        try {
            const history = await api.getSearchHistory();
            setSearchHistory(history);
        } catch (error) {
            console.error('Erro ao carregar histórico:', error);
        }
    };

    const handleSearch = (term = searchTerm) => {
        debouncedSearch(term, filters);
    };

    const handleFilterChange = (filterType, value) => {
        const newFilters = { ...filters, [filterType]: value };
        setFilters(newFilters);
        handleSearch(searchTerm);
    };

    return (
        <div className="advanced-search">
            <div className="search-header">
                <div className="search-input">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Buscar em todos os módulos..."
                    />
                    <button onClick={() => handleSearch()}>
                        🔍 Buscar
                    </button>
                </div>

                <div className="search-filters">
                    <select 
                        value={filters.type}
                        onChange={e => handleFilterChange('type', e.target.value)}
                    >
                        <option value="all">Todos os Tipos</option>
                        <option value="cases">Casos</option>
                        <option value="documents">Documentos</option>
                        <option value="tasks">Tarefas</option>
                        <option value="contacts">Contatos</option>
                    </select>

                    <select 
                        value={filters.dateRange}
                        onChange={e => handleFilterChange('dateRange', e.target.value)}
                    >
                        <option value="all">Qualquer Data</option>
                        <option value="today">Hoje</option>
                        <option value="week">Esta Semana</option>
                        <option value="month">Este Mês</option>
                        <option value="year">Este Ano</option>
                    </select>

                    <select 
                        value={filters.status}
                        onChange={e => handleFilterChange('status', e.target.value)}
                    >
                        <option value="all">Todos os Status</option>
                        <option value="active">Ativo</option>
                        <option value="pending">Pendente</option>
                        <option value="completed">Concluído</option>
                    </select>
                </div>
            </div>

            {/* Sugestões */}
            {suggestions.length > 0 && (
                <div className="search-suggestions">
                    <h4>Sugestões</h4>
                    <div className="suggestions-list">
                        {suggestions.map(suggestion => (
                            <button 
                                key={suggestion}
                                onClick={() => {
                                    setSearchTerm(suggestion);
                                    handleSearch(suggestion);
                                }}
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Resultados */}
            <div className="search-results">
                {loading ? (
                    <div className="loading">Buscando...</div>
                ) : (
                    results.map(result => (
                        <div key={result.id} className="result-card">
                            <div className="result-icon">
                                {result.type === 'case' && '⚖️'}
                                {result.type === 'document' && '📄'}
                                {result.type === 'task' && '✓'}
                                {result.type === 'contact' && '👤'}
                            </div>
                            <div className="result-content">
                                <h4>{result.title}</h4>
                                <p>{result.description}</p>
                                <div className="result-meta">
                                    <span>{result.type}</span>
                                    <span>{result.date}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Histórico de Busca */}
            <div className="search-history">
                <h4>Buscas Recentes</h4>
                <div className="history-list">
                    {searchHistory.map(item => (
                        <div key={item.id} className="history-item">
                            <span onClick={() => {
                                setSearchTerm(item.term);
                                handleSearch(item.term);
                            }}>
                                {item.term}
                            </span>
                            <span className="history-date">{item.date}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdvancedSearch;