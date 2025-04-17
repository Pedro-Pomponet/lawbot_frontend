import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    ResponsiveContainer
} from 'recharts';
import './CaseAnalytics.css';

const CaseAnalytics = () => {
    const statusData = [
        { name: 'Em andamento', value: 45 },
        { name: 'Aguardando', value: 30 },
        { name: 'Concluído', value: 15 },
        { name: 'Novo', value: 10 }
    ];

    const monthlyData = [
        { month: 'Jan', casos: 12, concluidos: 8 },
        { month: 'Fev', casos: 19, concluidos: 12 },
        { month: 'Mar', casos: 15, concluidos: 10 },
        { month: 'Abr', casos: 22, concluidos: 15 }
    ];

    const typeData = [
        { tipo: 'Civil', quantidade: 35 },
        { tipo: 'Trabalhista', quantidade: 25 },
        { tipo: 'Consumidor', quantidade: 20 },
        { tipo: 'Tributário', quantidade: 15 }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="case-analytics">
            <div className="analytics-header">
                <h2>Análise de Casos</h2>
                <div className="summary-cards">
                    <div className="summary-card">
                        <h3>Total de Casos</h3>
                        <span className="number">100</span>
                    </div>
                    <div className="summary-card">
                        <h3>Em Andamento</h3>
                        <span className="number">45</span>
                    </div>
                    <div className="summary-card">
                        <h3>Concluídos</h3>
                        <span className="number">15</span>
                    </div>
                    <div className="summary-card">
                        <h3>Taxa de Sucesso</h3>
                        <span className="number">85%</span>
                    </div>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-container">
                    <h3>Distribuição por Status</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-container">
                    <h3>Evolução Mensal</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="casos" stroke="#8884d8" name="Novos Casos" />
                            <Line type="monotone" dataKey="concluidos" stroke="#82ca9d" name="Concluídos" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-container">
                    <h3>Casos por Tipo</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={typeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="tipo" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="quantidade" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default CaseAnalytics; 