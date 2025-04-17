import React, { useState } from 'react';
import { Person, Share, Assignment, AccessTime } from '@mui/icons-material';
import './ClientPortal.css';

const mockClientAccess = [
    {
        clientId: 1,
        name: "João Silva",
        lastAccess: "2024-02-20",
        sharedDocs: 5,
        pendingReviews: 2,
        status: "active",
        email: "joao.silva@email.com",
        processos: ["0001234-12.2024.8.26.0000", "0004567-89.2024.8.26.0000"],
        documentosRecentes: [
            { id: 1, nome: "Petição Inicial.pdf", data: "2024-02-19" },
            { id: 2, nome: "Procuração.pdf", data: "2024-02-18" }
        ]
    },
    {
        clientId: 2,
        name: "Maria Santos",
        lastAccess: "2024-02-19",
        sharedDocs: 3,
        pendingReviews: 1,
        status: "active",
        email: "maria.santos@email.com",
        processos: ["0007890-12.2024.8.26.0000"],
        documentosRecentes: [
            { id: 3, nome: "Contrato Social.pdf", data: "2024-02-17" }
        ]
    }
];

const ClientPortal = ({ userId }) => {
    const [clientAccess, setClientAccess] = useState(mockClientAccess);
    const [selectedClient, setSelectedClient] = useState(null);

    return (
        <div className="portal-container">
            <div className="portal-header">
                <h2>Portal do Cliente</h2>
                <button className="add-client-button">
                    <Person /> Adicionar Cliente
                </button>
            </div>

            <div className="clients-grid">
                {clientAccess.map(client => (
                    <div key={client.clientId} className="client-card">
                        <div className="client-header">
                            <h3>{client.name}</h3>
                            <span className={`status-badge ${client.status}`}>
                                {client.status}
                            </span>
                        </div>
                        
                        <div className="client-info">
                            <p className="client-email">{client.email}</p>
                            <div className="info-stats">
                                <div className="stat">
                                    <Share />
                                    <span>{client.sharedDocs} documentos</span>
                                </div>
                                <div className="stat">
                                    <Assignment />
                                    <span>{client.pendingReviews} pendentes</span>
                                </div>
                                <div className="stat">
                                    <AccessTime />
                                    <span>Último acesso: {client.lastAccess}</span>
                                </div>
                            </div>
                        </div>

                        <div className="client-processes">
                            <h4>Processos Ativos</h4>
                            <ul>
                                {client.processos.map(processo => (
                                    <li key={processo}>{processo}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="recent-documents">
                            <h4>Documentos Recentes</h4>
                            <ul>
                                {client.documentosRecentes.map(doc => (
                                    <li key={doc.id}>
                                        {doc.nome}
                                        <span>{doc.data}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="client-actions">
                            <button className="action-button">
                                Compartilhar
                            </button>
                            <button className="action-button">
                                Gerenciar Acesso
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientPortal; 