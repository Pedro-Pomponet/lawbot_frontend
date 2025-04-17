import React from 'react';
import './CaseOverview.css';
import { useLocation, Navigate } from 'react-router-dom';

const CaseOverview = () => {
  const location = useLocation();
  const userData = location.state?.user;

  if (!userData) {
    return <Navigate to="/" />;
  }

  const mockCases = [
    {
      id: 1,
      number: "2024.001.123-4",
      client: "João Silva",
      type: "Trabalhista",
      status: "Em andamento",
      priority: "high",
      nextDeadline: "2024-03-20",
      description: "Reclamação trabalhista - Horas extras"
    },
    {
      id: 2,
      number: "2024.002.456-7",
      client: "Maria Oliveira",
      type: "Civil",
      status: "Aguardando documento",
      priority: "medium",
      nextDeadline: "2024-03-25",
      description: "Ação de indenização"
    },
    {
      id: 3,
      number: "2024.003.789-0",
      client: "Pedro Santos",
      type: "Consumidor",
      status: "Novo",
      priority: "low",
      nextDeadline: "2024-04-01",
      description: "Reclamação consumidor - Produto defeituoso"
    }
  ];

  return (
    <div className="case-overview">
      <div className="case-filters">
        <select defaultValue="all">
          <option value="all">Todos os tipos</option>
          <option value="trabalhista">Trabalhista</option>
          <option value="civil">Civil</option>
          <option value="consumidor">Consumidor</option>
        </select>
        <select defaultValue="all">
          <option value="all">Todos os status</option>
          <option value="new">Novo</option>
          <option value="ongoing">Em andamento</option>
          <option value="waiting">Aguardando</option>
        </select>
      </div>

      <div className="cases-grid">
        {mockCases.map(caseItem => (
          <div key={caseItem.id} className={`case-card priority-${caseItem.priority}`}>
            <div className="case-header">
              <span className="case-number">{caseItem.number}</span>
              <span className="case-status">{caseItem.status}</span>
            </div>
            <div className="case-content">
              <h3>{caseItem.client}</h3>
              <p>{caseItem.description}</p>
              <div className="case-meta">
                <span className="case-type">{caseItem.type}</span>
                <span className="case-deadline">
                  Prazo: {new Date(caseItem.nextDeadline).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="case-actions">
              <button className="view-details">Ver Detalhes</button>
              <button className="quick-action">Ações</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseOverview; 