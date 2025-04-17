import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';

const LegalArticles = () => {
    const [articles, setArticles] = useState([]);
    const [filters, setFilters] = useState({
        category: 'all',
        sortBy: 'date',
        searchTerm: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadArticles();
    }, [filters]);

    const loadArticles = async () => {
        try {
            const data = await api.getLegalArticles(filters);
            setArticles(data);
        } catch (error) {
            console.error('Erro ao carregar artigos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        loadArticles();
    };

    return (
        <div className="legal-articles">
            <div className="articles-header">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Pesquisar artigos e doutrinas..."
                        value={filters.searchTerm}
                        onChange={e => setFilters(prev => ({
                            ...prev,
                            searchTerm: e.target.value
                        }))}
                    />
                    <select
                        value={filters.category}
                        onChange={e => setFilters(prev => ({
                            ...prev,
                            category: e.target.value
                        }))}
                    >
                        <option value="all">Todas as Categorias</option>
                        <option value="doctrine">Doutrina</option>
                        <option value="article">Artigo</option>
                        <option value="thesis">Tese</option>
                        <option value="review">Revista</option>
                    </select>
                    <select
                        value={filters.sortBy}
                        onChange={e => setFilters(prev => ({
                            ...prev,
                            sortBy: e.target.value
                        }))}
                    >
                        <option value="date">Mais Recentes</option>
                        <option value="relevance">Relevância</option>
                        <option value="citations">Citações</option>
                    </select>
                    <button type="submit">Pesquisar</button>
                </form>
            </div>

            <div className="articles-grid">
                {articles.map(article => (
                    <div key={article.id} className="article-card">
                        <div className="article-header">
                            <h3>{article.title}</h3>
                            <div className="article-meta">
                                <span className="author">{article.author}</span>
                                <span className="date">
                                    {formatters.formatDate(article.publishDate)}
                                </span>
                            </div>
                        </div>

                        <div className="article-tags">
                            {article.tags.map((tag, index) => (
                                <span key={index} className="tag">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <p className="article-abstract">{article.abstract}</p>

                        <div className="article-stats">
                            <div className="stat">
                                <span className="label">Citações</span>
                                <span className="value">{article.citations}</span>
                            </div>
                            <div className="stat">
                                <span className="label">Downloads</span>
                                <span className="value">{article.downloads}</span>
                            </div>
                            <div className="stat">
                                <span className="label">Leituras</span>
                                <span className="value">{article.reads}</span>
                            </div>
                        </div>

                        <div className="article-actions">
                            <button className="read-btn">Ler</button>
                            <button className="download-btn">Download</button>
                            <button className="cite-btn">Citar</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="articles-footer">
                <button 
                    className="load-more"
                    onClick={() => loadArticles()}
                >
                    Carregar Mais
                </button>
                <div className="submit-article">
                    <p>Tem um artigo para compartilhar?</p>
                    <button className="submit-btn">
                        Submeter Artigo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LegalArticles; 