import React, { useState } from 'react';
import './ConnectProcess.css';
import userIcon from '../../../assets/icons/user_icon.png';
import lawyerIcon from '../../../assets/icons/lawyer_icon.png';
import botIcon from '../../../assets/icons/lawbot_icon.png';
import chatIcon from '../../../assets/icons/chat_icon.png';
import matchIcon from '../../../assets/icons/match_icon.png';

const ConnectProcess = () => {
  const [activeStep, setActiveStep] = useState(null);

  const steps = {
    user: "Comece sua jornada interagindo com nossa plataforma de forma simples e intuitiva. Aqui você encontra o primeiro passo para resolver suas questões jurídicas.",
    chat: "Nosso chatbot inteligente irá guiá-lo através de perguntas específicas para coletar todas as informações necessárias sobre seu caso de maneira clara e objetiva.",
    lawbot: "Nossa IA avançada analisa sua situação, interpreta as informações fornecidas e gera um resumo jurídico preciso que será encaminhado aos advogados especialistas.",
    match: "Com base na análise do seu caso, nossa plataforma seleciona os advogados mais qualificados e experientes na área específica do seu problema.",
    lawyer: "Conecte-se com profissionais altamente qualificados para receber consultoria jurídica personalizada e direcionada às suas necessidades específicas."
  };

  return (
    <section className="connect-process">
      <div className="process-content">
        <div className="section-title">
          <h2>Como<br/><span>Funciona</span></h2>
        </div>

        <div className="process-flow">
          <div className="flow-line">
            <div 
              className="flow-node"
              onMouseEnter={() => setActiveStep('user')}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="flow-icon">
                <img src={userIcon} alt="Usuário" />
              </div>
              {activeStep === 'user' && (
                <div className="step-description">{steps.user}</div>
              )}
            </div>

            <div 
              className="flow-node"
              onMouseEnter={() => setActiveStep('chat')}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="flow-icon">
                <img src={chatIcon} alt="Chat" />
              </div>
              {activeStep === 'chat' && (
                <div className="step-description">{steps.chat}</div>
              )}
            </div>

            <div 
              className="flow-node"
              onMouseEnter={() => setActiveStep('lawbot')}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="flow-icon">
                <img src={botIcon} alt="LawBot" />
              </div>
              {activeStep === 'lawbot' && (
                <div className="step-description">{steps.lawbot}</div>
              )}
            </div>

            <div 
              className="flow-node"
              onMouseEnter={() => setActiveStep('match')}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="flow-icon">
                <img src={matchIcon} alt="Match" />
              </div>
              {activeStep === 'match' && (
                <div className="step-description">{steps.match}</div>
              )}
            </div>

            <div 
              className="flow-node"
              onMouseEnter={() => setActiveStep('lawyer')}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="flow-icon">
                <img src={lawyerIcon} alt="Advogado" />
              </div>
              {activeStep === 'lawyer' && (
                <div className="step-description">{steps.lawyer}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectProcess; 