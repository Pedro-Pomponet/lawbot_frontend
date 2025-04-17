import React, { useState } from 'react';
import { validators, documentProcessors, errorHandlers } from '../../utils/helpers';
import { api } from '../../utils/api';
import { CHAT_CONFIG } from '../../config';
import { legalAnalyzer } from '../../utils/legalAnalysis';

const DocumentUpload = ({ onUpload }) => {
    const [dragging, setDragging] = useState(false);

    const handleDrop = async (e) => {
        e.preventDefault();
        setDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            const content = await file.text();
            
            onUpload(content, 'document_analysis');
        }
    };

    return (
        <div 
            className={`document-upload ${dragging ? 'dragging' : ''}`}
            onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
        >
            <div className="upload-content">
                <span className="upload-icon">📄</span>
                <p>Arraste documentos aqui</p>
                <p className="upload-subtitle">ou</p>
                <button className="upload-button">
                    Selecionar Arquivo
                </button>
            </div>
        </div>
    );
};

export default DocumentUpload; 