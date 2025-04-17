import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { Assessment, TrendingUp, Warning, CheckCircle } from '@mui/icons-material';
import './PredictiveAnalysis.css';

const PredictiveAnalysis = () => {
    const [timeFilter, setTimeFilter] = useState('month');

    const mockData = {
        summary: {
            successRate: 85,
            riskLevel: 'Médio',
            estimatedDuration: '120 dias',
            estimatedCost: 15000
        },
        successTrend: [
            { month: 'Jan', taxa: 82 },
            { month: 'Fev', taxa: 84 },
            { month: 'Mar', taxa: 85 },
            { month: 'Abr', taxa: 87 }
        ],
        riskFactors: [
            { factor: 'Jurisprudência Desfavorável', peso: 35 },
            { factor: 'Complexidade', peso: 25 },
            { factor: 'Prazo', peso: 20 },
            { factor: 'Documentação', peso: 20 }
        ],
        similarCases: [
            { id: 1, resultado: 'Ganho', probabilidade: 85 },
            { id: 2, resultado: 'Perda', probabilidade: 65 },
            { id: 3, resultado: 'Acordo', probabilidade: 75 }
        ]
    };

    return (
        <div className="predictive-container">
            <div className="predictive-header">
                <h2>Análise Preditiva</h2>
                <select 
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    className="time-filter"
                >
                    <option value="month">Último Mês</option>
                    <option value="quarter">Último Trimestre</option>
                    <option value="year">Último Ano</option>
                </select>
            </div>

            <div className="predictive-summary">
                <div className="metric-card">
                    <CheckCircle />
                    <div className="metric-info">
                        <h3>Taxa de Sucesso Prevista</h3>
                        <div className="metric-value">
                            <span>{mockData.summary.successRate}%</span>
                        </div>
                    </div>
                </div>

                <div className="metric-card">
                    <Warning />
                    <div className="metric-info">
                        <h3>Nível de Risco</h3>
                        <div className="metric-value">
                            <span>{mockData.summary.riskLevel}</span>
                        </div>
                    </div>
                </div>

                <div className="metric-card">
                    <Assessment />
                    <div className="metric-info">
                        <h3>Duração Estimada</h3>
                        <div className="metric-value">
                            <span>{mockData.summary.estimatedDuration}</span>
                        </div>
                    </div>
                </div>

                <div className="metric-card">
                    <TrendingUp />
                    <div className="metric-info">
                        <h3>Custo Estimado</h3>
                        <div className="metric-value">
                            <span>R$ {mockData.summary.estimatedCost}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-card">
                    <h3>Tendência de Sucesso</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={mockData.successTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line 
                                type="monotone" 
                                dataKey="taxa" 
                                stroke="#8884d8" 
                                name="Taxa de Sucesso (%)" 
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Fatores de Risco</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mockData.riskFactors}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="factor" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="peso" fill="#FF8042" name="Peso (%)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Casos Similares</h3>
                    <div className="similar-cases-grid">
                        {mockData.similarCases.map(caso => (
                            <div key={caso.id} className="similar-case-card">
                                <h4>{caso.resultado}</h4>
                                <div className="probability-bar">
                                    <div 
                                        className="probability-fill"
                                        style={{ width: `${caso.probabilidade}%` }}
                                    />
                                </div>
                                <span>{caso.probabilidade}% de similaridade</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PredictiveAnalysis; 