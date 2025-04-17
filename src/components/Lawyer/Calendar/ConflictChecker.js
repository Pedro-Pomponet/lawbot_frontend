import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';

const ConflictChecker = ({ events, onConflictResolution }) => {
    const [conflicts, setConflicts] = useState([]);
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        checkConflicts();
    }, [events]);

    const checkConflicts = async () => {
        setChecking(true);
        try {
            const conflictData = await api.checkScheduleConflicts(events);
            setConflicts(conflictData);
        } catch (error) {
            console.error('Erro ao verificar conflitos:', error);
        } finally {
            setChecking(false);
        }
    };

    const handleResolveConflict = async (conflictId, resolution) => {
        try {
            await api.resolveConflict(conflictId, resolution);
            setConflicts(prev => prev.filter(c => c.id !== conflictId));
            onConflictResolution();
        } catch (error) {
            console.error('Erro ao resolver conflito:', error);
        }
    };

    return (
        <div className="conflict-checker">
            <header className="checker-header">
                <h2>Verificação de Conflitos</h2>
                <button 
                    onClick={checkConflicts}
                    disabled={checking}
                    className="check-btn"
                >
                    {checking ? 'Verificando...' : 'Verificar Agora'}
                </button>
            </header>

            <div className="conflicts-list">
                {conflicts.map(conflict => (
                    <div key={conflict.id} className="conflict-card">
                        <div className="conflict-header">
                            <span className="conflict-type">
                                {conflict.type === 'time' ? '⏰' : '📍'}
                            </span>
                            <span className="conflict-severity">
                                {conflict.severity === 'high' ? '🔴' :
                                 conflict.severity === 'medium' ? '🟡' : '🟢'}
                            </span>
                        </div>

                        <div className="conflict-events">
                            <div className="event-item">
                                <h4>{conflict.event1.title}</h4>
                                <p>{formatters.formatDateTime(conflict.event1.datetime)}</p>
                                <p>{conflict.event1.location}</p>
                            </div>
                            <div className="conflict-divider">⚡</div>
                            <div className="event-item">
                                <h4>{conflict.event2.title}</h4>
                                <p>{formatters.formatDateTime(conflict.event2.datetime)}</p>
                                <p>{conflict.event2.location}</p>
                            </div>
                        </div>

                        <div className="conflict-actions">
                            {conflict.resolutionOptions.map(option => (
                                <button
                                    key={option.id}
                                    onClick={() => handleResolveConflict(conflict.id, option)}
                                    className="resolution-btn"
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                {conflicts.length === 0 && !checking && (
                    <p className="no-conflicts">
                        Nenhum conflito encontrado! 👍
                    </p>
                )}
            </div>
        </div>
    );
};

export default ConflictChecker;