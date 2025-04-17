import React, { useState } from 'react';
import { api } from '../../../utils/api';

// Componente de Geração de Documentos
export const DocumentGenerator = ({ templates, onDocumentGenerate }) => {
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [formData, setFormData] = useState({});
    const [preview, setPreview] = useState(null);

    const handleGenerate = async () => {
        try {
            const document = await api.generateDocument(selectedTemplate, formData);
            onDocumentGenerate();
        } catch (error) {
            console.error('Erro ao gerar documento:', error);
        }
    };

    return (
        <div className="document-generator">
            <div className="template-selector">
                <h3>Selecione o Modelo</h3>
                <select onChange={e => setSelectedTemplate(e.target.value)}>
                    {templates.map(template => (
                        <option key={template.id} value={template.id}>
                            {template.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-fields">
                {selectedTemplate && templates
                    .find(t => t.id === selectedTemplate)?.fields
                    .map(field => (
                        <div key={field.id} className="form-group">
                            <label>{field.label}</label>
                            <input
                                type={field.type}
                                value={formData[field.id] || ''}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    [field.id]: e.target.value
                                }))}
                            />
                        </div>
                    ))}
            </div>

            {preview && (
                <div className="document-preview">
                    <iframe src={preview} title="Preview" />
                </div>
            )}

            <div className="generator-actions">
                <button onClick={() => handleGenerate()}>
                    Gerar Documento
                </button>
            </div>
        </div>
    );
};

// Componente de Gerenciamento de Templates
export const TemplateManager = ({ templates, onTemplateUpdate }) => {
    const [editingTemplate, setEditingTemplate] = useState(null);

    const handleSaveTemplate = async (template) => {
        try {
            await api.saveTemplate(template);
            onTemplateUpdate();
        } catch (error) {
            console.error('Erro ao salvar template:', error);
        }
    };

    return (
        <div className="template-manager">
            <div className="templates-list">
                {templates.map(template => (
                    <div key={template.id} className="template-card">
                        <h4>{template.name}</h4>
                        <div className="template-actions">
                            <button onClick={() => setEditingTemplate(template)}>
                                Editar
                            </button>
                            <button onClick={() => handleSaveTemplate(template)}>
                                Duplicar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Componente de Sistema de Assinaturas
export const SignatureSystem = ({ documents, onSignatureComplete }) => {
    const handleSign = async (documentId) => {
        try {
            await api.signDocument(documentId);
            onSignatureComplete();
        } catch (error) {
            console.error('Erro ao assinar documento:', error);
        }
    };

    return (
        <div className="signature-system">
            <div className="pending-signatures">
                {documents
                    .filter(doc => doc.needsSignature)
                    .map(doc => (
                        <div key={doc.id} className="signature-card">
                            <h4>{doc.name}</h4>
                            <button onClick={() => handleSign(doc.id)}>
                                Assinar Digitalmente
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

// Componente de Controle de Versões
export const VersionControl = ({ documents, onVersionUpdate }) => {
    const handleVersionUpdate = async (documentId, version) => {
        try {
            await api.updateDocumentVersion(documentId, version);
            onVersionUpdate();
        } catch (error) {
            console.error('Erro ao atualizar versão:', error);
        }
    };

    return (
        <div className="version-control">
            {documents.map(doc => (
                <div key={doc.id} className="version-card">
                    <h4>{doc.name}</h4>
                    <div className="version-history">
                        {doc.versions.map(version => (
                            <div key={version.id} className="version-item">
                                <span>v{version.number}</span>
                                <p>{version.changes}</p>
                                <button onClick={() => handleVersionUpdate(doc.id, version)}>
                                    Restaurar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}; 