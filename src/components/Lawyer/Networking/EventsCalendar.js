import React, { useState } from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';

const EventsCalendar = ({ events, onEventUpdate }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventType, setEventType] = useState('all');

    const handleRegister = async (eventId) => {
        try {
            await api.registerForEvent(eventId);
            onEventUpdate();
        } catch (error) {
            console.error('Erro ao registrar no evento:', error);
        }
    };

    const filteredEvents = events.filter(event => {
        if (eventType !== 'all' && event.type !== eventType) return false;
        const eventDate = new Date(event.date);
        return eventDate >= selectedDate;
    });

    return (
        <div className="events-calendar">
            <header className="section-header">
                <h2>Eventos e Conferências</h2>
                <div className="event-filters">
                    <input
                        type="date"
                        value={formatters.formatDateInput(selectedDate)}
                        onChange={e => setSelectedDate(new Date(e.target.value))}
                    />
                    <select
                        value={eventType}
                        onChange={e => setEventType(e.target.value)}
                    >
                        <option value="all">Todos os Tipos</option>
                        <option value="conference">Conferências</option>
                        <option value="webinar">Webinars</option>
                        <option value="workshop">Workshops</option>
                        <option value="networking">Networking</option>
                    </select>
                </div>
            </header>

            <div className="events-grid">
                {filteredEvents.map(event => (
                    <div key={event.id} className={`event-card ${event.type}`}>
                        <div className="event-header">
                            <span className="event-type">{event.type}</span>
                            <span className="event-date">
                                {formatters.formatDate(event.date)}
                            </span>
                        </div>

                        <h3>{event.title}</h3>
                        <p className="event-description">{event.description}</p>

                        <div className="event-details">
                            <p>
                                <i className="icon location"></i>
                                {event.location || 'Online'}
                            </p>
                            <p>
                                <i className="icon time"></i>
                                {event.time}
                            </p>
                            <p>
                                <i className="icon participants"></i>
                                {event.participants} participantes
                            </p>
                        </div>

                        <div className="event-speakers">
                            <h4>Palestrantes:</h4>
                            <div className="speakers-list">
                                {event.speakers.map(speaker => (
                                    <div key={speaker.id} className="speaker">
                                        <img src={speaker.avatar} alt="" />
                                        <span>{speaker.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="event-actions">
                            <button
                                onClick={() => handleRegister(event.id)}
                                disabled={event.isRegistered}
                                className="register-btn"
                            >
                                {event.isRegistered ? 'Registrado' : 'Registrar'}
                            </button>
                            <button className="details-btn">Ver Detalhes</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsCalendar; 