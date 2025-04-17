import React, { useState } from 'react';
import { FormatQuote } from '@mui/icons-material';
import './CitationManager.css';

const mockCitations = [
    {
        id: 1,
        text: "Art. 5º da CF/88",
        source: "Constituição Federal",
        page: 12,
        usedIn: ["Petição Inicial", "Recurso"]
    }
];

const CitationManager = ({ userId }) => {
    const [citations, setCitations] = useState(mockCitations);
    
    return (
        <div className="citations-container">
            <h2>Gerenciador de Citações</h2>
            {/* Implementação do componente */}
        </div>
    );
};

export default CitationManager; 