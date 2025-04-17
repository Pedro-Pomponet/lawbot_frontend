import React from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';

const ConnectionRequests = ({ requests, onRequestUpdate }) => {
    const handleAccept = async (requestId) => {
        try {
            await api.acceptConnection(requestId);
            onRequestUpdate();
        } catch (error) {
            console.error('Erro ao aceitar conexão:', error);
        }
    };

    const handleReject = async (requestId) => {
        try {
            await api.rejectConnection(requestId);
            onRequestUpdate();
        } catch (error) {
            console.error('Erro ao rejeitar conexão:', error);
        }
    };

    return (
        <div className="connection-requests">
            <header className="section-header">
                <h2>Solicitações de Conexão</h2>
                <span className="request-count">
                    {requests.length} pendentes
                </span>
            </header>

            <div className="requests-list">
                {requests.map(request => (
                    <div key={request.id} className="request-card">
                        <div className="requester-info">
                            <img src={request.from.avatar} alt="" className="requester-avatar" />
                            <div className="requester-details">
                                <h3>{request.from.name}</h3>
                                <p>{request.from.specialty}</p>
                                <p>{request.from.location}</p>
                            </div>
                        </div>

                        <p className="request-message">{request.message}</p>

                        <div className="mutual-connections">
                            <span>{request.mutualConnections} conexões em comum</span>
                        </div>

                        <div className="request-actions">
                            <button
                                onClick={() => handleAccept(request.id)}
                                className="accept-btn"
                            >
                                Aceitar
                            </button>
                            <button
                                onClick={() => handleReject(request.id)}
                                className="reject-btn"
                            >
                                Recusar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConnectionRequests; 