import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Assignment,
    AccessTime,
    PriorityHigh,
    CheckCircle,
    Today,
    Flag
} from '@mui/icons-material';
import './TaskManagementCard.css';

const TaskManagementCard = ({ data }) => {
    const mockTaskData = {
        summary: {
            pending: 8,
            urgent: 3,
            completed: 12,
            dueToday: 4
        },
        recentTasks: [
            {
                id: 1,
                title: "Preparar contestação",
                client: "João Silva",
                deadline: "2024-03-20",
                priority: "high",
                type: "Processo",
                status: "pending"
            },
            {
                id: 2,
                title: "Audiência Trabalhista",
                client: "Maria Santos",
                deadline: "2024-03-21",
                priority: "urgent",
                type: "Audiência",
                status: "pending"
            },
            {
                id: 3,
                title: "Análise de Contrato",
                client: "Tech Solutions",
                deadline: "2024-03-22",
                priority: "medium",
                type: "Análise",
                status: "pending"
            }
        ]
    };

    const getPriorityColor = (priority) => {
        switch(priority) {
            case 'urgent':
                return '#f44336';
            case 'high':
                return '#ff9800';
            case 'medium':
                return '#2196f3';
            default:
                return '#4caf50';
        }
    };

    return (
        <div className="task-management-card dashboard-card">
            <div className="card-header">
                <h3>Gerenciamento de Tarefas</h3>
                <Link to="/advogado/tarefas" className="view-all">Ver tudo</Link>
            </div>

            <div className="task-stats">
                <div className="stat-item">
                    <Assignment />
                    <div className="stat-info">
                        <span className="stat-value">{mockTaskData.summary.pending}</span>
                        <span className="stat-label">Pendentes</span>
                    </div>
                </div>

                <div className="stat-item">
                    <PriorityHigh />
                    <div className="stat-info">
                        <span className="stat-value">{mockTaskData.summary.urgent}</span>
                        <span className="stat-label">Urgentes</span>
                    </div>
                </div>

                <div className="stat-item">
                    <Today />
                    <div className="stat-info">
                        <span className="stat-value">{mockTaskData.summary.dueToday}</span>
                        <span className="stat-label">Para Hoje</span>
                    </div>
                </div>

                <div className="stat-item">
                    <CheckCircle />
                    <div className="stat-info">
                        <span className="stat-value">{mockTaskData.summary.completed}</span>
                        <span className="stat-label">Concluídas</span>
                    </div>
                </div>
            </div>

            <div className="recent-tasks">
                <h4>Tarefas Recentes</h4>
                {mockTaskData.recentTasks.map(task => (
                    <div key={task.id} className="task-item">
                        <div className="task-priority" style={{ backgroundColor: getPriorityColor(task.priority) }}>
                            <Flag />
                        </div>
                        <div className="task-info">
                            <div className="task-header">
                                <p><strong>{task.title}</strong></p>
                                <span className="task-type">{task.type}</span>
                            </div>
                            <div className="task-details">
                                <span className="task-client">{task.client}</span>
                                <div className="task-deadline">
                                    <AccessTime />
                                    <span>{new Date(task.deadline).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskManagementCard; 