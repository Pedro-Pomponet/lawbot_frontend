import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import TaskDistribution from './TaskDistribution';
import PermissionsManager from './PermissionsManager';
import PerformanceMetrics from './PerformanceMetrics';
import AvailabilityManager from './AvailabilityManager';

const TeamManagementSystem = () => {
    const [activeTab, setActiveTab] = useState('tasks');
    const [teamData, setTeamData] = useState({
        members: [],
        tasks: [],
        permissions: [],
        metrics: {},
        schedules: {}
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTeamData();
    }, []);

    const loadTeamData = async () => {
        try {
            const data = await api.getTeamManagementData();
            setTeamData(data);
        } catch (error) {
            console.error('Erro ao carregar dados da equipe:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="team-management">
            <nav className="team-nav">
                <button 
                    className={activeTab === 'tasks' ? 'active' : ''}
                    onClick={() => setActiveTab('tasks')}
                >
                    Distribuição de Tarefas
                </button>
                <button 
                    className={activeTab === 'permissions' ? 'active' : ''}
                    onClick={() => setActiveTab('permissions')}
                >
                    Permissões
                </button>
                <button 
                    className={activeTab === 'metrics' ? 'active' : ''}
                    onClick={() => setActiveTab('metrics')}
                >
                    Métricas
                </button>
                <button 
                    className={activeTab === 'availability' ? 'active' : ''}
                    onClick={() => setActiveTab('availability')}
                >
                    Disponibilidade
                </button>
            </nav>

            <div className="team-content">
                {activeTab === 'tasks' && (
                    <TaskDistribution 
                        members={teamData.members}
                        tasks={teamData.tasks}
                        onUpdate={loadTeamData}
                    />
                )}
                {activeTab === 'permissions' && (
                    <PermissionsManager 
                        members={teamData.members}
                        permissions={teamData.permissions}
                        onUpdate={loadTeamData}
                    />
                )}
                {activeTab === 'metrics' && (
                    <PerformanceMetrics 
                        members={teamData.members}
                        metrics={teamData.metrics}
                    />
                )}
                {activeTab === 'availability' && (
                    <AvailabilityManager 
                        members={teamData.members}
                        schedules={teamData.schedules}
                        onUpdate={loadTeamData}
                    />
                )}
            </div>
        </div>
    );
};

export default TeamManagementSystem; 