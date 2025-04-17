import React, { useState } from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';

const ExpenseTracker = ({ data, loading }) => {
    const [newExpense, setNewExpense] = useState({
        description: '',
        amount: '',
        category: '',
        date: new Date()
    });

    const handleAddExpense = async (e) => {
        e.preventDefault();
        try {
            await api.addExpense(newExpense);
            setNewExpense({
                description: '',
                amount: '',
                category: '',
                date: new Date()
            });
            // Recarregar dados
        } catch (error) {
            console.error('Erro ao adicionar despesa:', error);
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;

    return (
        <div className="expense-tracker">
            <h2>Controle de Despesas</h2>

            <form onSubmit={handleAddExpense} className="expense-form">
                <input
                    type="text"
                    placeholder="Descrição"
                    value={newExpense.description}
                    onChange={e => setNewExpense({
                        ...newExpense,
                        description: e.target.value
                    })}
                />
                <input
                    type="number"
                    placeholder="Valor"
                    value={newExpense.amount}
                    onChange={e => setNewExpense({
                        ...newExpense,
                        amount: e.target.value
                    })}
                />
                <select
                    value={newExpense.category}
                    onChange={e => setNewExpense({
                        ...newExpense,
                        category: e.target.value
                    })}
                >
                    <option value="">Selecione a categoria</option>
                    <option value="processual">Custas Processuais</option>
                    <option value="office">Escritório</option>
                    <option value="travel">Viagens</option>
                    <option value="other">Outros</option>
                </select>
                <button type="submit">Adicionar Despesa</button>
            </form>

            <div className="expense-summary">
                <div className="summary-card">
                    <h3>Total de Despesas</h3>
                    <p>{formatters.formatCurrency(data.total)}</p>
                </div>
                <div className="summary-card">
                    <h3>Maior Despesa</h3>
                    <p>{formatters.formatCurrency(data.highest)}</p>
                </div>
                <div className="summary-card">
                    <h3>Média Mensal</h3>
                    <p>{formatters.formatCurrency(data.monthlyAverage)}</p>
                </div>
            </div>

            <div className="expense-list">
                <h3>Últimas Despesas</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Descrição</th>
                            <th>Categoria</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.expenses.map(expense => (
                            <tr key={expense.id}>
                                <td>{formatters.formatDate(expense.date)}</td>
                                <td>{expense.description}</td>
                                <td>{expense.category}</td>
                                <td>{formatters.formatCurrency(expense.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpenseTracker; 