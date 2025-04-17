import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import DocumentGenerator from './DocumentGenerator';
import TemplateManager from './TemplateManager';
import SignatureSystem from './SignatureSystem';
import VersionControl from './VersionControl';

const DocumentAutomationSystem = () => {
    const [activeTab, setActiveTab] = useState('generator');
    const [templates, setTemplates] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [templatesData, documentsData] = await Promise.all([
                api.getDocumentTemplates(),
                api.getGeneratedDocuments()
            ]);
            setTemplates(templatesData);
            setDocuments(documentsData);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="document-automation">
            <nav className="automation-nav">
                <button 
                    className={activeTab === 'generator' ? 'active' : ''}
                    onClick={() => setActiveTab('generator')}
                >
                    Gerar Documentos
                </button>
                <button 
                    className={activeTab === 'templates' ? 'active' : ''}
                    onClick={() => setActiveTab('templates')}
                >
                    Templates
                </button>
                <button 
                    className={activeTab === 'signature' ? 'active' : ''}
                    onClick={() => setActiveTab('signature')}
                >
                    Assinaturas
                </button>
                <button 
                    className={activeTab === 'versions' ? 'active' : ''}
                    onClick={() => setActiveTab('versions')}
                >
                    Versões
                </button>
            </nav>

            <div className="automation-content">
                {activeTab === 'generator' && (
                    <DocumentGenerator 
                        templates={templates}
                        onDocumentGenerate={loadData}
                    />
                )}
                {activeTab === 'templates' && (
                    <TemplateManager 
                        templates={templates}
                        onTemplateUpdate={loadData}
                    />
                )}
                {activeTab === 'signature' && (
                    <SignatureSystem 
                        documents={documents}
                        onSignatureComplete={loadData}
                    />
                )}
                {activeTab === 'versions' && (
                    <VersionControl 
                        documents={documents}
                        onVersionUpdate={loadData}
                    />
                )}
            </div>
        </div>
    );
};

export default DocumentAutomationSystem; 