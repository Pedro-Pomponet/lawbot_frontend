import React from 'react';
import './Automation.css';
import { useLocation, Navigate } from 'react-router-dom';

const Automation = () => {
    const location = useLocation();
    const userData = location.state?.user;

    if (!userData) {
        return <Navigate to="/" />;
    }

    return (
        <div className="automation-container">
            <header className="automation-header">
                <h2>Automação de Documentos</h2>
                <p>Automatize a geração de documentos jurídicos</p>
            </header>
            
            <div className="automation-content">
                <div className="feature-coming-soon">
                    <h3>Em Desenvolvimento</h3>
                    <p>Esta funcionalidade estará disponível em breve.</p>
                    <ul>
                        <li>Geração automática de petições</li>
                        <li>Templates personalizáveis</li>
                        <li>Integração com IA para sugestões</li>
                        <li>Biblioteca de modelos</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Automation; 