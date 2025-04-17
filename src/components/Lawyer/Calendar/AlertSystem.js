import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';

const AlertSystem = ({ onAlertUpdate }) => {
    const [alerts, setAlerts] = useState([]);
    const [preferences, setPreferences] = useState({
        deadlineWarning: 3, // dias antes
        conflictCheck: true,
        emailNotifications: true,
        pushNotifications: true
    });

    useEffect(() => {
        loadAlerts();
    }, []);

    const loadAlerts = async () => {
        try {
            const data = await api.getAlerts();
            setAlerts(data);
        } catch (error) {
            console.error('Erro ao carregar alertas:', error);
        }
    };

    const handleAlertDismiss = async (alertId) => {
        try {
            await api.dismissAlert(alertId);
            loadAlerts();
            onAlertUpdate();
        } catch (error) {
            console.error('Erro ao dispensar alerta:', error);
        }
    };

    const handlePreferenceUpdate = async (updates) => {
        try {
            await api.updateAlertPreferences(updates);
            setPreferences(prev => ({ ...prev, ...updates }));
        } catch (error) {
            console.error('Erro ao atualizar preferências:', error);
        }
    };

    return (
        <div className="alert-system">
            <header className="section-header">
                <h2>Sistema de Alertas</h2>
                <button onClick={() => loadAlerts()} className="refresh-btn">
                    Atualizar
                </button>
            </header>

            <div className="alert-preferences">
                <h3>Preferências</h3>
                <div className="preference-controls">
                    <div className="preference-item">
                        <label>Alertar com antecedência de</label>
                        <select
                            value={preferences.deadlineWarning}
                            onChange={e => handlePreferenceUpdate({
                                deadlineWarning: parseInt(e.target.value)
                            })}
                        >
                            <option value={1}>1 dia</option>
                            <option value={3}>3 dias</option>
                            <option value={5}>5 dias</option>
                            <option value={7}>7 dias</option>
                        </select>
                    </div>

                    <div className="preference-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={preferences.conflictCheck}
                                onChange={e => handlePreferenceUpdate({
                                    conflictCheck: e.target.checked
                                })}
                            />
                            Verificar conflitos de agenda
                        </label>
                    </div>

                    <div className="preference-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={preferences.emailNotifications}
                                onChange={e => handlePreferenceUpdate({
                                    emailNotifications: e.target.checked
                                })}
                            />
                            Notificações por email
                        </label>
                    </div>

                    <div className="preference-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={preferences.pushNotifications}
                                onChange={e => handlePreferenceUpdate({
                                    pushNotifications: e.target.checked
                                })}
                            />
                            Notificações push
                        </label>
                    </div>
                </div>
            </div>

            <div className="alerts-list">
                {alerts.map(alert => (
                    <div key={alert.id} className={`alert-card ${alert.priority}`}>
                        <div className="alert-header">
                            <span className="alert-type">{alert.type}</span>
                            <span className="alert-date">
                                {formatters.formatDate(alert.date)}
                            </span>
                        </div>

                        <h3>{alert.title}</h3>
                        <p>{alert.description}</p>

                        {alert.case && (
                            <div className="alert-case">
                                <span>Processo: {alert.case.number}</span>
                                <span>Cliente: {alert.case.client}</span>
                            </div>
                        )}

                        <div className="alert-actions">
                            <button 
                                onClick={() => handleAlertDismiss(alert.id)}
                                className="dismiss-btn"
                            >
                                Dispensar
                            </button>
                            {alert.action && (
                                <button 
                                    onClick={alert.action.handler}
                                    className="action-btn"
                                >
                                    {alert.action.label}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlertSystem; 