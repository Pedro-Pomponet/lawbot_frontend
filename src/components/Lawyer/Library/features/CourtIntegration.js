import React, { useState } from 'react';
import { Gavel } from '@mui/icons-material';
import './CourtIntegration.css';

const mockProcesses = [
    {
        numero: "0123456-78.2024.8.26.0000",
        tribunal: "TJSP",
        status: "Em andamento",
        ultimaMovimentacao: "2024-02-19",
        proximoPrazo: "2024-03-01",
        tipo: "Recurso Especial"
    }
];

const CourtIntegration = ({ userId }) => {
    const [processes, setProcesses] = useState(mockProcesses);
    
    return (
        <div className="court-container">
            <h2>Integração com Tribunais</h2>
            {/* Implementação do componente */}
        </div>
    );
};

export default CourtIntegration; 