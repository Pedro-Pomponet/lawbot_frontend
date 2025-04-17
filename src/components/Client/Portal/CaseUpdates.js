import React from 'react';
import { formatters } from '../../../utils/helpers';

const CaseUpdates = ({ cases, loading }) => {
    if (loading) return <div className="loading">Carregando...</div>;

    return (
        <div className="case-updates">
            <div className="updates-header">
                <h2>Atualizações dos Seus Processos</h2>
            </div>

            <div className="updates-list">
                {cases.map(caseItem => (
                    <div key={caseItem.id} className="case-card">
                        <div className="case-header">
                            <h3>{caseItem.title}</h3>
                            <span className={`status ${caseItem.status}`}>
                                {caseItem.statusText}
                            </span>
                        </div>

                        <div className="updates-timeline">
                            {caseItem.updates.map((update, index) => (
                                <div key={index} className="update-item">
                                    <div className="update-marker"></div>
                                    <div className="update-content">
                                        <span className="update-date">
                                            {formatters.formatDate(update.date)}
                                        </span>
                                        <p className="update-text">
                                            {update.description}
                                        </p>
                                        {update.attachments && (
                                            <div className="update-attachments">
                                                {update.attachments.map((file, i) => (
                                                    <a 
                                                        key={i}
                                                        href={file.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="attachment-link"
                                                    >
                                                        📎 {file.name}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="case-footer">
                            <div className="next-steps">
                                <h4>Próximos Passos</h4>
                                <ul>
                                    {caseItem.nextSteps.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ul>
                            </div>
                            <button className="details-btn">
                                Ver Detalhes Completos
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CaseUpdates; 