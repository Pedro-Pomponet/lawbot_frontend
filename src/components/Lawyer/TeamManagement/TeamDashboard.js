import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import TaskDistribution from './TaskDistribution';
import PerformanceMetrics from './PerformanceMetrics';
import TeamCommunication from './TeamCommunication';
import MemberSchedule from './MemberSchedule';

const TeamDashboard = () => {
    const [teamData, setTeamData] = useState({
        members: [],
        tasks: [],
        metrics: null,
        communications: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTeamData();
    }, []);

    const loadTeamData = async () => {
        try {
            const [members, tasks, metrics, communications] = await Promise.all([
                api.getTeamMembers(),
                api.getTeamTasks(),
                api.getTeamMetrics(),
                api.getTeamCommunications()
            ]);

            setTeamData({
                members,
                tasks,
                metrics,
                communications
            });
        } catch (error) {
            console.error('Erro ao carregar dados da equipe:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="team-dashboard">
            <header className="dashboard-header">
                <h1>Gestão de Equipe</h1>
                <div className="quick-actions">
                    <button onClick={() => {/* Implementar */}}>
                        Novo Membro
                    </button>
                    <button onClick={() => {/* Implementar */}}>
                        Nova Tarefa
                    </button>
                    <button onClick={() => {/* Implementar */}}>
                        Agendar Reunião
                    </button>
                </div>
            </header>

            <div className="team-overview">
                <div className="team-stats">
                    <div className="stat-card">
                        <h3>Membros Ativos</h3>
                        <p>{teamData.members.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Tarefas em Andamento</h3>
                        <p>{teamData.tasks.filter(t => t.status === 'in_progress').length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Produtividade</h3>
                        <p>{teamData.metrics?.productivity}%</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-grid">
                <TaskDistribution 
                    tasks={teamData.tasks}
                    members={teamData.members}
                    onTaskUpdate={loadTeamData}
                />
                
                <PerformanceMetrics 
                    metrics={teamData.metrics}
                    members={teamData.members}
                />
                
                <TeamCommunication 
                    communications={teamData.communications}
                    members={teamData.members}
                />
                
                <MemberSchedule 
                    members={teamData.members}
                    tasks={teamData.tasks}
                />
            </div>
        </div>
    );
};

export default TeamDashboard; 