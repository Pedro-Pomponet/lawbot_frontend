import React, { useState } from 'react';
import { 
    Schedule, 
    CalendarToday, 
    Warning,
    CheckCircle,
    MoreVert,
    Add,
    FilterList
} from '@mui/icons-material';
import './DeadlineTracker.css';

const mockDeadlines = [
    {
        id: 1,
        processo: "1234567-89.2024.8.26.0000",
        tipo: "Recurso",
        prazo: "2024-03-01",
        descricao: "Recurso de Apelação - Caso João Silva",
        status: "pending",
        priority: "high",
        tribunal: "TJSP",
        responsavel: "Dr. Silva"
    },
    {
        id: 2,
        processo: "9876543-21.2024.8.26.0000",
        tipo: "Contestação",
        prazo: "2024-02-28",
        descricao: "Contestação - Processo Trabalhista",
        status: "pending",
        priority: "medium",
        tribunal: "TRT",
        responsavel: "Dra. Santos"
    },
    {
        id: 3,
        processo: "4567890-12.2024.8.26.0000",
        tipo: "Manifestação",
        prazo: "2024-02-25",
        descricao: "Manifestação sobre documentos",
        status: "completed",
        priority: "low",
        tribunal: "TJSP",
        responsavel: "Dr. Silva"
    }
];

const DeadlineTracker = ({ userId }) => {
    const [deadlines, setDeadlines] = useState(mockDeadlines);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [sortBy, setSortBy] = useState('date');

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#f44336';
            case 'medium': return '#ff9800';
            case 'low': return '#4caf50';
            default: return '#757575';
        }
    };

    const getDaysRemaining = (deadline) => {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const filteredDeadlines = deadlines
        .filter(deadline => {
            if (filterStatus === 'all') return true;
            return deadline.status === filterStatus;
        })
        .filter(deadline => {
            if (filterPriority === 'all') return true;
            return deadline.priority === filterPriority;
        })
        .sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(a.prazo) - new Date(b.prazo);
            }
            return 0;
        });

    return (
        <div className="deadlines-container">
            <div className="deadlines-header">
                <h2>Controle de Prazos</h2>
                <div className="deadline-actions">
                    <button className="add-deadline-button">
                        <Add /> Novo Prazo
                    </button>
                    <div className="filter-controls">
                        <select 
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">Todos os Status</option>
                            <option value="pending">Pendentes</option>
                            <option value="completed">Concluídos</option>
                        </select>
                        <select 
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                        >
                            <option value="all">Todas as Prioridades</option>
                            <option value="high">Alta</option>
                            <option value="medium">Média</option>
                            <option value="low">Baixa</option>
                        </select>
                        <select 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="date">Data</option>
                            <option value="priority">Prioridade</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="deadlines-list">
                {filteredDeadlines.map(deadline => {
                    const daysRemaining = getDaysRemaining(deadline.prazo);
                    const isUrgent = daysRemaining <= 3 && deadline.status !== 'completed';

                    return (
                        <div 
                            key={deadline.id} 
                            className={`deadline-card ${deadline.status} ${isUrgent ? 'urgent' : ''}`}
                        >
                            <div className="deadline-priority" style={{ backgroundColor: getPriorityColor(deadline.priority) }} />
                            <div className="deadline-content">
                                <div className="deadline-header">
                                    <h3>{deadline.tipo}</h3>
                                    <div className="deadline-status">
                                        {deadline.status === 'completed' ? (
                                            <CheckCircle className="status-icon completed" />
                                        ) : (
                                            isUrgent && <Warning className="status-icon urgent" />
                                        )}
                                    </div>
                                </div>
                                <p className="processo-numero">{deadline.processo}</p>
                                <p className="deadline-description">{deadline.descricao}</p>
                                <div className="deadline-footer">
                                    <div className="deadline-info">
                                        <span className="deadline-date">
                                            <CalendarToday /> {deadline.prazo}
                                        </span>
                                        <span className="deadline-tribunal">{deadline.tribunal}</span>
                                        <span className="deadline-responsavel">{deadline.responsavel}</span>
                                    </div>
                                    <button className="more-actions">
                                        <MoreVert />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DeadlineTracker; 