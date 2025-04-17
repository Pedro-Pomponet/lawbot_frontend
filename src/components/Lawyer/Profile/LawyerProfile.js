import React from 'react';
import lawyerAvatar from '../../../assets/images/lawyer-avatar.png';

const LawyerProfile = ({ userData }) => {
    return (
        <div className="lawyer-profile">
            <div className="profile-header">
                <div className="profile-avatar">
                    <img src={lawyerAvatar} alt="Perfil da Advogada" />
                </div>
                <div className="profile-info">
                    <h2>{userData?.name || 'Dra. Ana Silva'}</h2>
                    <p>{userData?.specialization || 'Direito Civil e Empresarial'}</p>
                    <p>{userData?.oab || 'OAB/SP 123.456'}</p>
                </div>
            </div>
            {/* Resto do perfil */}
        </div>
    );
};

export default LawyerProfile; 