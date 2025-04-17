import React from 'react';
import './LandingPage.css';
import Header from './Header/Header';
import PracticeAreas from './PracticeAreas/PracticeAreas';
import ConnectProcess from './ConnectProcess/ConnectProcess';
import FinalSection from './FinalSection/FinalSection';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <Header />
      <PracticeAreas />
      <ConnectProcess />
      <FinalSection />
    </div>
  );
};

export default LandingPage; 