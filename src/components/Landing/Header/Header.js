import React from 'react';
import './Header.css';
import headerBg from '../../../assets/images/header.png';
import lawyerLogo from '../../../assets/images/lawyer-logo.png';
import oabLogo from '../../../assets/images/oab-logo.png';
import avatar1 from '../../../assets/images/avatar1.png';
import avatar2 from '../../../assets/images/avatar2.png';
import avatar3 from '../../../assets/images/avatar3.png';
import ProfileButtons from './ProfileButtons/ProfileButtons';

const Header = () => {
  return (
    <div className="header">
      <img src={headerBg} alt="" className="header-image" />
      
      <nav className="landing-nav">
        <div className="nav-logo">
          <img src={lawyerLogo} alt="LawBot Logo" />
          <span>LawBot</span>
        </div>
        <div className="nav-right">
          <img src={oabLogo} alt="OAB Sergipe" className="oab-logo" />
        </div>
      </nav>

      <div className="hero-content">
        <span className="subtitle">Inteligência Artificial & Direito</span>
        <h1>
          Consultoria Jurídica<br/>
          Potencializada por IA
        </h1>
        <p className="consult-text">Conecte-se com a inovação legal</p>
        
        <div className="users-online">
          <div className="avatars">
            <img src={avatar1} alt="Advogado Online" />
            <img src={avatar2} alt="" />
            <img src={avatar3} alt="" />
          </div>
          <p>+120 Profissionais Disponíveis <span className="online-dot"></span></p>
        </div>

        <ProfileButtons />
      </div>
    </div>
  );
};

export default Header; 