import React, { useState } from 'react';
import './DeadlineCalendar.css';

const DeadlineCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock da advogada sergipana
  const mockAdvogada = {
    id: "12345",
    name: "Dra. Maria Santos",
    oab: "12345/SE",
    deadlines: [
      {
        id: 1,
        title: "Audiência Trabalhista",
        date: "2024-03-20",
        time: "14:00",
        case: "Processo nº 0001234-12.2024.5.20.0001",
        type: "hearing",
        location: "1ª Vara do Trabalho de Aracaju",
        client: "José da Silva",
        description: "Reclamação Trabalhista - Verbas Rescisórias",
        priority: "high"
      },
      {
        id: 2,
        title: "Contestação Cível",
        date: "2024-03-25",
        type: "deadline",
        case: "Processo nº 0123456-78.2024.8.25.0001",
        client: "Maria Oliveira",
        description: "Ação de Indenização - Acidente de Trânsito",
        location: "3ª Vara Cível de Aracaju",
        priority: "medium"
      },
      {
        id: 3,
        title: "Reunião Cliente",
        date: "2024-03-21",
        time: "10:00",
        type: "meeting",
        client: "Pedro Santos",
        location: "Escritório - Av. Barão de Maruim, 100",
        description: "Discussão sobre acordo trabalhista",
        priority: "normal"
      },
      {
        id: 4,
        title: "Prazo Recurso",
        date: "2024-03-28",
        type: "deadline",
        case: "Processo nº 0098765-43.2024.5.20.0004",
        client: "Ana Beatriz",
        description: "Recurso Ordinário - Horas Extras",
        location: "TRT 20ª Região",
        priority: "high"
      }
    ]
  };

  return (
    <div className="deadline-calendar">
      <div className="calendar-header">
        <div className="header-title">
          <h2>Agenda de Compromissos</h2>
          <p className="lawyer-info">{mockAdvogada.name} - OAB/SE {mockAdvogada.oab}</p>
        </div>
        <div className="calendar-nav">
          <button onClick={() => {/* Implementar mês anterior */}}>←</button>
          <h3>{selectedDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</h3>
          <button onClick={() => {/* Implementar próximo mês */}}>→</button>
        </div>
      </div>

      <div className="calendar-filters">
        <select defaultValue="all">
          <option value="all">Todos os tipos</option>
          <option value="hearing">Audiências</option>
          <option value="deadline">Prazos</option>
          <option value="meeting">Reuniões</option>
        </select>
        <select defaultValue="all">
          <option value="all">Todas as prioridades</option>
          <option value="high">Alta</option>
          <option value="medium">Média</option>
          <option value="normal">Normal</option>
        </select>
      </div>

      <div className="deadlines-list">
        <h3>Próximos Compromissos</h3>
        {mockAdvogada.deadlines.map(deadline => (
          <div key={deadline.id} className={`deadline-card type-${deadline.type} priority-${deadline.priority}`}>
            <div className="deadline-date">
              <span className="day">{new Date(deadline.date).getDate()}</span>
              <span className="month">
                {new Date(deadline.date).toLocaleDateString('pt-BR', { month: 'short' })}
              </span>
            </div>
            <div className="deadline-info">
              <div className="deadline-header">
                <h4>{deadline.title}</h4>
                <span className={`priority-tag ${deadline.priority}`}>
                  {deadline.priority === 'high' ? '⚠️ Alta' : 
                   deadline.priority === 'medium' ? '⚡ Média' : '📌 Normal'}
                </span>
              </div>
              <p className="case-number">{deadline.case}</p>
              <p className="client-name">Cliente: {deadline.client}</p>
              {deadline.time && <p className="time">⏰ {deadline.time}</p>}
              {deadline.location && <p className="location">📍 {deadline.location}</p>}
              <p className="description">{deadline.description}</p>
            </div>
            <div className="deadline-actions">
              <button className="edit-btn">✏️ Editar</button>
              <button className="complete-btn">✓ Concluir</button>
              <button className="share-btn">📱 Compartilhar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeadlineCalendar; 