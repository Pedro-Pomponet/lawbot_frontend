import React, { useState } from 'react';
import { 
    Gavel,
    Refresh,
    Download,
    Upload,
    Notifications
} from '@mui/icons-material';
import './CourtIntegration.css';

const CourtIntegration = () => {
    const [selectedCourt, setSelectedCourt] = useState('');
    const [notifications, setNotifications] = useState([]);

    const courts = [
        { id: 'tjsp', name: 'TJSP' },
        { id: 'trt2', name: 'TRT-2' },
        { id: 'trf3', name: 'TRF-3' },
        // ... mais tribunais
    ];

    const mockProcesses = [
        {
            numero: '1234567-89.2024.8.26.0000',
            tribunal: 'TJSP',
            status: 'Concluso para despacho',
            ultimaAtualizacao: '2024-03-15 14:30'
        },
        // ... mais processos
    ];

    return (
        <div className="court-integration">
            <div className="court-header">
                <h2>Integração com Tribunais</h2>
                <div className="court-actions">
                    <select 
                        value={selectedCourt}
                        onChange={(e) => setSelectedCourt(e.target.value)}
                    >
                        <option value="">Selecione um tribunal</option>
                        {courts.map(court => (
                            <option key={court.id} value={court.id}>
                                {court.name}
                            </option>
                        ))}
                    </select>
                    <button className="sync-btn">
                        <Refresh /> Sincronizar
                    </button>
                </div>
            </div>

            <div className="court-content">
                <div className="process-list">
                    {mockProcesses.map(process => (
                        <div key={process.numero} className="process-card">
                            <div className="process-info">
                                <h3>{process.numero}</h3>
                                <span className="tribunal-badge">
                                    {process.tribunal}
                                </span>
                            </div>
                            <div className="process-status">
                                <span>{process.status}</span>
                                <small>
                                    Última atualização: {process.ultimaAtualizacao}
                                </small>
                            </div>
                            <div className="process-actions">
                                <button>
                                    <Download /> Baixar
                                </button>
                                <button>
                                    <Upload /> Peticionar
                                </button>
                                <button>
                                    <Notifications /> Acompanhar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourtIntegration; 