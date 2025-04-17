import React, { useState } from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';

const TimeTracking = ({ data, loading }) => {
    const [activeTimer, setActiveTimer] = useState(null);
    const [newEntry, setNewEntry] = useState({
        caseId: '',
        activity: '',
        description: ''
    });

    const startTimer = async (caseId) => {
        try {
            const timer = await api.startTimeTracking({
                caseId,
                startTime: new Date()
            });
            setActiveTimer(timer);
        } catch (error) {
            console.error('Erro ao iniciar timer:', error);
        }
    };

    const stopTimer = async () => {
        if (!activeTimer) return;

        try {
            await api.stopTimeTracking(activeTimer.id);
            setActiveTimer(null);
            // Recarregar dados
        } catch (error) {
            console.error('Erro ao parar timer:', error);
        }
    };

    const handleManualEntry = async (e) => {
        e.preventDefault();
        try {
            await api.addTimeEntry(newEntry);
            setNewEntry({
                caseId: '',
                activity: '',
                description: ''
            });
            // Recarregar dados
        } catch (error) {
            console.error('Erro ao adicionar entrada:', error);
        }
    };

    return (
        <div className="time-tracking">
            <header className="tracking-header">
                <h2>Controle de Horas</h2>
                {activeTimer ? (
                    <div className="active-timer">
                        <span className="timer-indicator">⏱️ Cronômetro Ativo</span>
                        <button onClick={stopTimer} className="stop-button">
                            Parar
                        </button>
                    </div>
                ) : (
                    <button onClick={() => startTimer(newEntry.caseId)}>
                        Iniciar Cronômetro
                    </button>
                )}
            </header>

            <div className="time-summary">
                <div className="summary-card">
                    <h3>Total de Horas</h3>
                    <p>{data?.totalHours}h</p>
                </div>
                <div className="summary-card">
                    <h3>Média Diária</h3>
                    <p>{data?.dailyAverage}h</p>
                </div>
                <div className="summary-card">
                    <h3>Valor/Hora Médio</h3>
                    <p>{formatters.formatCurrency(data?.averageRate)}</p>
                </div>
            </div>

            <form onSubmit={handleManualEntry} className="manual-entry">
                <h3>Entrada Manual</h3>
                <div className="form-group">
                    <select
                        value={newEntry.caseId}
                        onChange={e => setNewEntry({
                            ...newEntry,
                            caseId: e.target.value
                        })}
                        required
                    >
                        <option value="">Selecione o Caso</option>
                        {data?.cases.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.title}
                            </option>
                        ))}
                    </select>

                    <select
                        value={newEntry.activity}
                        onChange={e => setNewEntry({
                            ...newEntry,
                            activity: e.target.value
                        })}
                        required
                    >
                        <option value="">Tipo de Atividade</option>
                        <option value="research">Pesquisa</option>
                        <option value="document">Documentação</option>
                        <option value="meeting">Reunião</option>
                        <option value="court">Audiência</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Descrição"
                        value={newEntry.description}
                        onChange={e => setNewEntry({
                            ...newEntry,
                            description: e.target.value
                        })}
                        required
                    />

                    <button type="submit">Adicionar</button>
                </div>
            </form>

            <div className="time-entries">
                <h3>Últimos Registros</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Caso</th>
                            <th>Atividade</th>
                            <th>Duração</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.entries.map(entry => (
                            <tr key={entry.id}>
                                <td>{formatters.formatDate(entry.date)}</td>
                                <td>{entry.caseName}</td>
                                <td>{entry.activity}</td>
                                <td>{entry.duration}h</td>
                                <td>{formatters.formatCurrency(entry.value)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TimeTracking; 