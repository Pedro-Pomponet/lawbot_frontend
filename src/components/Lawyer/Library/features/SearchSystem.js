import React, { useState, useEffect } from 'react';
import { 
    Search, 
    FilterList, 
    Sort, 
    Clear,
    TrendingUp 
} from '@mui/icons-material';
import './SearchSystem.css';

const SearchSystem = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        type: 'all',
        date: 'any',
        category: 'all',
        tags: [],
        ai: false
    });
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const results = await performSearch(searchTerm, filters);
            setSearchResults(results);
            updateRecentSearches(searchTerm);
        } catch (error) {
            console.error('Erro na busca:', error);
        } finally {
            setLoading(false);
        }
    };

    const performSearch = async (term, filters) => {
        // Implementar chamada à API de busca
        const response = await fetch('/api/library/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ term, filters })
        });
        return await response.json();
    };

    const updateRecentSearches = (term) => {
        setRecentSearches(prev => {
            const updated = [term, ...prev].slice(0, 5);
            localStorage.setItem('recentSearches', JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <div className="search-system">
            <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-container">
                    <Search className="search-icon" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Pesquisar na biblioteca..."
                        className="search-input"
                    />
                    {searchTerm && (
                        <Clear 
                            className="clear-icon" 
                            onClick={() => setSearchTerm('')}
                        />
                    )}
                </div>

                <button 
                    type="button" 
                    className="advanced-search-toggle"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                >
                    <FilterList />
                    Filtros Avançados
                </button>

                {showAdvanced && (
                    <div className="advanced-filters">
                        <div className="filter-group">
                            <label>Tipo de Documento</label>
                            <select 
                                value={filters.type}
                                onChange={(e) => setFilters({...filters, type: e.target.value})}
                            >
                                <option value="all">Todos</option>
                                <option value="document">Documentos</option>
                                <option value="template">Modelos</option>
                                <option value="book">Livros</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Data</label>
                            <select 
                                value={filters.date}
                                onChange={(e) => setFilters({...filters, date: e.target.value})}
                            >
                                <option value="any">Qualquer data</option>
                                <option value="today">Hoje</option>
                                <option value="week">Última semana</option>
                                <option value="month">Último mês</option>
                                <option value="year">Último ano</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Categoria</label>
                            <select 
                                value={filters.category}
                                onChange={(e) => setFilters({...filters, category: e.target.value})}
                            >
                                <option value="all">Todas</option>
                                <option value="civil">Civil</option>
                                <option value="criminal">Criminal</option>
                                <option value="trabalhista">Trabalhista</option>
                                <option value="tributario">Tributário</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={filters.ai}
                                    onChange={(e) => setFilters({...filters, ai: e.target.checked})}
                                />
                                Gerado por IA
                            </label>
                        </div>
                    </div>
                )}

                <button type="submit" className="search-button" disabled={loading}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </form>

            {recentSearches.length > 0 && (
                <div className="recent-searches">
                    <h4>
                        <TrendingUp />
                        Buscas Recentes
                    </h4>
                    <ul>
                        {recentSearches.map((term, index) => (
                            <li 
                                key={index}
                                onClick={() => setSearchTerm(term)}
                            >
                                {term}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="search-results">
                {searchResults.map(result => (
                    <div key={result.id} className="search-result-item">
                        <h3>{result.title}</h3>
                        <p>{result.excerpt}</p>
                        <div className="result-metadata">
                            <span>{result.type}</span>
                            <span>{result.date}</span>
                            <span>{result.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchSystem; 