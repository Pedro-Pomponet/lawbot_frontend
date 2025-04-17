import React, { useState } from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';
import { Line } from 'react-chartjs-2';

const RevenueProjection = ({ data, loading }) => {
    const [projectionPeriod, setProjectionPeriod] = useState('6months');

    const chartData = {
        labels: data?.projections.map(p => p.month) || [],
        datasets: [
            {
                label: 'Projeção de Receita',
                data: data?.projections.map(p => p.amount) || [],
                borderColor: '#4CAF50',
                tension: 0.4
            },
            {
                label: 'Receita Real',
                data: data?.actual.map(p => p.amount) || [],
                borderColor: '#2196F3',
                tension: 0.4
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Projeção de Receitas'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: value => formatters.formatCurrency(value)
                }
            }
        }
    };

    return (
        <div className="revenue-projection">
            <header className="projection-header">
                <h2>Projeção de Receitas</h2>
                <select 
                    value={projectionPeriod}
                    onChange={(e) => setProjectionPeriod(e.target.value)}
                >
                    <option value="3months">3 Meses</option>
                    <option value="6months">6 Meses</option>
                    <option value="12months">12 Meses</option>
                </select>
            </header>

            <div className="projection-summary">
                <div className="summary-card">
                    <h3>Receita Projetada</h3>
                    <p className="amount">
                        {formatters.formatCurrency(data?.totalProjected)}
                    </p>
                    <span className="trend">
                        {data?.projectedGrowth > 0 ? '↑' : '↓'}
                        {Math.abs(data?.projectedGrowth)}%
                    </span>
                </div>

                <div className="summary-card">
                    <h3>Contratos Recorrentes</h3>
                    <p className="amount">
                        {formatters.formatCurrency(data?.recurringRevenue)}
                    </p>
                    <span className="contracts-count">
                        {data?.recurringContracts} contratos ativos
                    </span>
                </div>
            </div>

            <div className="chart-container">
                <Line data={chartData} options={chartOptions} />
            </div>

            <div className="revenue-breakdown">
                <h3>Composição da Receita</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Fonte</th>
                            <th>Valor Mensal</th>
                            <th>Participação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.breakdown.map(item => (
                            <tr key={item.source}>
                                <td>{item.source}</td>
                                <td>{formatters.formatCurrency(item.amount)}</td>
                                <td>{item.percentage}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RevenueProjection; 