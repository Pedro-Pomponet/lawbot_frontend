import React, { useState } from 'react';
import { formatters } from '../../../utils/helpers';

const PerformanceMetrics = ({ metrics, members }) => {
    const [timeRange, setTimeRange] = useState('month');
    const [selectedMetric, setSelectedMetric] = useState('productivity');

    const getMetricValue = (member, metric) => {
        const memberMetrics = metrics?.members?.[member.id] || {};
        return memberMetrics[metric] || 0;
    };

    return (
        <div className="performance-metrics">
            <header className="section-header">
                <h2>Métricas de Performance</h2>
                <div className="metric-filters">
                    <select
                        value={timeRange}
                        onChange={e => setTimeRange(e.target.value)}
                    >
                        <option value="week">Última Semana</option>
                        <option value="month">Último Mês</option>
                        <option value="quarter">Último Trimestre</option>
                    </select>
                    <select
                        value={selectedMetric}
                        onChange={e => setSelectedMetric(e.target.value)}
                    >
                        <option value="productivity">Produtividade</option>
                        <option value="taskCompletion">Conclusão de Tarefas</option>
                        <option value="caseProgress">Progresso de Casos</option>
                        <option value="clientSatisfaction">Satisfação de Clientes</option>
                    </select>
                </div>
            </header>

            <div className="metrics-grid">
                {members.map(member => (
                    <div key={member.id} className="member-metrics">
                        <div className="member-header">
                            <img src={member.avatar} alt={member.name} className="member-avatar" />
                            <h3>{member.name}</h3>
                            <span className="member-role">{member.role}</span>
                        </div>

                        <div className="metric-cards">
                            <div className="metric-card">
                                <h4>Produtividade</h4>
                                <p>{getMetricValue(member, 'productivity')}%</p>
                            </div>
                            <div className="metric-card">
                                <h4>Tarefas Concluídas</h4>
                                <p>{getMetricValue(member, 'completedTasks')}</p>
                            </div>
                            <div className="metric-card">
                                <h4>Prazo Médio</h4>
                                <p>{getMetricValue(member, 'avgTimePerTask')}h</p>
                            </div>
                        </div>

                        <div className="performance-trend">
                            {/* Gráfico de tendência */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PerformanceMetrics; 