import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/Mock.css';

const ClientMock = () => {
    const navigate = useNavigate();
    const mockClient = {
        email: 'cliente@email.com',
        senha: 'cli123'
    };

    const handleBack = () => {
        navigate('/auth');
    };

    return (
        <div className="mock-container">
            <motion.div 
                className="mock-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h2>Conta de Teste - Cliente</h2>
                <p>Use esta conta para testar o sistema como cliente:</p>
                
                <div className="mock-item">
                    <p><strong>Email:</strong> {mockClient.email}</p>
                    <p><strong>Senha:</strong> {mockClient.senha}</p>
                </div>

                <button className="mock-back-button" onClick={handleBack}>
                    Voltar para Login
                </button>
            </motion.div>
        </div>
    );
};

export default ClientMock; 