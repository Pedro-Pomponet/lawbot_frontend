import React, { forwardRef } from 'react';

const ChatMessages = forwardRef(({ messages, loading }, ref) => {
    return (
        <div className="messages-container">
            {messages.map((message, index) => (
                <div 
                    key={index} 
                    className={`message ${message.type}`}
                >
                    {message.content}
                </div>
            ))}
            {loading && (
                <div className="loading">
                    Pensando<span className="loading-dots"></span>
                </div>
            )}
            <div ref={ref} />
        </div>
    );
});

export default ChatMessages; 