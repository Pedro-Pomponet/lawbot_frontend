import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';

const ArticlesSection = ({ onFavorite, favorites }) => {
    const [articles, setArticles] = useState([]);
    const [filters, setFilters] = useState({
        category: 'all',
        author: '',
        year: '',
        sortBy: 'date'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadArticles();
    }, [filters]);

    const loadArticles = async () => {
        try {
            setLoading(true);
            const data = await api.getLegalArticles(filters);
            setArticles(data);
        } catch (error) {
            console.error('Erro ao carregar artigos:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="articles-section">
            <div className="articles-header">
                <h2>Artigos e Doutrinas</h2>
                <div className="filters">
                    <select
                        value={filters.category}
                        onChange={e => setFilters({
                            ...filters,
                            category: e.target.value
                        })}
                    >
                        <option value="all">Todas as Categorias</option>
                        <option value="constitutional">Direito Constitucional</option>
                        <option value="civil">Direito Civil</option>
                        <option value="criminal">Direito Criminal</option>
                        <option value="labor">Direito Trabalhista</option>
                    </select>

                    <select
                        value={filters.sortBy}
                        onChange={e => setFilters({
                            ...filters,
                            sortBy: e.target.value
                        })}
                    >
                        <option value="date">Mais Recentes</option>
                        <option value="relevance">Mais Relevantes</option>
                        <option value="citations">Mais Citados</option>
                    </select>
                </div>
            </div>

            <div className="articles-grid">
                {loading ? (
                    <div className="loading">Carregando artigos...</div>
                ) : (
                    articles.map(article => (
                        <div key={article.id} className="article-card">
                            <div className="article-header">
                                <h3>{article.title}</h3>
                                <button
                                    onClick={() => onFavorite(article.id, 'article')}
                                    className={`favorite-btn ${
                                        favorites.some(f => f.id === article.id) ? 'active' : ''
                                    }`}
                                >
                                    ★
                                </button>
                            </div>

                            <div className="article-meta">
                                <span className="author">{article.author}</span>
                                <span className="date">
                                    {formatters.formatDate(article.publishDate)}
                                </span>
                                <span className="citations">
                                    {article.citations} citações
                                </span>
                            </div>

                            <p className="article-abstract">{article.abstract}</p>

                            <div className="article-tags">
                                {article.tags.map(tag => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>

                            <div className="article-stats">
                                <div className="stat">
                                    <span className="label">Leituras</span>
                                    <span className="value">{article.reads}</span>
                                </div>
                                <div className="stat">
                                    <span className="label">Downloads</span>
                                    <span className="value">{article.downloads}</span>
                                </div>
                                <div className="stat">
                                    <span className="label">Compartilhamentos</span>
                                    <span className="value">{article.shares}</span>
                                </div>
                            </div>

                            <div className="article-actions">
                                <button className="read-btn">Ler Artigo</button>
                                <button className="download-btn">Download PDF</button>
                                <button className="cite-btn">Citar</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="articles-footer">
                <button className="load-more">Carregar Mais Artigos</button>
                <div className="submit-article">
                    <h3>Tem um artigo para publicar?</h3>
                    <button className="submit-btn">Submeter Artigo</button>
                </div>
            </div>
        </div>
    );
};

export default ArticlesSection; 