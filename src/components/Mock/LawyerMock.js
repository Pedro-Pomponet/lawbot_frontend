import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/Mock.css';

const LawyerMock = () => {
    const navigate = useNavigate();
    const mockLawyer = {
        email: 'advogado@lawbot.com',
        senha: 'adv123',
        oab: '12345/SE'
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
                <h2>Conta de Teste - Advogado</h2>
                <p>Use esta conta para testar o sistema como advogado:</p>
                
                <div className="mock-item">
                    <p><strong>Email:</strong> {mockLawyer.email}</p>
                    <p><strong>Senha:</strong> {mockLawyer.senha}</p>
                    <p><strong>OAB:</strong> {mockLawyer.oab}</p>
                </div>

                <button className="mock-back-button" onClick={handleBack}>
                    Voltar para Login
                </button>
            </motion.div>
        </div>
    );
};

export default LawyerMock;