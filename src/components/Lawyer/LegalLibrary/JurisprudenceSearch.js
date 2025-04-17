import React, { useState } from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';

const JurisprudenceSearch = ({ onFavorite, favorites }) => {
    const [searchParams, setSearchParams] = useState({
        query: '',
        court: 'all',
        year: '',
        subject: ''
    });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await api.searchJurisprudence(searchParams);
            setResults(data);
        } catch (error) {
            console.error('Erro na busca:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="jurisprudence-search">
            <form onSubmit={handleSearch} className="search-form">
                <div className="search-fields">
                    <input
                        type="text"
                        placeholder="Pesquisar jurisprudência..."
                        value={searchParams.query}
                        onChange={e => setSearchParams({
                            ...searchParams,
                            query: e.target.value
                        })}
                    />
                    
                    <select
                        value={searchParams.court}
                        onChange={e => setSearchParams({
                            ...searchParams,
                            court: e.target.value
                        })}
                    >
                        <option value="all">Todos os Tribunais</option>
                        <option value="stf">STF</option>
                        <option value="stj">STJ</option>
                        <option value="trf">TRF</option>
                        <option value="tst">TST</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Ano"
                        value={searchParams.year}
                        onChange={e => setSearchParams({
                            ...searchParams,
                            year: e.target.value
                        })}
                    />

                    <select
                        value={searchParams.subject}
                        onChange={e => setSearchParams({
                            ...searchParams,
                            subject: e.target.value
                        })}
                    >
                        <option value="">Matéria</option>
                        <option value="civil">Civil</option>
                        <option value="criminal">Criminal</option>
                        <option value="trabalho">Trabalhista</option>
                        <option value="tributario">Tributário</option>
                    </select>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </form>

            <div className="results-grid">
                {results.map(result => (
                    <div key={result.id} className="jurisprudence-card">
                        <div className="card-header">
                            <h3>{result.title}</h3>
                            <button
                                onClick={() => onFavorite(result.id, 'jurisprudence')}
                                className={`favorite-btn ${
                                    favorites.some(f => f.id === result.id) ? 'active' : ''
                                }`}
                            >
                                ★
                            </button>
                        </div>

                        <div className="case-info">
                            <span>{result.court}</span>
                            <span>•</span>
                            <span>{result.number}</span>
                            <span>•</span>
                            <span>{result.date}</span>
                        </div>

                        <p className="summary">{result.summary}</p>

                        <div className="tags">
                            {result.tags.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>

                        <div className="card-actions">
                            <button className="view-btn">Ver Completo</button>
                            <button className="cite-btn">Citar</button>
                            <button className="related-btn">
                                Casos Relacionados ({result.relatedCases})
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JurisprudenceSearch; 