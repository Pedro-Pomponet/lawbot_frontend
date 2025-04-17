import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { Assessment, Gavel, Timer, TrendingUp } from '@mui/icons-material';
import './CaseMetrics.css';

const CaseMetrics = () => {
    const [timeFilter, setTimeFilter] = useState('month');

    const mockData = {
        summary: {
            totalCases: 150,
            activeCases: 85,
            completedCases: 65,
            winRate: 78
        },
        casesByType: [
            { name: 'Civil', value: 45 },
            { name: 'Trabalhista', value: 35 },
            { name: 'Tributário', value: 25 },
            { name: 'Criminal', value: 15 },
            { name: 'Outros', value: 30 }
        ],
        caseProgress: [
            { month: 'Jan', novos: 12, concluidos: 8 },
            { month: 'Fev', novos: 15, concluidos: 10 },
            { month: 'Mar', novos: 18, concluidos: 14 },
            { month: 'Abr', novos: 20, concluidos: 16 }
        ],
        resolutionTime: [
            { type: 'Civil', tempo: 45 },
            { type: 'Trabalhista', tempo: 60 },
            { type: 'Tributário', tempo: 90 },
            { type: 'Criminal', tempo: 120 }
        ]
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    return (
        <div className="case-metrics-container">
            <div className="metrics-header">
                <h2>Métricas de Casos</h2>
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

            <div className="metrics-summary">
                <div className="metric-card">
                    <Gavel />
                    <div className="metric-info">
                        <h3>Total de Casos</h3>
                        <div className="metric-value">
                            <span>{mockData.summary.totalCases}</span>
                        </div>
                    </div>
                </div>

                <div className="metric-card">
                    <Timer />
                    <div className="metric-info">
                        <h3>Casos Ativos</h3>
                        <div className="metric-value">
                            <span>{mockData.summary.activeCases}</span>
                        </div>
                    </div>
                </div>

                <div className="metric-card">
                    <Assessment />
                    <div className="metric-info">
                        <h3>Casos Concluídos</h3>
                        <div className="metric-value">
                            <span>{mockData.summary.completedCases}</span>
                        </div>
                    </div>
                </div>

                <div className="metric-card">
                    <TrendingUp />
                    <div className="metric-info">
                        <h3>Taxa de Sucesso</h3>
                        <div className="metric-value">
                            <span>{mockData.summary.winRate}%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-card">
                    <h3>Distribuição por Tipo</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={mockData.casesByType}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {mockData.casesByType.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Progresso de Casos</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mockData.caseProgress}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="novos" fill="#0088FE" name="Novos Casos" />
                            <Bar dataKey="concluidos" fill="#00C49F" name="Casos Concluídos" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Tempo Médio de Resolução por Tipo</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mockData.resolutionTime}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="type" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="tempo" fill="#8884d8" name="Dias" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default CaseMetrics;