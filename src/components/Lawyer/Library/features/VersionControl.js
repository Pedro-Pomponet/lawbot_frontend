import React, { useState, useEffect } from 'react';
import { 
    History,
    Compare,
    Restore,
    Create,
    Delete,
    Timeline,
    Merge,
    CallSplit,
    Save,
    Close
} from '@mui/icons-material';
import './VersionControl.css';

const VersionControl = ({ documentId }) => {
    const [versions, setVersions] = useState([]);
    const [selectedVersion, setSelectedVersion] = useState(null);
    const [compareVersion, setCompareVersion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [diffView, setDiffView] = useState(false);

    useEffect(() => {
        if (documentId) {
            loadVersions();
        }
    }, [documentId]);

    const loadVersions = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/documents/${documentId}/versions`);
            const data = await response.json();
            setVersions(data.versions);
        } catch (error) {
            console.error('Erro ao carregar versões:', error);
        } finally {
            setLoading(false);
        }
    };

    const createVersion = async (description) => {
        try {
            const response = await fetch(`/api/documents/${documentId}/versions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ description })
            });
            const data = await response.json();
            setVersions([...versions, data.version]);
        } catch (error) {
            console.error('Erro ao criar versão:', error);
        }
    };

    const restoreVersion = async (versionId) => {
        try {
            await fetch(`/api/documents/${documentId}/versions/${versionId}/restore`, {
                method: 'POST'
            });
            loadVersions();
        } catch (error) {
            console.error('Erro ao restaurar versão:', error);
        }
    };

    const compareVersions = async (version1Id, version2Id) => {
        try {
            const response = await fetch(
                `/api/documents/${documentId}/versions/compare?v1=${version1Id}&v2=${version2Id}`
            );
            const data = await response.json();
            return data.diff;
        } catch (error) {
            console.error('Erro ao comparar versões:', error);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="version-control-container">
            <div className="version-header">
                <h2>
                    <History />
                    Controle de Versões
                </h2>
                <button 
                    className="new-version-button"
                    onClick={() => createVersion('Nova versão')}
                >
                    <Create />
                    Nova Versão
                </button>
            </div>

            <div className="version-content">
                <div className="version-list">
                    <h3>Histórico de Versões</h3>
                    {loading ? (
                        <div className="loading">Carregando versões...</div>
                    ) : (
                        <ul>
                            {versions.map(version => (
                                <li 
                                    key={version.id}
                                    className={`version-item ${selectedVersion?.id === version.id ? 'selected' : ''}`}
                                >
                                    <div className="version-info">
                                        <span className="version-number">v{version.number}</span>
                                        <div className="version-details">
                                            <h4>{version.description}</h4>
                                            <p>
                                                {formatDate(version.createdAt)} por {version.author}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="version-actions">
                                        <button 
                                            onClick={() => setSelectedVersion(version)}
                                            title="Visualizar"
                                        >
                                            <Timeline />
                                        </button>
                                        <button 
                                            onClick={() => setCompareVersion(version)}
                                            title="Comparar"
                                            disabled={!selectedVersion || selectedVersion.id === version.id}
                                        >
                                            <Compare />
                                        </button>
                                        <button 
                                            onClick={() => restoreVersion(version.id)}
                                            title="Restaurar"
                                        >
                                            <Restore />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {selectedVersion && (
                    <div className="version-details-panel">
                        <div className="panel-header">
                            <h3>Detalhes da Versão {selectedVersion.number}</h3>
                            <div className="panel-actions">
                                <button onClick={() => setDiffView(!diffView)}>
                                    <Compare />
                                    {diffView ? 'Visualização Normal' : 'Visualizar Diferenças'}
                                </button>
                                <button onClick={() => restoreVersion(selectedVersion.id)}>
                                    <Restore />
                                    Restaurar Esta Versão
                                </button>
                            </div>
                        </div>

                        <div className="version-metadata">
                            <div>
                                <strong>Autor:</strong> {selectedVersion.author}
                            </div>
                            <div>
                                <strong>Data:</strong> {formatDate(selectedVersion.createdAt)}
                            </div>
                            <div>
                                <strong>Descrição:</strong> {selectedVersion.description}
                            </div>
                        </div>

                        <div className={`version-content-view ${diffView ? 'diff-view' : ''}`}>
                            {diffView && compareVersion ? (
                                <div className="diff-content">
                                    {/* Implementar visualização de diferenças */}
                                </div>
                            ) : (
                                <div className="normal-content">
                                    {selectedVersion.content}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {compareVersion && (
                <div className="version-compare-modal">
                    <div className="modal-header">
                        <h3>Comparando Versões</h3>
                        <button onClick={() => setCompareVersion(null)}>
                            <Close />
                        </button>
                    </div>
                    <div className="compare-content">
                        <div className="version-a">
                            <h4>Versão {selectedVersion.number}</h4>
                            <pre>{selectedVersion.content}</pre>
                        </div>
                        <div className="version-b">
                            <h4>Versão {compareVersion.number}</h4>
                            <pre>{compareVersion.content}</pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VersionControl; 