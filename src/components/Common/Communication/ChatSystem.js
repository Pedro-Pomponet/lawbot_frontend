import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import { contextManager } from '../../../utils/contextManager';

const ChatSystem = ({ userType }) => {
    const [messages, setMessages] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        loadChatHistory();
        setupRealTimeConnection();
    }, []);

    const loadChatHistory = async () => {
        try {
            const history = await api.getChatHistory();
            setMessages(history);
        } catch (error) {
            console.error('Erro ao carregar histórico:', error);
        }
    };

    const setupRealTimeConnection = () => {
        // Configurar websocket ou polling para mensagens em tempo real
    };

    const sendMessage = async (content, type = 'text') => {
        try {
            const response = await api.sendMessage({
                content,
                type,
                attachments: attachments
            });

            setMessages(prev => [...prev, response.message]);
            setAttachments([]);
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    };

    return (
        <div className="chat-system">
            <div className="chat-header">
                <h3>Comunicação</h3>
                {isTyping && <span>Digitando...</span>}
            </div>

            <div className="messages-container">
                {messages.map(msg => (
                    <MessageBubble 
                        key={msg.id}
                        message={msg}
                        userType={userType}
                    />
                ))}
            </div>

            <div className="chat-input">
                <AttachmentPanel 
                    attachments={attachments}
                    onAdd={setAttachments}
                />
                <MessageInput 
                    onSend={sendMessage}
                    onTyping={setIsTyping}
                />
            </div>
        </div>
    );
};

export default ChatSystem; 