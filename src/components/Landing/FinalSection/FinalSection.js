import React, { useState } from 'react';
import './FinalSection.css';
import backgroundImage from '../../../assets/images/background_fundo.png';

const FinalSection = () => {
  const [activeCard, setActiveCard] = useState(null);

  const features = [
    {
      id: 'analysis',
      title: 'Análise Preditiva',
      description: 'Nossa IA analisa casos anteriores e jurisprudências para prever possíveis resultados e estratégias jurídicas mais eficazes.'
    },
    {
      id: 'docs',
      title: 'Geração de Documentos',
      description: 'Criação automatizada de documentos jurídicos personalizados, incluindo contratos, petições e pareceres.'
    },
    {
      id: 'research',
      title: 'Pesquisa Jurídica',
      description: 'Busca inteligente em bases de dados jurídicas, identificando precedentes e legislações relevantes para seu caso.'
    },
    {
      id: 'summary',
      title: 'Resumo Automático',
      description: 'Transformação de textos jurídicos complexos em resumos claros e objetivos, facilitando a compreensão do caso.'
    },
    {
      id: 'match',
      title: 'Match Inteligente',
      description: 'Sistema de matching que conecta seu caso ao advogado especialista ideal, considerando área de atuação e experiência.'
    },
    {
      id: 'risk',
      title: 'Análise de Risco',
      description: 'Avaliação automatizada dos riscos jurídicos envolvidos no seu caso, auxiliando na tomada de decisões estratégicas.'
    }
  ];

  return (
    <section 
      className="final-section"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(${backgroundImage})`
      }}
    >
      <div className="final-content">
        <div className="title-container">
          <h2>Experimente uma plataforma</h2>
          <h2 className="highlight">jurídica mais inteligente em suas mãos</h2>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className={`feature-card ${activeCard === feature.id ? 'active' : ''}`}
              onMouseEnter={() => setActiveCard(feature.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <h3>{feature.title}</h3>
              {activeCard === feature.id && (
                <p className="feature-description">{feature.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinalSection; 