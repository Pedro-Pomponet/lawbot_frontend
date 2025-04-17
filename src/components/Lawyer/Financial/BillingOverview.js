import React from 'react';
import { formatters } from '../../../utils/helpers';

const BillingOverview = ({ data, loading }) => {
    if (loading) return <div className="loading">Carregando...</div>;

    return (
        <div className="billing-overview">
            <h2>Visão Geral de Honorários</h2>
            
            <div className="billing-stats">
                <div className="stat-card">
                    <h3>Total Faturado</h3>
                    <p className="amount">
                        {formatters.formatCurrency(data.totalBilled)}
                    </p>
                </div>
                
                <div className="stat-card">
                    <h3>A Receber</h3>
                    <p className="amount">
                        {formatters.formatCurrency(data.receivables)}
                    </p>
                </div>
                
                <div className="stat-card">
                    <h3>Recebido</h3>
                    <p className="amount">
                        {formatters.formatCurrency(data.received)}
                    </p>
                </div>
            </div>

            <div className="billing-table">
                <h3>Últimos Faturamentos</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Processo</th>
                            <th>Valor</th>
                            <th>Status</th>
                            <th>Vencimento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.recentBillings.map(billing => (
                            <tr key={billing.id}>
                                <td>{billing.client}</td>
                                <td>{billing.caseNumber}</td>
                                <td>{formatters.formatCurrency(billing.amount)}</td>
                                <td>
                                    <span className={`status ${billing.status}`}>
                                        {billing.status}
                                    </span>
                                </td>
                                <td>{formatters.formatDate(billing.dueDate)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BillingOverview; 