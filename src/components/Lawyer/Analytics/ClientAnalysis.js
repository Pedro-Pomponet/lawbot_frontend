import React, { useState } from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
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
import { People, AttachMoney, TrendingUp, Star } from '@mui/icons-material';
import './ClientAnalysis.css';

const ClientAnalysis = () => {
    const [timeFilter, setTimeFilter] = useState('month');

    const mockData = {
        summary: {
            totalClients: 120,
            activeClients: 95,
            retentionRate: 85,
            avgRevenue: 3500
        },
        clientSegments: [
            { name: 'Premium', value: 30 },
            { name: 'Regular', value: 45 },
            { name: 'Ocasional', value: 25 },
            { name: 'Novo', value: 20 }
        ],
        satisfactionTrend: [
            { month: 'Jan', satisfacao: 88 },
            { month: 'Fev', satisfacao: 90 },
            { month: 'Mar', satisfacao: 92 },
            { month: 'Abr', satisfacao: 94 }
        ],
        revenueBySegment: [
            { segment: 'Premium', valor: 150000 },
            { segment: 'Regular', valor: 100000 },
            { segment: 'Ocasional', valor: 50000 },
            { segment: 'Novo', valor: 25000 }
        ]
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="client-analysis-container">
            <div className="analysis-header">
                <h2>Análise de Clientes</h2>
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

            <div className="analysis-summary">
                <div className="metric-card">
                    <People />
                    <div className="metric-info">
                        <h3>Total de Clientes</h3>
                        <div className="metric-value">
                            <span>{mockData.summary.totalClients}</span>
                        </div>
                    </div>
                </div>

                <div className="metric-card">
                    <Star />
                    <div className="metric-info">
                        <h3>Taxa de Retenção</h3>
                        <div className="metric-value">
                            <span>{mockData.summary.retentionRate}%</span>
                        </div>
                    </div>
                </div>

                <div className="metric-card">
                    <AttachMoney />
                    <div className="metric-info">
                        <h3>Receita Média/Cliente</h3>
                        <div className="metric-value">
                            <span>R$ {mockData.summary.avgRevenue}</span>
                        </div>
                    </div>
                </div>

                <div className="metric-card">
                    <TrendingUp />
                    <div className="metric-info">
                        <h3>Clientes Ativos</h3>
                        <div className="metric-value">
                            <span>{mockData.summary.activeClients}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-card">
                    <h3>Segmentação de Clientes</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={mockData.clientSegments}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {mockData.clientSegments.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Tendência de Satisfação</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={mockData.satisfactionTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line 
                                type="monotone" 
                                dataKey="satisfacao" 
                                stroke="#8884d8" 
                                name="Satisfação (%)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Receita por Segmento</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mockData.revenueBySegment}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="segment" />
                            <YAxis />
                            <Tooltip formatter={(value) => `R$ ${value}`} />
                            <Legend />
                            <Bar dataKey="valor" fill="#0088FE" name="Receita" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ClientAnalysis;