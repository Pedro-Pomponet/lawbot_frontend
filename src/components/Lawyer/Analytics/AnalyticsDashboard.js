import React, { useState } from 'react';
import { 
    AttachMoney,
    AccessTime,
    People,
    TrendingUp,
    CalendarToday,
    Gavel,
    Assessment,
    Timeline
} from '@mui/icons-material';
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
import './AnalyticsDashboard.css';

const AnalyticsDashboard = () => {
    const [timeFilter, setTimeFilter] = useState('month');

    const analyticsData = {
        summary: {
            revenue: {
                value: 25000,
                trend: '+15%',
                isPositive: true
            },
            resolutionTime: {
                value: 45,
                trend: '-5%',
                isPositive: true
            },
            clientSatisfaction: {
                value: 92,
                trend: '+3%',
                isPositive: true
            },
            successRate: {
                value: 85,
                trend: '+2%',
                isPositive: true
            }
        },
        revenueHistory: [
            { month: 'Jan', value: 18000 },
            { month: 'Fev', value: 20000 },
            { month: 'Mar', value: 22000 },
            { month: 'Abr', value: 25000 }
        ],
        casesByType: [
            { name: 'Civil', value: 35 },
            { name: 'Trabalhista', value: 25 },
            { name: 'Tributário', value: 20 },
            { name: 'Empresarial', value: 15 },
            { name: 'Outros', value: 5 }
        ],
        clientAcquisition: [
            { month: 'Jan', novos: 8, recorrentes: 12 },
            { month: 'Fev', novos: 10, recorrentes: 15 },
            { month: 'Mar', novos: 12, recorrentes: 18 },
            { month: 'Abr', novos: 15, recorrentes: 20 }
        ]
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    return (
        <div className="analytics-dashboard">
            <div className="analytics-header">
                <h1>Analytics</h1>
                <div className="time-filter">
                    <select 
                        value={timeFilter} 
                        onChange={(e) => setTimeFilter(e.target.value)}
                    >
                        <option value="week">Última Semana</option>
                        <option value="month">Último Mês</option>
                        <option value="quarter">Último Trimestre</option>
                        <option value="year">Último Ano</option>
                    </select>
                </div>
            </div>

            <div className="metrics-summary">
                <div className="metric-card">
                    <AttachMoney />
                    <div className="metric-info">
                        <h3>Receita Mensal</h3>
                        <div className="metric-value">
                            <span>R$ {analyticsData.summary.revenue.value}</span>
                            <span className={`trend ${analyticsData.summary.revenue.isPositive ? 'positive' : 'negative'}`}>
                                {analyticsData.summary.revenue.trend}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="metric-card">
                    <AccessTime />
                    <div className="metric-info">
                        <h3>Tempo Médio de Resolução</h3>
                        <div className="metric-value">
                            <span>{analyticsData.summary.resolutionTime.value} dias</span>
                            <span className={`trend ${analyticsData.summary.resolutionTime.isPositive ? 'positive' : 'negative'}`}>
                                {analyticsData.summary.resolutionTime.trend}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="metric-card">
                    <People />
                    <div className="metric-info">
                        <h3>Satisfação dos Clientes</h3>
                        <div className="metric-value">
                            <span>{analyticsData.summary.clientSatisfaction.value}%</span>
                            <span className={`trend ${analyticsData.summary.clientSatisfaction.isPositive ? 'positive' : 'negative'}`}>
                                {analyticsData.summary.clientSatisfaction.trend}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="metric-card">
                    <TrendingUp />
                    <div className="metric-info">
                        <h3>Taxa de Sucesso</h3>
                        <div className="metric-value">
                            <span>{analyticsData.summary.successRate.value}%</span>
                            <span className={`trend ${analyticsData.summary.successRate.isPositive ? 'positive' : 'negative'}`}>
                                {analyticsData.summary.successRate.trend}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-card">
                    <h3>Evolução da Receita</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={analyticsData.revenueHistory}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value) => `R$ ${value}`} />
                            <Legend />
                            <Line 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#8884d8" 
                                name="Receita"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Distribuição de Casos</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={analyticsData.casesByType}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {analyticsData.casesByType.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Aquisição de Clientes</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={analyticsData.clientAcquisition}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="novos" fill="#0088FE" name="Novos Clientes" />
                            <Bar dataKey="recorrentes" fill="#00C49F" name="Clientes Recorrentes" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard; 