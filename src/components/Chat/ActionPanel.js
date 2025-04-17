import React from 'react';
import { contextManager } from '../../utils/contextManager';

const ActionPanel = ({ onAction }) => {
    const actions = [
        {
            type: 'document_analysis',
            label: 'Análise de Documento',
            icon: '📄'
        },
        {
            type: 'legal_advice',
            label: 'Consultoria Jurídica',
            icon: '⚖️'
        },
        {
            type: 'document_generation',
            label: 'Gerar Documento',
            icon: '📝'
        },
        {
            type: 'case_strategy',
            label: 'Análise Estratégica',
            icon: '🎯'
        }
    ];

    return (
        <div className="action-panel">
            {actions.map(action => (
                <button
                    key={action.type}
                    onClick={() => onAction(null, action.type)}
                    className="action-button"
                >
                    <span className="action-icon">{action.icon}</span>
                    <span className="action-label">{action.label}</span>
                </button>
            ))}
        </div>
    );
};

export default ActionPanel; 