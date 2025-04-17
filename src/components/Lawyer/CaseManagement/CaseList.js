import React from 'react';
import { 
    AccessTime, 
    Person, 
    Gavel,
    MoreVert,
    Description,
    Event,
    Note
} from '@mui/icons-material';
import './CaseList.css';

const CaseList = ({ cases, onCaseSelect }) => {
    console.log('Cases recebidos:', cases); // Debug

    const renderEmptyState = () => (
        <div className="empty-cases">
            <h3>Nenhum caso encontrado</h3>
            <p>Tente ajustar os filtros ou criar um novo caso</p>
        </div>
    );

    if (!cases?.length) {
        return renderEmptyState();
    }

    return (
        <div className="case-list-container">
            <div className="cases-grid">
                {cases.map(caseItem => (
                    <div 
                        key={caseItem.id} 
                        className="case-card"
                        onClick={() => onCaseSelect(caseItem)}
                    >
                        <div className="case-card-content">
                            <div className="case-header">
                                <div className="case-id-container">
                                    <span className="case-number">{caseItem.id}</span>
                                    <span className={`status-badge ${caseItem.status.toLowerCase()}`}>
                                        {caseItem.status}
                                    </span>
                                </div>
                            </div>

                            <div className="case-title">
                                <h3>{caseItem.client}</h3>
                                <p>{caseItem.title}</p>
                            </div>

                            <div className="case-info">
                                <div className="info-row">
                                    <Gavel className="icon" />
                                    <span>{caseItem.type}</span>
                                </div>
                                <div className="info-row">
                                    <AccessTime className="icon" />
                                    <span>Prazo: {caseItem.deadline}</span>
                                </div>
                            </div>

                            <div className="case-metrics">
                                <div className="metric">
                                    <Description className="icon" />
                                    <span>{caseItem.documentsCount}</span>
                                </div>
                                <div className="metric">
                                    <Note className="icon" />
                                    <span>{caseItem.notesCount}</span>
                                </div>
                                <div className="metric">
                                    <Event className="icon" />
                                    <span>{caseItem.hearingsCount}</span>
                                </div>
                            </div>

                            <div className="case-actions">
                                <button className="view-details-btn">
                                    Ver Detalhes
                                </button>
                                <button className="more-options-btn">
                                    <MoreVert />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CaseList; 