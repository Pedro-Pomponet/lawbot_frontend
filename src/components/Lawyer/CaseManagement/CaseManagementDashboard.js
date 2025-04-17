import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import CaseList from './CaseList';
import CaseDetails from './CaseDetails';
import CaseTimeline from './CaseTimeline';
import DocumentManager from './DocumentManager';
import CaseNotes from './CaseNotes';

const CaseManagementDashboard = () => {
    const [cases, setCases] = useState([]);
    const [selectedCase, setSelectedCase] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('list'); // list, details, timeline, documents, notes

    useEffect(() => {
        loadCases();
    }, []);

    const loadCases = async () => {
        try {
            const data = await api.getCases();
            setCases(data);
        } catch (error) {
            console.error('Erro ao carregar casos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCaseSelect = (caseId) => {
        const selectedCase = cases.find(c => c.id === caseId);
        setSelectedCase(selectedCase);
        setView('details');
    };

    return (
        <div className="case-management">
            <header className="dashboard-header">
                <h1>Gestão de Casos</h1>
                <div className="view-controls">
                    <button 
                        className={view === 'list' ? 'active' : ''}
                        onClick={() => setView('list')}
                    >
                        Lista de Casos
                    </button>
                    {selectedCase && (
                        <>
                            <button 
                                className={view === 'details' ? 'active' : ''}
                                onClick={() => setView('details')}
                            >
                                Detalhes
                            </button>
                            <button 
                                className={view === 'timeline' ? 'active' : ''}
                                onClick={() => setView('timeline')}
                            >
                                Linha do Tempo
                            </button>
                            <button 
                                className={view === 'documents' ? 'active' : ''}
                                onClick={() => setView('documents')}
                            >
                                Documentos
                            </button>
                            <button 
                                className={view === 'notes' ? 'active' : ''}
                                onClick={() => setView('notes')}
                            >
                                Anotações
                            </button>
                        </>
                    )}
                </div>
            </header>

            <div className="dashboard-content">
                {view === 'list' && (
                    <CaseList 
                        cases={cases}
                        onCaseSelect={handleCaseSelect}
                        onCaseUpdate={loadCases}
                    />
                )}

                {view === 'details' && selectedCase && (
                    <CaseDetails 
                        caseData={selectedCase}
                        onUpdate={loadCases}
                    />
                )}

                {view === 'timeline' && selectedCase && (
                    <CaseTimeline 
                        caseData={selectedCase}
                        onUpdate={loadCases}
                    />
                )}

                {view === 'documents' && selectedCase && (
                    <DocumentManager 
                        caseId={selectedCase.id}
                        onUpdate={loadCases}
                    />
                )}

                {view === 'notes' && selectedCase && (
                    <CaseNotes 
                        caseId={selectedCase.id}
                        onUpdate={loadCases}
                    />
                )}
            </div>
        </div>
    );
};

export default CaseManagementDashboard; 