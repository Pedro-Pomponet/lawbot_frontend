import React, { useState, useRef, useEffect } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { api } from '../../utils/api';
import './ChatInterface.css';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (message) => {
        try {
            setLoading(true);
            setError(null);

            // Adiciona mensagem do usuário imediatamente
            setMessages(prev => [...prev, { 
                type: 'user', 
                content: message 
            }]);

            // Envia para a API
            const response = await api.post('/chat', { message });

            // Adiciona resposta do bot
            setMessages(prev => [...prev, { 
                type: 'bot', 
                content: response.data.response 
            }]);

        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            setError(error.message || 'Erro ao enviar mensagem. Tente novamente.');
            
            // Adiciona mensagem de erro ao chat
            setMessages(prev => [...prev, { 
                type: 'error', 
                content: 'Erro ao enviar mensagem. Tente novamente.' 
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-container">
            {error && (
                <div className="error-banner">
                    {error}
                    <button onClick={() => setError(null)}>×</button>
                </div>
            )}
            
            <div className="chat-messages">
                <ChatMessages 
                    messages={messages} 
                    loading={loading} 
                    ref={messagesEndRef}
                />
            </div>

            <ChatInput 
                onSend={handleSendMessage} 
                disabled={loading} 
            />
        </div>
    );
};

export default ChatInterface;