import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';

const MeetingScheduler = ({ meetings, loading }) => {
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedType, setSelectedType] = useState('video');
    const [newMeeting, setNewMeeting] = useState({
        date: null,
        time: null,
        type: 'video',
        subject: '',
        description: ''
    });

    useEffect(() => {
        loadAvailableSlots();
    }, [selectedDate, selectedType]);

    const loadAvailableSlots = async () => {
        try {
            const slots = await api.getAvailableMeetingSlots({
                date: selectedDate,
                type: selectedType
            });
            setAvailableSlots(slots);
        } catch (error) {
            console.error('Erro ao carregar horários disponíveis:', error);
        }
    };

    const handleScheduleMeeting = async (e) => {
        e.preventDefault();
        try {
            await api.scheduleMeeting(newMeeting);
            // Recarregar reuniões após agendamento
            setNewMeeting({
                date: null,
                time: null,
                type: 'video',
                subject: '',
                description: ''
            });
        } catch (error) {
            console.error('Erro ao agendar reunião:', error);
        }
    };

    const handleCancelMeeting = async (meetingId) => {
        try {
            await api.cancelMeeting(meetingId);
            // Recarregar reuniões após cancelamento
        } catch (error) {
            console.error('Erro ao cancelar reunião:', error);
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;

    return (
        <div className="meeting-scheduler">
            <div className="scheduler-header">
                <h2>Agendamento de Reuniões</h2>
                <div className="schedule-actions">
                    <button 
                        className="new-meeting-btn"
                        onClick={() => document.getElementById('scheduleForm').scrollIntoView()}
                    >
                        + Nova Reunião
                    </button>
                </div>
            </div>

            <div className="meetings-list">
                <h3>Reuniões Agendadas</h3>
                {meetings.map(meeting => (
                    <div key={meeting.id} className="meeting-card">
                        <div className="meeting-header">
                            <div className="meeting-type">
                                {meeting.type === 'video' ? '🎥' : '👥'} 
                                {meeting.type === 'video' ? 'Videoconferência' : 'Presencial'}
                            </div>
                            <span className={`meeting-status ${meeting.status}`}>
                                {meeting.status === 'scheduled' ? 'Agendada' : 
                                 meeting.status === 'completed' ? 'Realizada' : 'Cancelada'}
                            </span>
                        </div>
                        <div className="meeting-info">
                            <h4>{meeting.subject}</h4>
                            <p>{meeting.description}</p>
                            <div className="meeting-datetime">
                                📅 {formatters.formatDateTime(meeting.datetime)}
                            </div>
                        </div>
                        <div className="meeting-actions">
                            {meeting.status === 'scheduled' && (
                                <>
                                    {meeting.type === 'video' && (
                                        <a 
                                            href={meeting.videoLink} 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="join-btn"
                                        >
                                            Entrar na Reunião
                                        </a>
                                    )}
                                    <button 
                                        onClick={() => handleCancelMeeting(meeting.id)}
                                        className="cancel-btn"
                                    >
                                        Cancelar
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <form id="scheduleForm" className="schedule-form" onSubmit={handleScheduleMeeting}>
                <h3>Agendar Nova Reunião</h3>
                <div className="form-group">
                    <label>Tipo de Reunião</label>
                    <select
                        value={selectedType}
                        onChange={e => setSelectedType(e.target.value)}
                    >
                        <option value="video">Videoconferência</option>
                        <option value="presential">Presencial</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Data</label>
                    <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={selectedDate.toISOString().split('T')[0]}
                        onChange={e => setSelectedDate(new Date(e.target.value))}
                    />
                </div>

                <div className="form-group">
                    <label>Horário Disponível</label>
                    <div className="time-slots">
                        {availableSlots.map(slot => (
                            <button
                                key={slot.time}
                                type="button"
                                className={`time-slot ${newMeeting.time === slot.time ? 'selected' : ''}`}
                                onClick={() => setNewMeeting(prev => ({
                                    ...prev,
                                    time: slot.time
                                }))}
                            >
                                {slot.time}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Assunto</label>
                    <input
                        type="text"
                        value={newMeeting.subject}
                        onChange={e => setNewMeeting(prev => ({
                            ...prev,
                            subject: e.target.value
                        }))}
                        placeholder="Ex: Discussão do Processo"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Descrição</label>
                    <textarea
                        value={newMeeting.description}
                        onChange={e => setNewMeeting(prev => ({
                            ...prev,
                            description: e.target.value
                        }))}
                        placeholder="Detalhes adicionais sobre a reunião..."
                    />
                </div>

                <button type="submit" className="schedule-btn">
                    Agendar Reunião
                </button>
            </form>
        </div>
    );
};

export default MeetingScheduler;