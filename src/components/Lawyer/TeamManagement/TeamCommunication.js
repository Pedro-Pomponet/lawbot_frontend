import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';

const TeamCommunication = ({ communications, members }) => {
    const [message, setMessage] = useState('');
    const [selectedChannel, setSelectedChannel] = useState('general');
    const [channels] = useState([
        { id: 'general', name: 'Geral' },
        { id: 'cases', name: 'Casos' },
        { id: 'deadlines', name: 'Prazos' },
        { id: 'documents', name: 'Documentos' }
    ]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            await api.sendTeamMessage({
                content: message,
                channel: selectedChannel,
                timestamp: new Date()
            });
            setMessage('');
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    };

    return (
        <div className="team-communication">
            <header className="section-header">
                <h2>Comunicação da Equipe</h2>
                <div className="channel-selector">
                    <select
                        value={selectedChannel}
                        onChange={e => setSelectedChannel(e.target.value)}
                    >
                        {channels.map(channel => (
                            <option key={channel.id} value={channel.id}>
                                {channel.name}
                            </option>
                        ))}
                    </select>
                </div>
            </header>

            <div className="messages-container">
                {communications
                    .filter(msg => msg.channel === selectedChannel)
                    .map(msg => (
                        <div key={msg.id} className="message-card">
                            <div className="message-header">
                                <img 
                                    src={members.find(m => m.id === msg.authorId)?.avatar} 
                                    alt="" 
                                    className="author-avatar"
                                />
                                <div className="message-meta">
                                    <span className="author-name">
                                        {members.find(m => m.id === msg.authorId)?.name}
                                    </span>
                                    <span className="timestamp">
                                        {formatters.formatDate(msg.timestamp)}
                                    </span>
                                </div>
                            </div>
                            <p className="message-content">{msg.content}</p>
                            {msg.attachments?.length > 0 && (
                                <div className="attachments">
                                    {msg.attachments.map(attachment => (
                                        <a 
                                            key={attachment.id} 
                                            href={attachment.url}
                                            className="attachment-link"
                                        >
                                            📎 {attachment.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
            </div>

            <form onSubmit={handleSendMessage} className="message-form">
                <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default TeamCommunication; 