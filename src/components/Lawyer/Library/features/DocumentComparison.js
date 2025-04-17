import React, { useState } from 'react';
import { CompareArrows } from '@mui/icons-material';
import './DocumentComparison.css';

const mockComparisons = {
    differences: [
        {
            type: "addition",
            line: 45,
            content: "Nova cláusula sobre LGPD"
        },
        {
            type: "deletion",
            line: 67,
            content: "Cláusula antiga removida"
        }
    ]
};

const DocumentComparison = ({ userId }) => {
    const [comparisons, setComparisons] = useState(mockComparisons);
    
    return (
        <div className="comparison-container">
            <h2>Comparador de Documentos</h2>
            {/* Implementação do componente */}
        </div>
    );
};

export default DocumentComparison; 