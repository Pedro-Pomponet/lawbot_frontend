import React, { useState } from 'react';
import { 
    Psychology, 
    Send, 
    Article, 
    Lightbulb,
    AutoAwesome,
    History
} from '@mui/icons-material';
import './AIAssistant.css';

const mockAIAnalysis = {
    recentQueries: [
        {
            id: 1,
            query: "Análise de contrato de locação comercial",
            timestamp: "2024-02-20T14:30:00",
            status: "completed"
        },
        {
            id: 2,
            query: "Jurisprudência sobre danos morais em atraso de voo",
            timestamp: "2024-02-19T16:45:00",
            status: "completed"
        }
    ],
    suggestions: [
        {
            id: 1,
            type: "correction",
            text: "Sugestão de correção na cláusula 3.2",
            confidence: 0.89,
            context: "Contrato de Prestação de Serviços"
        },
        {
            id: 2,
            type: "improvement",
            text: "Adicionar cláusula sobre LGPD",
            confidence: 0.95,
            context: "Política de Privacidade"
        }
    ],
    insights: [
        {
            id: 1,
            topic: "Jurisprudência Relacionada",
            content: "Encontrados 5 casos similares no STJ",
            relevance: 0.92
        },
        {
            id: 2,
            topic: "Tendência Legal",
            content: "Nova interpretação sobre prazo prescricional",
            relevance: 0.88
        }
    ]
};

const AIAssistant = ({ userId }) => {
    const [analysis, setAnalysis] = useState(mockAIAnalysis);
    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState('chat');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleQuerySubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsProcessing(true);
        // Simulação de processamento
        setTimeout(() => {
            setIsProcessing(false);
            // Aqui viria a lógica real de processamento
        }, 2000);
    };

    return (
        <div className="ai-container">
            <div className="ai-header">
                <h2>Assistente IA</h2>
                <div className="ai-tabs">
                    <button 
                        className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
                        onClick={() => setActiveTab('chat')}
                    >
                        <Psychology /> Chat
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'analysis' ? 'active' : ''}`}
                        onClick={() => setActiveTab('analysis')}
                    >
                        <AutoAwesome /> Análises
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        <History /> Histórico
                    </button>
                </div>
            </div>

            <div className="ai-content">
                {activeTab === 'chat' && (
                    <div className="chat-section">
                        <form onSubmit={handleQuerySubmit} className="query-form">
                            <input
                                type="text"
                                placeholder="Digite sua pergunta..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                disabled={isProcessing}
                            />
                            <button type="submit" disabled={isProcessing}>
                                <Send />
                            </button>
                        </form>

                        <div className="suggestions-section">
                            <h3><Lightbulb /> Sugestões</h3>
                            <div className="suggestions-grid">
                                {analysis.suggestions.map(suggestion => (
                                    <div key={suggestion.id} className="suggestion-card">
                                        <div className="suggestion-header">
                                            <span className="suggestion-type">{suggestion.type}</span>
                                            <span className="confidence">
                                                {(suggestion.confidence * 100).toFixed(0)}% confiança
                                            </span>
                                        </div>
                                        <p>{suggestion.text}</p>
                                        <span className="context">{suggestion.context}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'analysis' && (
                    <div className="analysis-section">
                        <h3><Article /> Insights Legais</h3>
                        <div className="insights-grid">
                            {analysis.insights.map(insight => (
                                <div key={insight.id} className="insight-card">
                                    <h4>{insight.topic}</h4>
                                    <p>{insight.content}</p>
                                    <div className="relevance-bar">
                                        <div 
                                            className="relevance-fill"
                                            style={{ width: `${insight.relevance * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="history-section">
                        <h3>Consultas Recentes</h3>
                        <div className="queries-list">
                            {analysis.recentQueries.map(query => (
                                <div key={query.id} className="query-item">
                                    <div className="query-content">
                                        <h4>{query.query}</h4>
                                        <span className="query-date">
                                            {new Date(query.timestamp).toLocaleString()}
                                        </span>
                                    </div>
                                    <button className="rerun-button">
                                        Executar Novamente
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIAssistant; 