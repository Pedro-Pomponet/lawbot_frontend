import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../styles/components/Auth.css';

const AuthSystem = () => {
    const navigate = useNavigate();

    const handleLawyerAccess = () => {
        navigate('/dashboard/lawyer');
    };

    const handleClientAccess = () => {
        navigate('/dashboard/client');
    };

    return (
        <div className="auth-container">
            <motion.div 
                className="auth-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="auth-header">
                    <h2>Bem-vindo ao LawBot</h2>
                    <p>Escolha como deseja acessar</p>
                </div>

                <div className="mock-buttons">
                    <button 
                        className="mock-button lawyer"
                        onClick={handleLawyerAccess}
                    >
                        Sou Advogado
                    </button>
                    <button 
                        className="mock-button client"
                        onClick={handleClientAccess}
                    >
                        Sou Cliente
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthSystem;