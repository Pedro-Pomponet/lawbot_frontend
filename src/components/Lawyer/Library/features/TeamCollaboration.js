import React, { useState } from 'react';
import { Groups } from '@mui/icons-material';
import './TeamCollaboration.css';

const mockTeamActivities = [
    {
        id: 1,
        user: "Dr. Silva",
        action: "review",
        document: "Petição Inicial",
        comments: 3,
        date: "2024-02-20"
    }
];

const TeamCollaboration = ({ userId }) => {
    const [activities, setActivities] = useState(mockTeamActivities);
    
    return (
        <div className="collaboration-container">
            <h2>Colaboração em Equipe</h2>
            {/* Implementação do componente */}
        </div>
    );
};

export default TeamCollaboration; 