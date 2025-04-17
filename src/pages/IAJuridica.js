import React, { useState } from 'react';
import { 
    Psychology,
    Chat,
    Description,
    Analytics,
    AutoAwesome,
    Send,
    LibraryBooks,
    Lightbulb,
    Search
} from '@mui/icons-material';
import './IAJuridica.css';

const mockMessages = [
    { id: 1, type: 'bot', text: 'Olá! Como posso ajudar você hoje?' },
    { id: 2, type: 'user', text: 'Preciso de ajuda com um contrato' },
    { id: 3, type: 'bot', text: 'Claro! Que tipo de contrato você precisa analisar?' }
];

const mockVadeMecum = [
    {
        id: 1,
        title: 'Código Civil',
        description: 'Lei nº 10.406/2002',
        articles: '2.046 artigos',
        lastUpdate: '2024-01-15'
    },
    {
        id: 2,
        title: 'Código de Processo Civil',
        description: 'Lei nº 13.105/2015',
        articles: '1.072 artigos',
        lastUpdate: '2024-02-01'
    },
    {
        id: 3,
        title: 'Código Penal',
        description: 'Decreto-Lei nº 2.848/1940',
        articles: '361 artigos',
        lastUpdate: '2024-01-20'
    }
];

const IAJuridica = () => {
    const [activeFeature, setActiveFeature] = useState('chat');
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState(mockMessages);
    const [searchTerm, setSearchTerm] = useState('');

    const features = [
        {
            id: 'chat',
            title: 'ChatBot Jurídico',
            icon: <Chat />,
            description: 'Assistente virtual para dúvidas jurídicas',
            color: '#4299e1'
        },
        {
            id: 'analysis',
            title: 'Análise Documental',
            icon: <Description />,
            description: 'Análise automática de documentos jurídicos',
            color: '#48bb78'
        },
        {
            id: 'suggestions',
            title: 'Sugestões Inteligentes',
            icon: <Lightbulb />,
            description: 'Recomendações para melhorar documentos',
            color: '#ed8936'
        },
        {
            id: 'research',
            title: 'Pesquisa Preditiva',
            icon: <Analytics />,
            description: 'Análise de precedentes e probabilidades',
            color: '#9f7aea'
        },
        {
            id: 'vademecum',
            title: 'Vade Mecum Digital',
            icon: <LibraryBooks />,
            description: 'Consulta inteligente à legislação',
            color: '#f56565'
        }
    ];

    const handleSendMessage = () => {
        if (!message.trim()) return;

        const newMessage = {
            id: chatHistory.length + 1,
            type: 'user',
            text: message
        };

        setChatHistory([...chatHistory, newMessage]);
        setMessage('');

        setTimeout(() => {
            const botResponse = {
                id: chatHistory.length + 2,
                type: 'bot',
                text: 'Entendi sua solicitação. Estou analisando as informações...'
            };
            setChatHistory(prev => [...prev, botResponse]);
        }, 1000);
    };

    return (
        <div className="ia-juridica">
            <div className="ia-header">
                <Psychology className="ia-icon" />
                <div>
                    <h1>IA Jurídica</h1>
                    <p>Assistente inteligente para suas atividades jurídicas</p>
                </div>
            </div>

            <div className="features-grid">
                {features.map(feature => (
                    <div 
                        key={feature.id}
                        className={`feature-card ${activeFeature === feature.id ? 'active' : ''}`}
                        onClick={() => setActiveFeature(feature.id)}
                        style={{ '--card-color': feature.color }}
                    >
                        <div className="feature-icon">
                            {feature.icon}
                        </div>
                        <div className="feature-info">
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="feature-content">
                {activeFeature === 'chat' && (
                    <div className="chat-container">
                        <div className="chat-messages">
                            {chatHistory.map(msg => (
                                <div key={msg.id} className={`message ${msg.type}`}>
                                    {msg.type === 'bot' && <Psychology className="bot-icon" />}
                                    <p>{msg.text}</p>
                                </div>
                            ))}
                        </div>
                        <div className="chat-input">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Digite sua mensagem..."
                            />
                            <button onClick={handleSendMessage}>
                                <Send />
                            </button>
                        </div>
                    </div>
                )}

                {activeFeature === 'vademecum' && (
                    <div className="vademecum-container">
                        <div className="search-bar">
                            <Search />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Pesquisar na legislação..."
                            />
                        </div>
                        <div className="laws-grid">
                            {mockVadeMecum.map(law => (
                                <div key={law.id} className="law-card">
                                    <h3>{law.title}</h3>
                                    <p className="law-description">{law.description}</p>
                                    <div className="law-info">
                                        <span>{law.articles}</span>
                                        <span>Atualizado: {law.lastUpdate}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IAJuridica; 