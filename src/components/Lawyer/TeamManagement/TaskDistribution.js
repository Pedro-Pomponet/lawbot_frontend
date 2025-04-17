import React, { useState } from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';

const TaskDistribution = ({ tasks, members, onTaskUpdate }) => {
    const [selectedMember, setSelectedMember] = useState(null);
    const [taskFilter, setTaskFilter] = useState('all');

    const handleAssignTask = async (taskId, memberId) => {
        try {
            await api.assignTask(taskId, memberId);
            onTaskUpdate();
        } catch (error) {
            console.error('Erro ao atribuir tarefa:', error);
        }
    };

    const filteredTasks = tasks.filter(task => {
        if (taskFilter === 'all') return true;
        if (taskFilter === 'unassigned') return !task.assignedTo;
        return task.status === taskFilter;
    });

    return (
        <div className="task-distribution">
            <header className="section-header">
                <h2>Distribuição de Tarefas</h2>
                <div className="filters">
                    <select 
                        value={taskFilter}
                        onChange={e => setTaskFilter(e.target.value)}
                    >
                        <option value="all">Todas as Tarefas</option>
                        <option value="unassigned">Não Atribuídas</option>
                        <option value="in_progress">Em Andamento</option>
                        <option value="pending">Pendentes</option>
                        <option value="completed">Concluídas</option>
                    </select>
                </div>
            </header>

            <div className="tasks-grid">
                {filteredTasks.map(task => (
                    <div key={task.id} className={`task-card ${task.priority}`}>
                        <div className="task-header">
                            <h3>{task.title}</h3>
                            <span className={`status ${task.status}`}>
                                {task.status}
                            </span>
                        </div>

                        <p className="task-description">{task.description}</p>

                        <div className="task-meta">
                            <span>Prazo: {formatters.formatDate(task.deadline)}</span>
                            <span>Caso: {task.caseName}</span>
                        </div>

                        <div className="task-assignment">
                            <select
                                value={task.assignedTo || ''}
                                onChange={e => handleAssignTask(task.id, e.target.value)}
                            >
                                <option value="">Atribuir para...</option>
                                {members.map(member => (
                                    <option key={member.id} value={member.id}>
                                        {member.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskDistribution; 