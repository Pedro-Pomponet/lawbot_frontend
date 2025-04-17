import React from 'react';
import './TaskManager.css';

const TaskManager = ({ tasks, loading }) => {
    if (loading) return <div>Carregando...</div>;

    return (
        <div className="task-manager">
            <div className="task-list">
                {tasks.map(task => (
                    <div key={task.id} className={`task-card priority-${task.priority}`}>
                        <div className="task-header">
                            <h4>{task.title}</h4>
                            <span className="task-status">{task.status}</span>
                        </div>
                        <p className="task-case">Processo: {task.case}</p>
                        <p className="task-deadline">Prazo: {new Date(task.deadline).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskManager; 