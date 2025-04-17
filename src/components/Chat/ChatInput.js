import React, { useState } from 'react';

const ChatInput = ({ onSend, disabled }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    return (
        <form className="chat-input" onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                disabled={disabled}
            />
            <button type="submit" disabled={disabled || !message.trim()}>
                Enviar
            </button>
        </form>
    );
};

export default ChatInput; 