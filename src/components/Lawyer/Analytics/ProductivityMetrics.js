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
import { Timer, TrendingUp, Assignment, CheckCircle } from '@mui/icons-material';
import './ProductivityMetrics.css';

const ProductivityMetrics = () => {
    const [timeFilter, setTimeFilter] = useState('month');

    const mockData = {
        summary: {
            horasTrabalho: 180,
            tarefasConcluidas: 45,
            eficiencia: 92,
            mediaHorasCaso: 8.5
        },
        timeDistribution: [
            { atividade: 'Audiências', horas: 45 },
            { atividade: 'Pesquisa', horas: 35 },
            { atividade: 'Documentação', horas: 50 },
            { atividade: 'Reuniões', horas: 30 },
            { atividade: 'Administrativo', horas: 20 }
        ],
        taskCompletion: [
            { mes: 'Jan', concluidas: 38, prazo: 35 },
            { mes: 'Fev', concluidas: 42, prazo: 40 },
            { mes: 'Mar', concluidas: 45, prazo: 42 },
            { mes: 'Abr', concluidas: 48, prazo: 45 }
        ],
        dailyProductivity: [
            { dia: 'Segunda', produtividade: 85 },
            { dia: 'Terça', produtividade: 92 },
            { dia: 'Quarta', produtividade: 88 },
            { dia: 'Quinta', produtividade: 90 },
            { dia: 'Sexta', produtividade: 82 }
        ]
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    return (
        <div className="productivity-container">
            <div className="productivity-header">
                <h2>Métricas de Produtividade</h2>
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

            <div className="productivity-summary">
                <div className="metric-card">
                    <Timer />
                    <div className="metric-info">
                        <h3>Horas Trabalhadas</h3>
                        <div className="metric-value">
                            <span>{mockData.summary.horasTrabalho}h</span>
                        </div>
                    </div>
                </div>

                <div className="metric-card">
                    <Assignment />
                    <div className="metric-info">
                        <h3>Tarefas Concluídas</h3>
                        <div className="metric-value">
                            <span>{mockData.summary.tarefasConcluidas}</span>
                        </div>
                    </div>
                </div>

                <div className="metric-card">
                    <TrendingUp />
                    <div className="metric-info">
                        <h3>Taxa de Eficiência</h3>
                        <div className="metric-value">
                            <span>{mockData.summary.eficiencia}%</span>
                        </div>
                    </div>
                </div>

                <div className="metric-card">
                    <CheckCircle />
                    <div className="metric-info">
                        <h3>Média Horas/Caso</h3>
                        <div className="metric-value">
                            <span>{mockData.summary.mediaHorasCaso}h</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-card">
                    <h3>Distribuição do Tempo</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={mockData.timeDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="horas"
                                label={({atividade, percent}) => `${atividade} ${(percent * 100).toFixed(0)}%`}
                            >
                                {mockData.timeDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Conclusão de Tarefas</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={mockData.taskCompletion}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mes" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line 
                                type="monotone" 
                                dataKey="concluidas" 
                                stroke="#8884d8" 
                                name="Tarefas Concluídas"
                            />
                            <Line 
                                type="monotone" 
                                dataKey="prazo" 
                                stroke="#82ca9d" 
                                name="Meta"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Produtividade Diária</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mockData.dailyProductivity}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="dia" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="produtividade" fill="#0088FE" name="Produtividade (%)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ProductivityMetrics;