import React, { useState } from 'react';
import { Scanner, Upload, CheckCircle, Error } from '@mui/icons-material';
import './DocumentScanner.css';

const mockScannedDocs = [
    {
        id: 1,
        title: "Contrato Social",
        pages: 15,
        status: "completed",
        accuracy: 98.5,
        date: "2024-02-20",
        downloadUrl: "/docs/contrato-social.pdf"
    },
    {
        id: 2,
        title: "Procuração",
        pages: 3,
        status: "processing",
        accuracy: 0,
        date: "2024-02-20",
        downloadUrl: null
    },
    {
        id: 3,
        title: "Petição Inicial",
        pages: 25,
        status: "completed",
        accuracy: 95.8,
        date: "2024-02-19",
        downloadUrl: "/docs/peticao.pdf"
    }
];

const DocumentScanner = ({ userId }) => {
    const [documents, setDocuments] = useState(mockScannedDocs);
    const [uploading, setUploading] = useState(false);

    const handleUpload = (event) => {
        // Lógica de upload
    };

    return (
        <div className="scanner-container">
            <div className="scanner-header">
                <h2>Scanner Inteligente</h2>
                <button className="upload-button" onClick={() => document.getElementById('fileInput').click()}>
                    <Upload /> Upload Documento
                </button>
                <input
                    type="file"
                    id="fileInput"
                    hidden
                    onChange={handleUpload}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                />
            </div>

            <div className="documents-list">
                {documents.map(doc => (
                    <div key={doc.id} className="document-item">
                        <div className="document-info">
                            <h3>{doc.title}</h3>
                            <p>{doc.pages} páginas • {doc.date}</p>
                            {doc.status === 'completed' && (
                                <span className="accuracy">
                                    Precisão: {doc.accuracy}%
                                </span>
                            )}
                        </div>
                        <div className="document-status">
                            {doc.status === 'completed' ? (
                                <CheckCircle className="status-icon completed" />
                            ) : (
                                <div className="processing">Processando...</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DocumentScanner; 