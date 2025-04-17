import React from 'react';
import { Psychology } from '@mui/icons-material';
import AIAssistant from './AIAssistant';
import './LegalAI.css';

const LegalAI = () => {
    return (
        <div className="legal-ai">
            <div className="legal-ai-header">
                <div className="header-icon">
                    <Psychology />
                </div>
                <div className="header-content">
                    <h2>IA Jurídica</h2>
                    <p>Assistente inteligente para suas atividades jurídicas</p>
                </div>
            </div>
            
            <div className="legal-ai-content">
                <AIAssistant />
            </div>
        </div>
    );
};

export default LegalAI;