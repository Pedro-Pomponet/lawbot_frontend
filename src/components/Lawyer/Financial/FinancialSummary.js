import React from 'react';
import './FinancialSummary.css';

const FinancialSummary = ({ data, loading }) => {
    if (loading) return <div>Carregando...</div>;

    return (
        <div className="financial-summary">
            <div className="financial-grid">
                <div className="financial-card">
                    <h3>Receita Mensal</h3>
                    <p className="amount">R$ {data.monthlyRevenue.toLocaleString()}</p>
                </div>
                <div className="financial-card">
                    <h3>Pagamentos Pendentes</h3>
                    <p className="amount">R$ {data.pendingPayments.toLocaleString()}</p>
                </div>
                <div className="financial-card">
                    <h3>Casos Concluídos</h3>
                    <p className="amount">{data.completedCases}</p>
                </div>
                <div className="financial-card">
                    <h3>Contratos Ativos</h3>
                    <p className="amount">{data.activeContracts}</p>
                </div>
            </div>
        </div>
    );
};

export default FinancialSummary; 