import React from 'react';
import './ProfileButtons.css';
import { useNavigate } from 'react-router-dom';

const ProfileButtons = () => {
  const navigate = useNavigate();

  const mockAdvogada = {
    id: "12345",
    name: "Dra. Maria Santos",
    oab: "12345/SE",
    specialty: "Direito Civil e Trabalhista",
    photo: "/assets/images/lawyer-profile.jpg",
    email: "maria.santos@advogados.com",
    phone: "(79) 99999-9999",
    type: "lawyer"
  };

  const mockCliente = {
    id: "C789",
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(79) 98888-8888",
    type: "client"
  };

  return (
    <div className="profile-buttons">
      <button 
        className="profile-btn client-btn"
        onClick={() => navigate('/cliente', { state: { user: mockCliente }})}
      >
        Sou Cliente
      </button>
      <button 
        className="profile-btn lawyer-btn"
        onClick={() => navigate('/advogado', { state: { user: mockAdvogada }})}
      >
        Sou Advogado
      </button>
    </div>
  );
};

export default ProfileButtons; 