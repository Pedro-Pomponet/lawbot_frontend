import React, { useState } from 'react';
import { api } from '../../../utils/api';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Chart } from 'react-chartjs-2';

// Componente de Distribuição de Tarefas
export const TaskDistribution = ({ members, tasks, onUpdate }) => {
    const handleDragEnd = async (result) => {
        if (!result.destination) return;
        
        try {
            await api.updateTaskAssignment({
                taskId: result.draggableId,
                memberId: result.destination.droppableId
            });
            onUpdate();
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
        }
    };

    return (
        <div className="task-distribution">
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="team-columns">
                    {members.map(member => (
                        <Droppable key={member.id} droppableId={member.id}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="member-column"
                                >
                                    <div className="member-header">
                                        <img src={member.avatar} alt={member.name} />
                                        <div>
                                            <h3>{member.name}</h3>
                                            <span>{member.role}</span>
                                        </div>
                                        <div className="task-count">
                                            {member.tasks.length} tarefas
                                        </div>
                                    </div>
                                    
                                    <div className="tasks-list">
                                        {member.tasks.map((task, index) => (
                                            <Draggable
                                                key={task.id}
                                                draggableId={task.id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="task-card"
                                                    >
                                                        <h4>{task.title}</h4>
                                                        <p>{task.description}</p>
                                                        <div className="task-meta">
                                                            <span>⏰ {task.deadline}</span>
                                                            <span className={`priority ${task.priority}`}>
                                                                {task.priority}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

// Componente de Gerenciamento de Permissões
export const PermissionsManager = ({ members, permissions, onUpdate }) => {
    const handlePermissionChange = async (memberId, permission, value) => {
        try {
            await api.updateMemberPermissions({
                memberId,
                permission,
                value
            });
            onUpdate();
        } catch (error) {
            console.error('Erro ao atualizar permissões:', error);
        }
    };

    return (
        <div className="permissions-manager">
            <div className="permissions-grid">
                {members.map(member => (
                    <div key={member.id} className="permission-card">
                        <div className="member-info">
                            <img src={member.avatar} alt={member.name} />
                            <div>
                                <h3>{member.name}</h3>
                                <span>{member.role}</span>
                            </div>
                        </div>
                        <div className="permissions-list">
                            {permissions.map(perm => (
                                <div key={perm.id} className="permission-item">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={member.permissions.includes(perm.id)}
                                            onChange={(e) => handlePermissionChange(
                                                member.id,
                                                perm.id,
                                                e.target.checked
                                            )}
                                        />
                                        {perm.name}
                                    </label>
                                    <span className="permission-description">
                                        {perm.description}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Componente de Métricas de Performance
export const PerformanceMetrics = ({ members, metrics }) => {
    return (
        <div className="performance-metrics">
            <div className="metrics-overview">
                <div className="metric-card total-tasks">
                    <h3>Total de Tarefas</h3>
                    <strong>{metrics.totalTasks}</strong>
                    <span className="trend">
                        {metrics.tasksTrend > 0 ? '↑' : '↓'} {Math.abs(metrics.tasksTrend)}%
                    </span>
                </div>
                <div className="metric-card completion-rate">
                    <h3>Taxa de Conclusão</h3>
                    <strong>{metrics.completionRate}%</strong>
                    <div className="progress-bar">
                        <div 
                            className="progress" 
                            style={{width: `${metrics.completionRate}%`}}
                        />
                    </div>
                </div>
            </div>

            <div className="member-metrics">
                {members.map(member => (
                    <div key={member.id} className="member-performance">
                        <div className="member-header">
                            <img src={member.avatar} alt={member.name} />
                            <h3>{member.name}</h3>
                        </div>
                        <div className="metrics-grid">
                            <div className="metric">
                                <span>Produtividade</span>
                                <strong>{member.metrics.productivity}%</strong>
                            </div>
                            <div className="metric">
                                <span>Qualidade</span>
                                <strong>{member.metrics.quality}%</strong>
                            </div>
                            <div className="metric">
                                <span>Pontualidade</span>
                                <strong>{member.metrics.timeliness}%</strong>
                            </div>
                        </div>
                        <div className="performance-chart">
                            <Chart
                                type="line"
                                data={member.metrics.history}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Componente de Gestão de Disponibilidade
export const AvailabilityManager = ({ members, schedules, onUpdate }) => {
    const handleScheduleUpdate = async (memberId, schedule) => {
        try {
            await api.updateMemberSchedule({
                memberId,
                schedule
            });
            onUpdate();
        } catch (error) {
            console.error('Erro ao atualizar horário:', error);
        }
    };

    return (
        <div className="availability-manager">
            <div className="schedule-grid">
                {members.map(member => (
                    <div key={member.id} className="schedule-card">
                        <div className="member-info">
                            <img src={member.avatar} alt={member.name} />
                            <div>
                                <h3>{member.name}</h3>
                                <span>{member.role}</span>
                            </div>
                        </div>
                        <div className="schedule-calendar">
                            {/* Calendário de disponibilidade */}
                        </div>
                        <div className="current-status">
                            <span className={`status ${member.status}`}>
                                {member.status}
                            </span>
                            <span className="time-info">
                                {member.currentTask ? 
                                    `Trabalhando em: ${member.currentTask}` : 
                                    'Disponível'
                                }
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}; 