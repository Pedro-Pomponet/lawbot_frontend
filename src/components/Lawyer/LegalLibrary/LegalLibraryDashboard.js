import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import DocumentTemplates from './DocumentTemplates';
import JurisprudenceSearch from './JurisprudenceSearch';
import LegislationBrowser from './LegislationBrowser';
import ArticlesSection from './ArticlesSection';
import { 
    Dashboard, 
    MenuBook, 
    Description, 
    History, 
    Bookmark,
    Search,
    TrendingUp,
    Notifications,
    FileCopy,
    Analytics,
    Create,
    Edit,
    CloudUpload,
    CloudDownload,
    Share,
    Delete,
    Star,
    StarBorder,
    MoreVert
} from '@mui/icons-material';
import './LegalLibraryDashboard.css';

// Importando os sistemas da biblioteca
import TemplateSystem from '../Library/features/TemplateSystem';
import AnalyticsSystem from '../Library/features/AnalyticsSystem';
import NotificationSystem from '../Library/features/NotificationSystem';
import RecommendationSystem from '../Library/features/RecommendationSystem';
import OCRSystem from '../Library/features/OCRSystem';
import CitationSystem from '../Library/features/CitationSystem';
import LegalDatabaseIntegration from '../Library/features/LegalDatabaseIntegration';

