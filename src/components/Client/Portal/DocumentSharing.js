import React, { useState } from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';

const DocumentSharing = ({ documents, loading }) => {
    const [selectedFolder, setSelectedFolder] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const handleDownload = async (documentId) => {
        try {
            const url = await api.getDocumentDownloadUrl(documentId);
            window.open(url, '_blank');
        } catch (error) {
            console.error('Erro ao baixar documento:', error);
        }
    };

    const handleUpload = async (event) => {
        const files = event.target.files;
        if (!files.length) return;

        try {
            const formData = new FormData();
            for (let file of files) {
                formData.append('documents', file);
            }
            formData.append('folder', selectedFolder);

            await api.uploadClientDocuments(formData);
            // Recarregar documentos após upload
        } catch (error) {
            console.error('Erro ao enviar documentos:', error);
        }
    };

    const filteredDocuments = documents.filter(doc => {
        if (selectedFolder !== 'all' && doc.folder !== selectedFolder) return false;
        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            return doc.name.toLowerCase().includes(search) ||
                   doc.type.toLowerCase().includes(search);
        }
        return true;
    });

    if (loading) return <div className="loading">Carregando...</div>;

    return (
        <div className="document-sharing">
            <div className="documents-header">
                <h2>Documentos Compartilhados</h2>
                <div className="document-actions">
                    <div className="search-filter">
                        <input
                            type="text"
                            placeholder="Pesquisar documentos..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <select
                            value={selectedFolder}
                            onChange={e => setSelectedFolder(e.target.value)}
                        >
                            <option value="all">Todas as Pastas</option>
                            <option value="process">Processo</option>
                            <option value="contracts">Contratos</option>
                            <option value="personal">Documentos Pessoais</option>
                        </select>
                    </div>
                    <div className="upload-section">
                        <label className="upload-btn">
                            Enviar Documentos
                            <input
                                type="file"
                                multiple
                                onChange={handleUpload}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div className="documents-grid">
                {filteredDocuments.map(doc => (
                    <div key={doc.id} className="document-card">
                        <div className="document-icon">
                            {doc.type === 'pdf' ? '📄' : 
                             doc.type === 'image' ? '🖼️' : '📎'}
                        </div>
                        <div className="document-info">
                            <h4>{doc.name}</h4>
                            <span className="document-meta">
                                {formatters.formatFileSize(doc.size)} • 
                                {formatters.formatDate(doc.uploadDate)}
                            </span>
                            <span className="document-folder">
                                📁 {doc.folder}
                            </span>
                        </div>
                        <div className="document-actions">
                            <button 
                                onClick={() => handleDownload(doc.id)}
                                className="download-btn"
                            >
                                ⬇️ Baixar
                            </button>
                            {doc.needsSignature && (
                                <button className="sign-btn">
                                    ✍️ Assinar
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DocumentSharing;
