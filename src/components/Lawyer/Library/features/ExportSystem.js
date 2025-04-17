import React, { useState, useEffect } from 'react';
import { 
    GetApp,
    Description,
    PictureAsPdf,
    Article,
    Settings,
    CloudDownload,
    FormatListBulleted,
    Check
} from '@mui/icons-material';
import './ExportSystem.css';

const ExportSystem = ({ documentId }) => {
    const [loading, setLoading] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState('pdf');
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [exportSettings, setExportSettings] = useState({
        includeMetadata: true,
        includeCitations: true,
        includePageNumbers: true,
        includeHeader: true,
        includeFooter: true,
        orientation: 'portrait',
        fontSize: 12,
        margins: {
            top: 2.5,
            bottom: 2.5,
            left: 3,
            right: 3
        }
    });

    const exportFormats = [
        { id: 'pdf', name: 'PDF', icon: <PictureAsPdf /> },
        { id: 'docx', name: 'Word (DOCX)', icon: <Description /> },
        { id: 'rtf', name: 'Rich Text (RTF)', icon: <Article /> },
        { id: 'txt', name: 'Texto Simples', icon: <FormatListBulleted /> }
    ];

    useEffect(() => {
        loadTemplates();
    }, []);

    const loadTemplates = async () => {
        try {
            const response = await fetch('/api/templates');
            const data = await response.json();
            setTemplates(data.templates);
        } catch (error) {
            console.error('Erro ao carregar templates:', error);
        }
    };

    const handleExport = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/documents/${documentId}/export`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    format: selectedFormat,
                    template: selectedTemplate,
                    settings: exportSettings
                })
            });

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `documento.${selectedFormat}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Erro na exportação:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBatchExport = async (documents) => {
        setLoading(true);
        try {
            const response = await fetch('/api/documents/batch-export', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    documents,
                    format: selectedFormat,
                    template: selectedTemplate,
                    settings: exportSettings
                })
            });

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'documentos.zip';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Erro na exportação em lote:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="export-system-container">
            <div className="export-header">
                <h3>
                    <GetApp />
                    Exportar Documento
                </h3>
                <button 
                    className="settings-button"
                    onClick={() => setShowSettings(!showSettings)}
                >
                    <Settings />
                    Configurações
                </button>
            </div>

            <div className="export-content">
                <div className="format-selection">
                    <h4>Formato de Exportação</h4>
                    <div className="format-options">
                        {exportFormats.map(format => (
                            <button
                                key={format.id}
                                className={`format-option ${selectedFormat === format.id ? 'selected' : ''}`}
                                onClick={() => setSelectedFormat(format.id)}
                            >
                                {format.icon}
                                <span>{format.name}</span>
                                {selectedFormat === format.id && (
                                    <Check className="selected-icon" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="template-selection">
                    <h4>Template</h4>
                    <select
                        value={selectedTemplate}
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                    >
                        <option value="">Selecione um template</option>
                        {templates.map(template => (
                            <option key={template.id} value={template.id}>
                                {template.name}
                            </option>
                        ))}
                    </select>
                </div>

                {showSettings && (
                    <div className="export-settings">
                        <h4>Configurações de Exportação</h4>
                        <div className="settings-grid">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={exportSettings.includeMetadata}
                                    onChange={(e) => setExportSettings({
                                        ...exportSettings,
                                        includeMetadata: e.target.checked
                                    })}
                                />
                                Incluir Metadados
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                    checked={exportSettings.includeCitations}
                                    onChange={(e) => setExportSettings({
                                        ...exportSettings,
                                        includeCitations: e.target.checked
                                    })}
                                />
                                Incluir Citações
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                    checked={exportSettings.includePageNumbers}
                                    onChange={(e) => setExportSettings({
                                        ...exportSettings,
                                        includePageNumbers: e.target.checked
                                    })}
                                />
                                Números de Página
                            </label>

                            <div className="margin-settings">
                                <h5>Margens (cm)</h5>
                                <div className="margin-inputs">
                                    <input
                                        type="number"
                                        value={exportSettings.margins.top}
                                        onChange={(e) => setExportSettings({
                                            ...exportSettings,
                                            margins: {
                                                ...exportSettings.margins,
                                                top: parseFloat(e.target.value)
                                            }
                                        })}
                                        min="0"
                                        step="0.5"
                                    />
                                    <input
                                        type="number"
                                        value={exportSettings.margins.right}
                                        onChange={(e) => setExportSettings({
                                            ...exportSettings,
                                            margins: {
                                                ...exportSettings.margins,
                                                right: parseFloat(e.target.value)
                                            }
                                        })}
                                        min="0"
                                        step="0.5"
                                    />
                                    <input
                                        type="number"
                                        value={exportSettings.margins.bottom}
                                        onChange={(e) => setExportSettings({
                                            ...exportSettings,
                                            margins: {
                                                ...exportSettings.margins,
                                                bottom: parseFloat(e.target.value)
                                            }
                                        })}
                                        min="0"
                                        step="0.5"
                                    />
                                    <input
                                        type="number"
                                        value={exportSettings.margins.left}
                                        onChange={(e) => setExportSettings({
                                            ...exportSettings,
                                            margins: {
                                                ...exportSettings.margins,
                                                left: parseFloat(e.target.value)
                                            }
                                        })}
                                        min="0"
                                        step="0.5"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="export-actions">
                    <button
                        className="export-button"
                        onClick={handleExport}
                        disabled={loading || !selectedFormat}
                    >
                        <CloudDownload />
                        {loading ? 'Exportando...' : 'Exportar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExportSystem; 