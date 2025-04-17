import React, { useState } from 'react';
import { 
    Search,
    Psychology,
    LibraryBooks,
    Gavel,
    Description
} from '@mui/icons-material';
import { mockAIFeatures } from '../../../mocks/caseManagementData';
import './AIAssistant.css';

const AIAssistant = ({ selectedCase }) => {
    const [query, setQuery] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [analysisResults, setAnalysisResults] = useState(null);

    const handleAnalysis = () => {
        setAnalyzing(true);
        // Simulando análise
        setTimeout(() => {
            setAnalysisResults({
                confidence: 85,
                recommendations: [
                    'Juntar documentos comprobatórios adicionais',
                    'Preparar contestação específica sobre ponto X',
                    'Considerar precedentes recentes do tribunal Y'
                ],
                relevantCases: [
                    'Processo 123456 - Decisão favorável',
                    'Processo 789012 - Acordo vantajoso'
                ]
            });
            setAnalyzing(false);
        }, 2000);
    };

    return (
        <div className="ai-assistant">
            <div className="ai-header">
                <h2>Assistente de IA</h2>
                <div className="ai-search">
                    <input
                        type="text"
                        placeholder="Faça uma pergunta sobre o caso..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button 
                        className="analyze-btn"
                        onClick={handleAnalysis}
                        disabled={analyzing}
                    >
                        {analyzing ? 'Analisando...' : 'Analisar'}
                    </button>
                </div>
            </div>

            <div className="ai-features">
                {mockAIFeatures.map(feature => (
                    <div key={feature.id} className="feature-card">
                        <div className="feature-icon">
                            {feature.id === 'research' && <Search />}
                            {feature.id === 'analysis' && <Psychology />}
                            {feature.id === 'documents' && <Description />}
                            {feature.id === 'strategy' && <Gavel />}
                        </div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                        <button 
                            className="feature-btn"
                            disabled={!feature.available}
                        >
                            Usar Ferramenta
                        </button>
                    </div>
                ))}
            </div>

            {analysisResults && (
                <div className="analysis-results">
                    <h3>Resultados da Análise</h3>
                    <div className="confidence">
                        <span>Confiança da Análise: {analysisResults.confidence}%</span>
                    </div>
                    <div className="recommendations">
                        <h4>Recomendações:</h4>
                        <ul>
                            {analysisResults.recommendations.map((rec, index) => (
                                <li key={index}>{rec}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="relevant-cases">
                        <h4>Casos Relevantes:</h4>
                        <ul>
                            {analysisResults.relevantCases.map((case_, index) => (
                                <li key={index}>{case_}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIAssistant; 