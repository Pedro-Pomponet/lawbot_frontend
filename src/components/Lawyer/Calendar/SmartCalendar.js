import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';
import AlertSystem from './AlertSystem';
import CourtSync from './CourtSync';
import ConflictChecker from './ConflictChecker';

const SmartCalendar = () => {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState('month'); // month, week, day
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEvents();
    }, [selectedDate, view]);

    const loadEvents = async () => {
        try {
            const data = await api.getCalendarEvents(selectedDate, view);
            setEvents(data);
        } catch (error) {
            console.error('Erro ao carregar eventos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddEvent = async (eventData) => {
        try {
            await api.createCalendarEvent(eventData);
            loadEvents();
        } catch (error) {
            console.error('Erro ao criar evento:', error);
        }
    };

    return (
        <div className="smart-calendar">
            <header className="calendar-header">
                <h1>Agenda Inteligente</h1>
                <div className="calendar-controls">
                    <div className="view-controls">
                        <button 
                            className={view === 'month' ? 'active' : ''}
                            onClick={() => setView('month')}
                        >
                            Mês
                        </button>
                        <button 
                            className={view === 'week' ? 'active' : ''}
                            onClick={() => setView('week')}
                        >
                            Semana
                        </button>
                        <button 
                            className={view === 'day' ? 'active' : ''}
                            onClick={() => setView('day')}
                        >
                            Dia
                        </button>
                    </div>

                    <div className="date-navigation">
                        <button onClick={() => setSelectedDate(prev => {
                            const newDate = new Date(prev);
                            newDate.setMonth(prev.getMonth() - 1);
                            return newDate;
                        })}>
                            ←
                        </button>
                        <span>{formatters.formatMonthYear(selectedDate)}</span>
                        <button onClick={() => setSelectedDate(prev => {
                            const newDate = new Date(prev);
                            newDate.setMonth(prev.getMonth() + 1);
                            return newDate;
                        })}>
                            →
                        </button>
                    </div>
                </div>
            </header>

            <div className="calendar-grid">
                <div className="calendar-sidebar">
                    <AlertSystem onAlertUpdate={loadEvents} />
                    <CourtSync onSync={loadEvents} />
                    <ConflictChecker events={events} onConflictResolution={loadEvents} />
                </div>

                <div className="calendar-main">
                    {/* Implementação do calendário baseada na view selecionada */}
                    {view === 'month' && (
                        <MonthView 
                            events={events}
                            selectedDate={selectedDate}
                            onEventAdd={handleAddEvent}
                            onEventUpdate={loadEvents}
                        />
                    )}
                    {view === 'week' && (
                        <WeekView 
                            events={events}
                            selectedDate={selectedDate}
                            onEventAdd={handleAddEvent}
                            onEventUpdate={loadEvents}
                        />
                    )}
                    {view === 'day' && (
                        <DayView 
                            events={events}
                            selectedDate={selectedDate}
                            onEventAdd={handleAddEvent}
                            onEventUpdate={loadEvents}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SmartCalendar; 