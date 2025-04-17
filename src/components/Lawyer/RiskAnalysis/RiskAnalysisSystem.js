import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import { Chart } from 'react-chartjs-2';

const RiskAnalysisSystem = () => {
    const [activeCase, setActiveCase] = useState(null);
    const [riskData, setRiskData] = useState({
        successRate: 0,
        similarCases: [],
        estimatedCosts: {},
        timeEstimate: {},
        recommendedStrategies: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (activeCase) {
            loadRiskAnalysis();
        }
    }, [activeCase]);

    const loadRiskAnalysis = async () => {
        try {
            const data = await api.getRiskAnalysis(activeCase.id);
            setRiskData(data);
        } catch (error) {
            console.error('Erro ao carregar análise:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="risk-analysis">
            <div className="risk-header">
                <h2>Análise de Risco</h2>
                <select 
                    onChange={e => setActiveCase(JSON.parse(e.target.value))}
                    className="case-selector"
                >
                    <option value="">Selecione um caso</option>
                    {/* Lista de casos */}
                </select>
            </div>

            {activeCase && (
                <div className="risk-content">
                    {/* Painel de Sucesso */}
                    <div className="success-panel panel">
                        <h3>Chances de Êxito</h3>
                        <div className="success-rate">
                            <div className="rate-circle" style={{
                                background: `conic-gradient(#4CAF50 ${riskData.successRate}%, #f0f0f0 0)`
                            }}>
                                {riskData.successRate}%
                            </div>
                        </div>
                        <div className="success-factors">
                            {riskData.factors?.map(factor => (
                                <div key={factor.id} className="factor">
                                    <span>{factor.name}</span>
                                    <div className="factor-bar" style={{
                                        width: `${factor.impact}%`,
                                        background: factor.impact > 70 ? '#4CAF50' : 
                                                  factor.impact > 40 ? '#FFC107' : '#FF5722'
                                    }}/>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Casos Similares */}
                    <div className="similar-cases panel">
                        <h3>Decisões Similares</h3>
                        <div className="cases-list">
                            {riskData.similarCases.map(case_ => (
                                <div key={case_.id} className="similar-case">
                                    <div className="case-header">
                                        <span className={`result ${case_.result}`}>
                                            {case_.result === 'success' ? '✅' : '❌'}
                                        </span>
                                        <h4>{case_.title}</h4>
                                    </div>
                                    <p>{case_.summary}</p>
                                    <div className="case-meta">
                                        <span>📅 {case_.date}</span>
                                        <span>⚖️ {case_.court}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Custos e Tempo */}
                    <div className="estimates panel">
                        <div className="cost-estimate">
                            <h3>Custos Estimados</h3>
                            <div className="cost-breakdown">
                                {Object.entries(riskData.estimatedCosts).map(([key, value]) => (
                                    <div key={key} className="cost-item">
                                        <span>{key}</span>
                                        <strong>R$ {value.toLocaleString()}</strong>
                                    </div>
                                ))}
                            </div>
                            <div className="total-cost">
                                <span>Total Estimado</span>
                                <strong>R$ {Object.values(riskData.estimatedCosts)
                                    .reduce((a, b) => a + b, 0)
                                    .toLocaleString()}
                                </strong>
                            </div>
                        </div>
                        
                        <div className="time-estimate">
                            <h3>Tempo Previsto</h3>
                            <div className="timeline">
                                {Object.entries(riskData.timeEstimate).map(([phase, time]) => (
                                    <div key={phase} className="timeline-item">
                                        <div className="phase-marker"></div>
                                        <div className="phase-info">
                                            <span>{phase}</span>
                                            <strong>{time} meses</strong>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Estratégias Recomendadas */}
                    <div className="strategies panel">
                        <h3>Estratégias Recomendadas</h3>
                        <div className="strategies-list">
                            {riskData.recommendedStrategies.map((strategy, index) => (
                                <div key={index} className="strategy-card">
                                    <div className="strategy-header">
                                        <span className="strategy-icon">📋</span>
                                        <h4>{strategy.title}</h4>
                                    </div>
                                    <p>{strategy.description}</p>
                                    <div className="strategy-stats">
                                        <span>Taxa de Sucesso: {strategy.successRate}%</span>
                                        <span>Complexidade: {strategy.complexity}</span>
                                    </div>
                                    <div className="strategy-pros-cons">
                                        <div className="pros">
                                            <h5>Prós</h5>
                                            <ul>
                                                {strategy.pros.map((pro, i) => (
                                                    <li key={i}>{pro}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="cons">
                                            <h5>Contras</h5>
                                            <ul>
                                                {strategy.cons.map((con, i) => (
                                                    <li key={i}>{con}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RiskAnalysisSystem;