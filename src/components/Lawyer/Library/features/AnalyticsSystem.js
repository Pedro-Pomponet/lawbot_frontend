import React, { useState, useEffect } from 'react';
import { 
    BarChart, 
    PieChart, 
    Timeline, 
    TrendingUp,
    TrendingDown,
    CalendarToday,
    FilterList,
    GetApp,
    Print,
    Refresh,
    Category,
    Description,
    AccessTime,
    Search,
    Group,
    Assessment,
    DateRange
} from '@mui/icons-material';
import './AnalyticsSystem.css';

const AnalyticsSystem = ({ userId }) => {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [dateRange, setDateRange] = useState('month');
    const [category, setCategory] = useState('all');
    const [analyticsData, setAnalyticsData] = useState({
        overview: {},
        documents: {},
        searches: {},
        usage: {}
    });
    
    useEffect(() => {
        loadAnalyticsData();
    }, [userId, dateRange]);
    
    const loadAnalyticsData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/analytics?userId=${userId}&dateRange=${dateRange}`);
            const data = await response.json();
            setAnalyticsData(data);
        } catch (error) {
            console.error('Erro ao carregar dados analíticos:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const formatNumber = (num) => {
        return new Intl.NumberFormat('pt-BR').format(num);
    };
    
    const formatPercentage = (value) => {
        return `${value.toFixed(1)}%`;
    };
    
    const getChangeClass = (change) => {
        if (change > 0) return 'positive-change';
        if (change < 0) return 'negative-change';
        return '';
    };
    
    const getChangeIcon = (change) => {
        if (change > 0) return <TrendingUp />;
        if (change < 0) return <TrendingDown />;
        return null;
    };
    
    const renderOverviewTab = () => {
        const { totalDocuments, totalSearches, activeUsers, avgSessionTime, topCategories, recentActivity } = analyticsData.overview;
        
        return (
            <div className="analytics-overview">
                <div className="metrics-grid">
                    <div className="metric-card">
                        <div className="metric-icon">
                            <Description />
                        </div>
                        <div className="metric-content">
                            <h4>Total de Documentos</h4>
                            <div className="metric-value">
                                {loading ? '...' : formatNumber(totalDocuments?.value || 0)}
                                {totalDocuments?.change !== 0 && (
                                    <span className={`change-indicator ${getChangeClass(totalDocuments?.change)}`}>
                                        {getChangeIcon(totalDocuments?.change)}
                                        {formatPercentage(Math.abs(totalDocuments?.change || 0))}
                                    </span>
                                )}
                            </div>
                            <p className="metric-period">vs. período anterior</p>
                        </div>
                    </div>
                    
                    <div className="metric-card">
                        <div className="metric-icon">
                            <Search />
                        </div>
                        <div className="metric-content">
                            <h4>Total de Buscas</h4>
                            <div className="metric-value">
                                {loading ? '...' : formatNumber(totalSearches?.value || 0)}
                                {totalSearches?.change !== 0 && (
                                    <span className={`change-indicator ${getChangeClass(totalSearches?.change)}`}>
                                        {getChangeIcon(totalSearches?.change)}
                                        {formatPercentage(Math.abs(totalSearches?.change || 0))}
                                    </span>
                                )}
                            </div>
                            <p className="metric-period">vs. período anterior</p>
                        </div>
                    </div>
                    
                    <div className="metric-card">
                        <div className="metric-icon">
                            <Group />
                        </div>
                        <div className="metric-content">
                            <h4>Usuários Ativos</h4>
                            <div className="metric-value">
                                {loading ? '...' : formatNumber(activeUsers?.value || 0)}
                                {activeUsers?.change !== 0 && (
                                    <span className={`change-indicator ${getChangeClass(activeUsers?.change)}`}>
                                        {getChangeIcon(activeUsers?.change)}
                                        {formatPercentage(Math.abs(activeUsers?.change || 0))}
                                    </span>
                                )}
                            </div>
                            <p className="metric-period">vs. período anterior</p>
                        </div>
                    </div>
                    
                    <div className="metric-card">
                        <div className="metric-icon">
                            <AccessTime />
                        </div>
                        <div className="metric-content">
                            <h4>Tempo Médio de Sessão</h4>
                            <div className="metric-value">
                                {loading ? '...' : `${avgSessionTime?.value || 0} min`}
                                {avgSessionTime?.change !== 0 && (
                                    <span className={`change-indicator ${getChangeClass(avgSessionTime?.change)}`}>
                                        {getChangeIcon(avgSessionTime?.change)}
                                        {formatPercentage(Math.abs(avgSessionTime?.change || 0))}
                                    </span>
                                )}
                            </div>
                            <p className="metric-period">vs. período anterior</p>
                        </div>
                    </div>
                </div>
                
                <div className="analytics-charts">
                    <div className="chart-container">
                        <h4>Categorias Mais Acessadas</h4>
                        <div className="chart-content">
                            {loading ? (
                                <div className="loading-chart">Carregando...</div>
                            ) : (
                                <div className="categories-chart">
                                    {topCategories?.map((category, index) => (
                                        <div key={index} className="category-bar">
                                            <div className="category-name">{category.name}</div>
                                            <div className="category-progress">
                                                <div 
                                                    className="category-progress-bar"
                                                    style={{ width: `${category.percentage}%` }}
                                                ></div>
                                            </div>
                                            <div className="category-value">{category.count}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="chart-container">
                        <h4>Atividade Recente</h4>
                        <div className="chart-content">
                            {loading ? (
                                <div className="loading-chart">Carregando...</div>
                            ) : (
                                <div className="activity-timeline">
                                    {recentActivity?.map((activity, index) => (
                                        <div key={index} className="activity-item">
                                            <div className="activity-time">{activity.time}</div>
                                            <div className="activity-details">
                                                <div className="activity-type">{activity.type}</div>
                                                <div className="activity-description">{activity.description}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    
    const renderDocumentsTab = () => {
        const { documentsByType, documentsByStatus, mostViewedDocuments, documentTrends } = analyticsData.documents;
        
        return (
            <div className="documents-analytics">
                <div className="analytics-charts">
                    <div className="chart-container">
                        <h4>Documentos por Tipo</h4>
                        <div className="chart-content">
                            {loading ? (
                                <div className="loading-chart">Carregando...</div>
                            ) : (
                                <div className="pie-chart-container">
                                    <div className="pie-chart-visual">
                                        {/* Aqui seria renderizado um gráfico de pizza real */}
                                        <div className="pie-chart-placeholder">
                                            <PieChart />
                                        </div>
                                    </div>
                                    <div className="pie-chart-legend">
                                        {documentsByType?.map((item, index) => (
                                            <div key={index} className="legend-item">
                                                <div 
                                                    className="legend-color" 
                                                    style={{ backgroundColor: item.color }}
                                                ></div>
                                                <div className="legend-label">{item.type}</div>
                                                <div className="legend-value">{item.count}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="chart-container">
                        <h4>Documentos por Status</h4>
                        <div className="chart-content">
                            {loading ? (
                                <div className="loading-chart">Carregando...</div>
                            ) : (
                                <div className="status-bars">
                                    {documentsByStatus?.map((status, index) => (
                                        <div key={index} className="status-bar">
                                            <div className="status-name">{status.name}</div>
                                            <div className="status-progress">
                                                <div 
                                                    className="status-progress-bar"
                                                    style={{ 
                                                        width: `${status.percentage}%`,
                                                        backgroundColor: status.color
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="status-value">{status.count}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="analytics-tables">
                    <div className="table-container">
                        <h4>Documentos Mais Visualizados</h4>
                        <div className="table-content">
                            {loading ? (
                                <div className="loading-table">Carregando...</div>
                            ) : (
                                <table className="analytics-table">
                                    <thead>
                                        <tr>
                                            <th>Documento</th>
                                            <th>Tipo</th>
                                            <th>Visualizações</th>
                                            <th>Última Visualização</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mostViewedDocuments?.map((doc, index) => (
                                            <tr key={index}>
                                                <td>{doc.title}</td>
                                                <td>{doc.type}</td>
                                                <td>{doc.views}</td>
                                                <td>{doc.lastViewed}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                    
                    <div className="chart-container">
                        <h4>Tendências de Documentos</h4>
                        <div className="chart-content">
                            {loading ? (
                                <div className="loading-chart">Carregando...</div>
                            ) : (
                                <div className="trend-chart">
                                    {/* Aqui seria renderizado um gráfico de linha real */}
                                    <div className="trend-chart-placeholder">
                                        <Timeline />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    
    const renderSearchesTab = () => {
        const { topSearchTerms, searchTrends, searchResults, averageSearchTime } = analyticsData.searches;
        
        return (
            <div className="searches-analytics">
                <div className="analytics-charts">
                    <div className="chart-container">
                        <h4>Termos de Busca Mais Populares</h4>
                        <div className="chart-content">
                            {loading ? (
                                <div className="loading-chart">Carregando...</div>
                            ) : (
                                <div className="search-terms-chart">
                                    {topSearchTerms?.map((term, index) => (
                                        <div key={index} className="search-term-item">
                                            <div className="term-rank">{index + 1}</div>
                                            <div className="term-name">{term.term}</div>
                                            <div className="term-progress">
                                                <div 
                                                    className="term-progress-bar"
                                                    style={{ width: `${term.percentage}%` }}
                                                ></div>
                                            </div>
                                            <div className="term-count">{term.count}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="chart-container">
                        <h4>Tendências de Busca</h4>
                        <div className="chart-content">
                            {loading ? (
                                <div className="loading-chart">Carregando...</div>
                            ) : (
                                <div className="trend-chart">
                                    {/* Aqui seria renderizado um gráfico de linha real */}
                                    <div className="trend-chart-placeholder">
                                        <Timeline />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="analytics-tables">
                    <div className="table-container">
                        <h4>Resultados de Busca</h4>
                        <div className="table-content">
                            {loading ? (
                                <div className="loading-table">Carregando...</div>
                            ) : (
                                <table className="analytics-table">
                                    <thead>
                                        <tr>
                                            <th>Métrica</th>
                                            <th>Valor</th>
                                            <th>Mudança</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchResults?.map((result, index) => (
                                            <tr key={index}>
                                                <td>{result.name}</td>
                                                <td>{result.value}</td>
                                                <td className={getChangeClass(result.change)}>
                                                    {getChangeIcon(result.change)}
                                                    {formatPercentage(Math.abs(result.change))}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                    
                    <div className="metric-cards-container">
                        <div className="metric-card wide">
                            <div className="metric-icon">
                                <AccessTime />
                            </div>
                            <div className="metric-content">
                                <h4>Tempo Médio de Busca</h4>
                                <div className="metric-value">
                                    {loading ? '...' : `${averageSearchTime?.value || 0} seg`}
                                    {averageSearchTime?.change !== 0 && (
                                        <span className={`change-indicator ${getChangeClass(averageSearchTime?.change)}`}>
                                            {getChangeIcon(averageSearchTime?.change)}
                                            {formatPercentage(Math.abs(averageSearchTime?.change || 0))}
                                        </span>
                                    )}
                                </div>
                                <p className="metric-period">vs. período anterior</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    
    const renderUsageTab = () => {
        const { usageByTime, usageByDay, topFeatures, userActivity } = analyticsData.usage;
        
        return (
            <div className="usage-analytics">
                <div className="analytics-charts">
                    <div className="chart-container">
                        <h4>Uso por Hora do Dia</h4>
                        <div className="chart-content">
                            {loading ? (
                                <div className="loading-chart">Carregando...</div>
                            ) : (
                                <div className="bar-chart">
                                    {/* Aqui seria renderizado um gráfico de barras real */}
                                    <div className="bar-chart-placeholder">
                                        <BarChart />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="chart-container">
                        <h4>Uso por Dia da Semana</h4>
                        <div className="chart-content">
                            {loading ? (
                                <div className="loading-chart">Carregando...</div>
                            ) : (
                                <div className="day-usage-chart">
                                    {usageByDay?.map((day, index) => (
                                        <div key={index} className="day-usage-item">
                                            <div className="day-name">{day.day}</div>
                                            <div className="day-progress">
                                                <div 
                                                    className="day-progress-bar"
                                                    style={{ height: `${day.percentage}%` }}
                                                ></div>
                                            </div>
                                            <div className="day-value">{day.sessions}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="analytics-tables">
                    <div className="table-container">
                        <h4>Recursos Mais Utilizados</h4>
                        <div className="table-content">
                            {loading ? (
                                <div className="loading-table">Carregando...</div>
                            ) : (
                                <table className="analytics-table">
                                    <thead>
                                        <tr>
                                            <th>Recurso</th>
                                            <th>Uso</th>
                                            <th>% do Total</th>
                                            <th>Tendência</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topFeatures?.map((feature, index) => (
                                            <tr key={index}>
                                                <td>{feature.name}</td>
                                                <td>{feature.usage}</td>
                                                <td>{formatPercentage(feature.percentage)}</td>
                                                <td className={getChangeClass(feature.trend)}>
                                                    {getChangeIcon(feature.trend)}
                                                    {formatPercentage(Math.abs(feature.trend))}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                    
                    <div className="chart-container">
                        <h4>Atividade de Usuários</h4>
                        <div className="chart-content">
                            {loading ? (
                                <div className="loading-chart">Carregando...</div>
                            ) : (
                                <div className="user-activity-chart">
                                    {/* Aqui seria renderizado um gráfico de linha real */}
                                    <div className="trend-chart-placeholder">
                                        <Timeline />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    
    const renderActiveTab = () => {
        switch (activeTab) {
            case 'documents':
                return renderDocumentsTab();
            case 'searches':
                return renderSearchesTab();
            case 'usage':
                return renderUsageTab();
            default:
                return renderOverviewTab();
        }
    };
    
    return (
        <div className="analytics-system-container">
            <div className="analytics-header">
                <h3>
                    <BarChart />
                    Sistema de Análise
                </h3>
                
                <div className="analytics-controls">
                    <div className="date-range-selector">
                        <CalendarToday />
                        <select 
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                        >
                            <option value="week">Última Semana</option>
                            <option value="month">Último Mês</option>
                            <option value="quarter">Último Trimestre</option>
                            <option value="year">Último Ano</option>
                        </select>
                    </div>
                    
                    <div className="analytics-actions">
                        <button className="refresh-button" onClick={loadAnalyticsData}>
                            <Refresh />
                        </button>
                        <button className="export-button">
                            <GetApp />
                            Exportar
                        </button>
                        <button className="print-button">
                            <Print />
                            Imprimir
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="analytics-tabs">
                <button 
                    className={activeTab === 'overview' ? 'active' : ''}
                    onClick={() => setActiveTab('overview')}
                >
                    Visão Geral
                </button>
                <button 
                    className={activeTab === 'documents' ? 'active' : ''}
                    onClick={() => setActiveTab('documents')}
                >
                    Documentos
                </button>
                <button 
                    className={activeTab === 'searches' ? 'active' : ''}
                    onClick={() => setActiveTab('searches')}
                >
                    Buscas
                </button>
                <button 
                    className={activeTab === 'usage' ? 'active' : ''}
                    onClick={() => setActiveTab('usage')}
                >
                    Uso
                </button>
            </div>
            
            <div className="analytics-content">
                {renderActiveTab()}
            </div>
        </div>
    );
};

export default AnalyticsSystem; 