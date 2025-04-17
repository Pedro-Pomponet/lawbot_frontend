import React from 'react';
import './HeroText.css';

const HeroText = () => {
  return (
    <div className="hero-content">
      <span className="hero-tag">Assistência Jurídica Inteligente</span>
      <h1>
        Conectando você aos melhores 
        <span className="highlight"> especialistas jurídicos</span>
      </h1>
      <div className="users-online">
        <div className="avatars">
          <img src="/avatars/avatar1.png" alt="" />
          <img src="/avatars/avatar2.png" alt="" />
          <img src="/avatars/avatar3.png" alt="" />
        </div>
        <p>+50 advogados disponíveis</p>
      </div>
      <button className="talk-btn">Falar com advogado</button>
    </div>
  );
};

export default HeroText; 