import React, { useState } from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';

const CaseDetails = ({ caseData, onUpdate }) => {
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState(caseData);

    const handleSave = async () => {
        try {
            await api.updateCase(caseData.id, formData);
            setEditing(false);
            onUpdate();
        } catch (error) {
            console.error('Erro ao atualizar caso:', error);
        }
    };

    return (
        <div className="case-details">
            <header className="details-header">
                <h2>Detalhes do Processo</h2>
                <button 
                    onClick={() => setEditing(!editing)}
                    className={editing ? 'cancel-btn' : 'edit-btn'}
                >
                    {editing ? 'Cancelar' : 'Editar'}
                </button>
            </header>

            <div className="details-content">
                <div className="main-info">
                    <div className="info-group">
                        <label>Número do Processo</label>
                        {editing ? (
                            <input
                                type="text"
                                value={formData.number}
                                onChange={e => setFormData({
                                    ...formData,
                                    number: e.target.value
                                })}
                            />
                        ) : (
                            <p>{caseData.number}</p>
                        )}
                    </div>

                    <div className="info-group">
                        <label>Status</label>
                        {editing ? (
                            <select
                                value={formData.status}
                                onChange={e => setFormData({
                                    ...formData,
                                    status: e.target.value
                                })}
                            >
                                <option value="active">Em Andamento</option>
                                <option value="pending">Pendente</option>
                                <option value="closed">Encerrado</option>
                                <option value="archived">Arquivado</option>
                            </select>
                        ) : (
                            <p className={`status ${caseData.status}`}>
                                {caseData.statusText}
                            </p>
                        )}
                    </div>

                    <div className="info-group">
                        <label>Tipo de Ação</label>
                        {editing ? (
                            <input
                                type="text"
                                value={formData.type}
                                onChange={e => setFormData({
                                    ...formData,
                                    type: e.target.value
                                })}
                            />
                        ) : (
                            <p>{caseData.type}</p>
                        )}
                    </div>
                </div>

                <div className="parties-info">
                    <h3>Partes</h3>
                    <div className="info-group">
                        <label>Cliente</label>
                        {editing ? (
                            <input
                                type="text"
                                value={formData.client}
                                onChange={e => setFormData({
                                    ...formData,
                                    client: e.target.value
                                })}
                            />
                        ) : (
                            <p>{caseData.client}</p>
                        )}
                    </div>

                    <div className="info-group">
                        <label>Parte Contrária</label>
                        {editing ? (
                            <input
                                type="text"
                                value={formData.opposingParty}
                                onChange={e => setFormData({
                                    ...formData,
                                    opposingParty: e.target.value
                                })}
                            />
                        ) : (
                            <p>{caseData.opposingParty}</p>
                        )}
                    </div>
                </div>

                <div className="dates-info">
                    <h3>Datas Importantes</h3>
                    <div className="info-group">
                        <label>Data de Início</label>
                        {editing ? (
                            <input
                                type="date"
                                value={formatters.formatDateInput(formData.startDate)}
                                onChange={e => setFormData({
                                    ...formData,
                                    startDate: new Date(e.target.value)
                                })}
                            />
                        ) : (
                            <p>{formatters.formatDate(caseData.startDate)}</p>
                        )}
                    </div>

                    <div className="info-group">
                        <label>Próxima Audiência</label>
                        {editing ? (
                            <input
                                type="date"
                                value={formatters.formatDateInput(formData.nextHearing)}
                                onChange={e => setFormData({
                                    ...formData,
                                    nextHearing: new Date(e.target.value)
                                })}
                            />
                        ) : (
                            <p>{formatters.formatDate(caseData.nextHearing)}</p>
                        )}
                    </div>
                </div>

                <div className="financial-info">
                    <h3>Informações Financeiras</h3>
                    <div className="info-group">
                        <label>Valor da Causa</label>
                        {editing ? (
                            <input
                                type="number"
                                value={formData.value}
                                onChange={e => setFormData({
                                    ...formData,
                                    value: parseFloat(e.target.value)
                                })}
                            />
                        ) : (
                            <p>{formatters.formatCurrency(caseData.value)}</p>
                        )}
                    </div>

                    <div className="info-group">
                        <label>Honorários</label>
                        {editing ? (
                            <input
                                type="number"
                                value={formData.fees}
                                onChange={e => setFormData({
                                    ...formData,
                                    fees: parseFloat(e.target.value)
                                })}
                            />
                        ) : (
                            <p>{formatters.formatCurrency(caseData.fees)}</p>
                        )}
                    </div>
                </div>

                {editing && (
                    <div className="edit-actions">
                        <button onClick={handleSave} className="save-btn">
                            Salvar Alterações
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CaseDetails; 