import React, { useState } from 'react';
import { Search, FilterList, Sort, Star, StarBorder } from '@mui/icons-material';
import './LegalResearch.css';

const mockSearchResults = [
    {
        id: 1,
        type: "jurisprudencia",
        title: "STJ - REsp 1234567/SP",
        snippet: "... estabelece precedente sobre responsabilidade civil em casos de...",
        relevance: 0.95,
        date: "2023-12-15",
        favorite: false
    },
    // Adicione mais resultados mock aqui
];

const LegalResearch = ({ userId }) => {
    const [searchResults, setSearchResults] = useState(mockSearchResults);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [sortBy, setSortBy] = useState('relevance');

    return (
        <div className="research-container">
            <div className="research-header">
                <h2>Pesquisa Jurídica</h2>
                <div className="search-controls">
                    <div className="search-input">
                        <Search />
                        <input 
                            type="text"
                            placeholder="Pesquisar na base jurídica..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select 
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="all">Todos os tipos</option>
                        <option value="jurisprudencia">Jurisprudência</option>
                        <option value="doutrina">Doutrina</option>
                        <option value="legislacao">Legislação</option>
                    </select>
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="relevance">Relevância</option>
                        <option value="date">Data</option>
                        <option value="citations">Citações</option>
                    </select>
                </div>
            </div>

            <div className="search-results">
                {searchResults.map(result => (
                    <div key={result.id} className="result-card">
                        <div className="result-header">
                            <span className="result-type">{result.type}</span>
                            <button className="favorite-button">
                                {result.favorite ? <Star /> : <StarBorder />}
                            </button>
                        </div>
                        <h3>{result.title}</h3>
                        <p className="result-snippet">{result.snippet}</p>
                        <div className="result-footer">
                            <span className="result-date">{result.date}</span>
                            <span className="result-relevance">
                                Relevância: {(result.relevance * 100).toFixed(1)}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LegalResearch; 