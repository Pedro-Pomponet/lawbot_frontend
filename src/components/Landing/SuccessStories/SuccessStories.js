import React from 'react';
import './SuccessStories.css';
import trabalhistaIcon from '../../../assets/icons/Trabalhista_icon.png';
import consumidorIcon from '../../../assets/icons/Consumidor_icon.png';
import matrimonialIcon from '../../../assets/icons/Matrimonial_icon.png';
import civilIcon from '../../../assets/icons/Civil_icon.png';

const SuccessStories = () => {
  return (
    <section className="success-section">
      <h2>Success Stories</h2>
      <h3>To Know About Our Lawyers</h3>
      <div className="success-cards">
        <div className="success-card">
          <div className="card-icon">
            <img src={trabalhistaIcon} alt="Trabalhista" />
          </div>
          <h4>Vara Trabalhista</h4>
          <p>Rescisões, horas extras, assédio moral e direitos do trabalhador</p>
        </div>

        <div className="success-card">
          <div className="card-icon">
            <img src={consumidorIcon} alt="Consumidor" />
          </div>
          <h4>Vara do Consumidor</h4>
          <p>Defesa nas relações de consumo, indenizações e reparação de danos</p>
        </div>

        <div className="success-card">
          <div className="card-icon">
            <img src={matrimonialIcon} alt="Matrimonial" />
          </div>
          <h4>Vara Familiar</h4>
          <p>Divórcios, pensão alimentícia, guarda de filhos e inventários</p>
        </div>

        <div className="success-card">
          <div className="card-icon">
            <img src={civilIcon} alt="Civil" />
          </div>
          <h4>Vara Civil</h4>
          <p>Contratos, cobranças, danos morais e responsabilidade civil</p>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories; 