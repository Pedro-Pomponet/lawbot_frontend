import React, { useState } from 'react';
import { 
    CalendarToday,
    Schedule,
    Event,
    Today,
    Gavel,
    Group,
    AccessTime,
    VideoCall
} from '@mui/icons-material';
import './SmartCalendar.css';

const mockAdvogada = {
    name: "Dra. Maria Silva",
    oab: "12345"
};

const mockCompromissos = [
    {
        id: 1,
        tipo: "audiencia",
        titulo: "Audiência de Instrução",
        processo: "0001234-12.2024.8.26.0000",
        data: "2024-02-28T14:30:00",
        local: "2ª Vara Cível",
        cliente: "João da Silva",
        prioridade: "high",
        status: "pending",
        descricao: "Oitiva de testemunhas",
        modalidade: "presencial"
    },
    {
        id: 2,
        tipo: "reuniao",
        titulo: "Reunião com Cliente",
        processo: null,
        data: "2024-02-27T10:00:00",
        local: "Virtual",
        cliente: "Empresa ABC Ltda",
        prioridade: "medium",
        status: "pending",
        descricao: "Discussão de nova demanda",
        modalidade: "virtual"
    },
    {
        id: 3,
        tipo: "prazo",
        titulo: "Recurso de Apelação",
        processo: "0004567-89.2024.8.26.0000",
        data: "2024-03-01T23:59:59",
        cliente: "Maria Souza",
        prioridade: "high",
        status: "pending",
        descricao: "Prazo fatal para apresentação do recurso"
    }
];

const SmartCalendar = ({ userId }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState('month');
    const [filtroTipo, setFiltroTipo] = useState('all');
    const [filtroPrioridade, setFiltroPrioridade] = useState('all');

    return (
        <div className="smart-calendar">
            <div className="calendar-header">
                <div className="header-left">
                    <h2>Agenda Inteligente</h2>
                    <p className="lawyer-info">{mockAdvogada.name} - OAB/SE {mockAdvogada.oab}</p>
                </div>
                <div className="header-right">
                    <button 
                        className={`view-button ${view === 'month' ? 'active' : ''}`}
                        onClick={() => setView('month')}
                    >
                        <CalendarToday /> Mensal
                    </button>
                    <button 
                        className={`view-button ${view === 'week' ? 'active' : ''}`}
                        onClick={() => setView('week')}
                    >
                        <Schedule /> Semanal
                    </button>
                    <button 
                        className={`view-button ${view === 'day' ? 'active' : ''}`}
                        onClick={() => setView('day')}
                    >
                        <Today /> Diário
                    </button>
                </div>
            </div>

            <div className="calendar-filters">
                <select 
                    value={filtroTipo}
                    onChange={(e) => setFiltroTipo(e.target.value)}
                    className="filter-select"
                >
                    <option value="all">Todos os tipos</option>
                    <option value="hearing">Audiências</option>
                    <option value="deadline">Prazos</option>
                    <option value="meeting">Reuniões</option>
                </select>
                <select 
                    value={filtroPrioridade}
                    onChange={(e) => setFiltroPrioridade(e.target.value)}
                    className="filter-select"
                >
                    <option value="all">Todas as prioridades</option>
                    <option value="high">Alta</option>
                    <option value="medium">Média</option>
                    <option value="normal">Normal</option>
                </select>
            </div>

            <div className="compromissos-list">
                {mockCompromissos.map(compromisso => (
                    <div key={compromisso.id} className={`compromisso-card ${compromisso.tipo}`}>
                        <div className="compromisso-icon">
                            {compromisso.tipo === 'audiencia' && <Gavel />}
                            {compromisso.tipo === 'reuniao' && <Group />}
                            {compromisso.tipo === 'prazo' && <AccessTime />}
                        </div>
                        <div className="compromisso-content">
                            <div className="compromisso-header">
                                <h3>{compromisso.titulo}</h3>
                                {compromisso.modalidade === 'virtual' && (
                                    <VideoCall className="modalidade-icon" />
                                )}
                            </div>
                            {compromisso.processo && (
                                <p className="processo-numero">Processo: {compromisso.processo}</p>
                            )}
                            <div className="compromisso-info">
                                <p>Cliente: {compromisso.cliente}</p>
                                <p>{new Date(compromisso.data).toLocaleString('pt-BR')}</p>
                                {compromisso.local && <p>Local: {compromisso.local}</p>}
                            </div>
                            <p className="compromisso-desc">{compromisso.descricao}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SmartCalendar; 