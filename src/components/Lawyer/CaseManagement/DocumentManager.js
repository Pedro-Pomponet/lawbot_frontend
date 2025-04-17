import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';

const DocumentManager = ({ caseId, onUpdate }) => {
    const [documents, setDocuments] = useState([]);
    const [folders, setFolders] = useState([]);
    const [currentFolder, setCurrentFolder] = useState('root');
    const [uploading, setUploading] = useState(false);
    const [newFolder, setNewFolder] = useState('');

    useEffect(() => {
        loadDocuments();
    }, [caseId, currentFolder]);

    const loadDocuments = async () => {
        try {
            const [docs, folders] = await Promise.all([
                api.getCaseDocuments(caseId, currentFolder),
                api.getDocumentFolders(caseId)
            ]);
            setDocuments(docs);
            setFolders(folders);
        } catch (error) {
            console.error('Erro ao carregar documentos:', error);
        }
    };

    const handleUpload = async (files) => {
        setUploading(true);
        try {
            const uploads = await Promise.all(
                Array.from(files).map(file => 
                    api.uploadCaseDocument(caseId, file, currentFolder)
                )
            );
            setDocuments(prev => [...prev, ...uploads]);
            onUpdate();
        } catch (error) {
            console.error('Erro no upload:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleCreateFolder = async (e) => {
        e.preventDefault();
        if (!newFolder.trim()) return;

        try {
            await api.createDocumentFolder(caseId, newFolder, currentFolder);
            setNewFolder('');
            loadDocuments();
        } catch (error) {
            console.error('Erro ao criar pasta:', error);
        }
    };

    const handleDelete = async (docId) => {
        if (!window.confirm('Tem certeza que deseja excluir este documento?')) {
            return;
        }

        try {
            await api.deleteDocument(docId);
            setDocuments(prev => prev.filter(d => d.id !== docId));
            onUpdate();
        } catch (error) {
            console.error('Erro ao excluir documento:', error);
        }
    };

    return (
        <div className="document-manager">
            <header className="manager-header">
                <h2>Documentos do Processo</h2>
                <div className="folder-navigation">
                    <button 
                        onClick={() => setCurrentFolder('root')}
                        disabled={currentFolder === 'root'}
                    >
                        Início
                    </button>
                    {currentFolder !== 'root' && (
                        <span className="current-path">
                            / {currentFolder}
                        </span>
                    )}
                </div>
            </header>

            <div className="manager-actions">
                <form onSubmit={handleCreateFolder} className="new-folder-form">
                    <input
                        type="text"
                        placeholder="Nome da nova pasta"
                        value={newFolder}
                        onChange={e => setNewFolder(e.target.value)}
                    />
                    <button type="submit">Criar Pasta</button>
                </form>

                <div className="upload-area">
                    <input
                        type="file"
                        multiple
                        onChange={e => handleUpload(e.target.files)}
                        disabled={uploading}
                    />
                    <p className="upload-info">
                        {uploading ? 'Enviando...' : 'Arraste arquivos ou clique para upload'}
                    </p>
                </div>
            </div>

            <div className="folders-grid">
                {folders.map(folder => (
                    <div 
                        key={folder.id} 
                        className="folder-card"
                        onClick={() => setCurrentFolder(folder.path)}
                    >
                        <i className="folder-icon">📁</i>
                        <span>{folder.name}</span>
                        <span className="item-count">
                            {folder.itemCount} itens
                        </span>
                    </div>
                ))}
            </div>

            <div className="documents-grid">
                {documents.map(doc => (
                    <div key={doc.id} className="document-card">
                        <div className="doc-icon">
                            {doc.type === 'pdf' ? '📄' : 
                             doc.type === 'image' ? '🖼️' : '📎'}
                        </div>
                        
                        <div className="doc-info">
                            <h4>{doc.name}</h4>
                            <span className="doc-meta">
                                {formatters.formatFileSize(doc.size)} • 
                                {formatters.formatDate(doc.uploadedAt)}
                            </span>
                        </div>

                        <div className="doc-actions">
                            <a 
                                href={doc.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="view-btn"
                            >
                                Visualizar
                            </a>
                            <button
                                onClick={() => handleDelete(doc.id)}
                                className="delete-btn"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DocumentManager; 