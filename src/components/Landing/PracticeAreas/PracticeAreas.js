import React, { useState } from 'react';
import './PracticeAreas.css';
import trabalhistaIcon from '../../../assets/icons/Trabalhista_icon.png';
import consumidorIcon from '../../../assets/icons/Consumidor_icon.png';
import matrimonialIcon from '../../../assets/icons/Matrimonial_icon.png';
import civilIcon from '../../../assets/icons/Civil_icon.png';

const PracticeAreas = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardHover = (index) => {
    setExpandedCard(index);
  };

  const handleCardLeave = () => {
    setExpandedCard(null);
  };

  const areaCards = [
    {
      icon: trabalhistaIcon,
      title: "Direito Trabalhista",
      description: "Rescisões, horas extras, assédio moral e direitos do trabalhador"
    },
    {
      icon: consumidorIcon,
      title: "Direito do Consumidor",
      description: "Defesa nas relações de consumo, indenizações e reparação de danos"
    },
    {
      icon: matrimonialIcon,
      title: "Direito Familiar",
      description: "Divórcios, pensão alimentícia, guarda de filhos e inventários"
    },
    {
      icon: civilIcon,
      title: "Direito Civil",
      description: "Contratos, cobranças, danos morais e responsabilidade civil"
    }
  ];

  return (
    <section className="practice-areas" aria-label="Áreas de Atuação">
      <div className="practice-content">
        <div className="practice-text">
          <h2>
            Áreas de<br />
            <span>Atuação</span>
          </h2>
          <p>
            Nossa plataforma conecta você a especialistas em diversas áreas do direito.
            Conte com inteligência artificial e profissionais qualificados para seu caso.
          </p>
        </div>

        <div className="area-cards">
          {areaCards.map((card, index) => (
            <div
              key={index}
              className={`area-card ${expandedCard === index ? 'expanded' : ''}`}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={handleCardLeave}
            >
              <div className="card-icon">
                <img src={card.icon} alt={card.title} />
              </div>
              <h4>{card.title}</h4>
              <p className="card-description">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas; 