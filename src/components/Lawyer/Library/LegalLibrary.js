import React, { useState } from 'react';
import { 
    Search, 
    Psychology,
    CompareArrows,
    FormatQuote,
    MenuBook,
    Bookmark,
    History,
    TrendingUp
} from '@mui/icons-material';
import './LegalLibrary.css';
import VadeMecum from './features/VadeMecum';
import LegalResearch from './features/LegalResearch';
import DocumentComparison from './features/DocumentComparison';
import CitationManager from './features/CitationManager';

const LegalLibrary = () => {
    const [activeTab, setActiveTab] = useState('vademecum');

    const tabs = [
        {
            id: 'vademecum',
            label: 'Vade Mecum',
            icon: <MenuBook />,
            component: <VadeMecum />
        },
        {
            id: 'research',
            label: 'Pesquisa',
            icon: <Search />,
            component: <LegalResearch />
        },
        {
            id: 'comparison',
            label: 'Comparador',
            icon: <CompareArrows />,
            component: <DocumentComparison />
        },
        {
            id: 'citations',
            label: 'Citações',
            icon: <FormatQuote />,
            component: <CitationManager />
        }
    ];

    return (
        <div className="legal-library">
            <div className="library-header">
                <h2>Biblioteca Jurídica</h2>
                <p>Acesse toda a legislação e jurisprudência em um só lugar</p>
            </div>

            <div className="library-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className="library-content">
                {tabs.find(tab => tab.id === activeTab)?.component}
            </div>
        </div>
    );
};

export default LegalLibrary;