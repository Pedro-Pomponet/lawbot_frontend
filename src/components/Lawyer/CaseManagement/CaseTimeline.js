import React from 'react';
import { 
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot
} from '@mui/lab';
import {
    Gavel,
    Description,
    Event,
    AttachFile,
    Comment
} from '@mui/icons-material';
import './CaseTimeline.css';

const CaseTimeline = ({ selectedCase }) => {
    const timelineEvents = [
        {
            date: '15/03/2024',
            title: 'Petição Inicial Protocolada',
            description: 'Processo iniciado no sistema do tribunal',
            type: 'document',
            icon: <Description />
        },
        {
            date: '16/03/2024',
            title: 'Distribuição do Processo',
            description: '5ª Vara Cível - Juiz Dr. Silva',
            type: 'court',
            icon: <Gavel />
        },
        {
            date: '20/03/2024',
            title: 'Audiência Designada',
            description: 'Audiência de conciliação marcada para 05/04/2024',
            type: 'event',
            icon: <Event />
        },
        {
            date: '22/03/2024',
            title: 'Documentos Anexados',
            description: 'Comprovantes e evidências adicionadas ao processo',
            type: 'attachment',
            icon: <AttachFile />
        },
        {
            date: '23/03/2024',
            title: 'Observação Adicionada',
            description: 'Necessário preparar contestação específica',
            type: 'note',
            icon: <Comment />
        }
    ];

    return (
        <div className="case-timeline">
            <div className="timeline-header">
                <h2>Linha do Tempo do Processo</h2>
                {selectedCase && (
                    <div className="selected-case-info">
                        <h3>{selectedCase.title}</h3>
                        <p>{selectedCase.id}</p>
                    </div>
                )}
            </div>

            <Timeline position="alternate" className="timeline-content">
                {timelineEvents.map((event, index) => (
                    <TimelineItem key={index}>
                        <TimelineSeparator>
                            <TimelineDot className={`timeline-dot-${event.type}`}>
                                {event.icon}
                            </TimelineDot>
                            {index < timelineEvents.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                            <div className="timeline-event">
                                <span className="event-date">{event.date}</span>
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                            </div>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </div>
    );
};

export default CaseTimeline; 