const LegalLibraryDashboard = ({ user }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [showESignModal, setShowESignModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    
    // Mock de documentos recentes
    const recentDocuments = [
        { id: 1, title: "Contrato de Prestação de Serviços", type: "contract", date: "2024-03-15", signed: true },
        { id: 2, title: "Petição Inicial - Processo 12345", type: "petition", date: "2024-03-10", signed: false },
        { id: 3, title: "Parecer Jurídico - Caso XYZ", type: "opinion", date: "2024-03-05", signed: true },
        { id: 4, title: "Procuração Ad Judicia", type: "power_of_attorney", date: "2024-03-01", signed: true }
    ];
    
    // Mock de modelos favoritos
    const favoriteTemplates = [
        { id: 1, title: "Contrato de Trabalho CLT", category: "Trabalhista", usageCount: 45 },
        { id: 2, title: "Petição de Divórcio Consensual", category: "Família", usageCount: 32 },
        { id: 3, title: "Contestação Padrão", category: "Processual", usageCount: 67 }
    ];
    
    // Mock de estatísticas
    const statistics = {
        documentsCreated: 156,
        templatesSaved: 48,
        searchesMade: 312,
        documentsShared: 27
    };
    
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    
    const handleDocumentClick = (document) => {
        setSelectedDocument(document);
        if (!document.signed) {
            setShowESignModal(true);
        }
    };
    
    const handleSignDocument = () => {
        // Lógica para assinar o documento
        setSelectedDocument({...selectedDocument, signed: true});
        setShowESignModal(false);
    };
    
    const renderOverview = () => (
        <div className="library-overview">
            <div className="overview-header">
                <h2>Visão Geral da Biblioteca</h2>
                <div className="search-container">
                    <Search />
                    <input 
                        type="text" 
                        placeholder="Pesquisar na biblioteca..." 
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            
            <div className="statistics-cards">
                <div className="stat-card">
                    <Description />
                    <div className="stat-content">
                        <h3>{statistics.documentsCreated}</h3>
                        <p>Documentos Criados</p>
                    </div>
                </div>
                <div className="stat-card">
                    <FileCopy />
                    <div className="stat-content">
                        <h3>{statistics.templatesSaved}</h3>
                        <p>Modelos Salvos</p>
                    </div>
                </div>
                <div className="stat-card">
                    <Search />
                    <div className="stat-content">
                        <h3>{statistics.searchesMade}</h3>
                        <p>Pesquisas Realizadas</p>
                    </div>
                </div>
                <div className="stat-card">
                    <Share />
                    <div className="stat-content">
                        <h3>{statistics.documentsShared}</h3>
                        <p>Documentos Compartilhados</p>
                    </div>
                </div>
            </div>
            
            <div className="recent-documents">
                <div className="section-header">
                    <h3>Documentos Recentes</h3>
                    <button className="view-all-btn">Ver Todos</button>
                </div>
                <div className="documents-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Tipo</th>
                                <th>Data</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentDocuments.map(doc => (
                                <tr key={doc.id} onClick={() => handleDocumentClick(doc)}>
                                    <td>{doc.title}</td>
                                    <td>{doc.type}</td>
                                    <td>{doc.date}</td>
                                    <td>
                                        <span className={`status-badge ${doc.signed ? 'signed' : 'unsigned'}`}>
                                            {doc.signed ? 'Assinado' : 'Não Assinado'}
                                        </span>
                                    </td>
                                    <td className="actions-cell">
                                        <button className="action-btn"><Edit /></button>
                                        <button className="action-btn"><Share /></button>
                                        <button className="action-btn"><CloudDownload /></button>
                                        <button className="action-btn"><Delete /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="favorite-templates">
                <div className="section-header">
                    <h3>Modelos Favoritos</h3>
                    <button className="view-all-btn">Ver Todos</button>
                </div>
                <div className="templates-grid">
                    {favoriteTemplates.map(template => (
                        <div key={template.id} className="template-card">
                            <div className="template-header">
                                <FileCopy />
                                <button className="favorite-btn"><Star /></button>
                            </div>
                            <h4>{template.title}</h4>
                            <p className="template-category">{template.category}</p>
                            <p className="template-usage">Usado {template.usageCount} vezes</p>
                            <div className="template-actions">
                                <button className="template-btn">Usar</button>
                                <button className="template-btn">Editar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    
    const renderContent = () => {
        switch(activeTab) {
            case 'templates':
                return <TemplateSystem userId={user.id} />;
            case 'analytics':
                return <AnalyticsSystem userId={user.id} />;
            case 'notifications':
                return <NotificationSystem userId={user.id} />;
            case 'recommendations':
                return <RecommendationSystem userId={user.id} />;
            case 'ocr':
                return <OCRSystem />;
            case 'citations':
                return <CitationSystem documentId={selectedDocument?.id} />;
            case 'database':
                return <LegalDatabaseIntegration />;
            default:
                return renderOverview();
        }
    };
    
    return (
        <div className="legal-library-dashboard">
            <aside className="library-sidebar">
                <div className="sidebar-header">
                    <MenuBook />
                    <h2>Biblioteca Jurídica</h2>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li 
                            className={activeTab === 'overview' ? 'active' : ''}
                            onClick={() => setActiveTab('overview')}
                        >
                            <Dashboard /> Visão Geral
                        </li>
                        <li 
                            className={activeTab === 'templates' ? 'active' : ''}
                            onClick={() => setActiveTab('templates')}
                        >
                            <FileCopy /> Sistema de Modelos
                        </li>
                        <li 
                            className={activeTab === 'analytics' ? 'active' : ''}
                            onClick={() => setActiveTab('analytics')}
                        >
                            <Analytics /> Sistema de Análise
                        </li>
                        <li 
                            className={activeTab === 'notifications' ? 'active' : ''}
                            onClick={() => setActiveTab('notifications')}
                        >
                            <Notifications /> Sistema de Notificações
                        </li>
                        <li 
                            className={activeTab === 'recommendations' ? 'active' : ''}
                            onClick={() => setActiveTab('recommendations')}
                        >
                            <TrendingUp /> Sistema de Recomendações
                        </li>
                        <li 
                            className={activeTab === 'ocr' ? 'active' : ''}
                            onClick={() => setActiveTab('ocr')}
                        >
                            <Create /> Sistema OCR
                        </li>
                        <li 
                            className={activeTab === 'citations' ? 'active' : ''}
                            onClick={() => setActiveTab('citations')}
                        >
                            <Bookmark /> Sistema de Citações
                        </li>
                        <li 
                            className={activeTab === 'database' ? 'active' : ''}
                            onClick={() => setActiveTab('database')}
                        >
                            <MenuBook /> Integração com Banco de Dados Jurídicos
                        </li>
                    </ul>
                </nav>
            </aside>
            
            <main className="library-content">
                {renderContent()}
            </main>
            
            {showESignModal && (
                <div className="esign-modal-overlay">
                    <div className="esign-modal">
                        <div className="modal-header">
                            <h3>Assinar Documento</h3>
                            <button 
                                className="close-modal"
                                onClick={() => setShowESignModal(false)}
                            >
                                &times;
                            </button>
                        </div>
                        
                        <div className="modal-content">
                            <div className="document-preview">
                                <h4>{selectedDocument.title}</h4>
                                <div className="preview-placeholder">
                                    <Description />
                                    <p>Prévia do documento</p>
                                </div>
                            </div>
                            
                            <div className="signature-area">
                                <h4>Sua Assinatura</h4>
                                <div className="signature-canvas">
                                    <p>Desenhe sua assinatura aqui</p>
                                </div>
                                <div className="signature-options">
                                    <button className="clear-btn">Limpar</button>
                                    <button className="type-btn">Digitar</button>
                                    <button className="upload-btn">Carregar Imagem</button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="modal-actions">
                            <button 
                                className="cancel-btn"
                                onClick={() => setShowESignModal(false)}
                            >
                                Cancelar
                            </button>
                            <button 
                                className="sign-btn"
                                onClick={handleSignDocument}
                            >
                                Assinar Documento
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LegalLibraryDashboard; 