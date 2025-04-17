import React, { useState } from 'react';
import { formatters } from '../../../utils/helpers';

const MemberSchedule = ({ members, tasks }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedMember, setSelectedMember] = useState('all');

    const getScheduleForMember = (memberId) => {
        return tasks.filter(task => 
            task.assignedTo === memberId &&
            new Date(task.deadline).toDateString() === selectedDate.toDateString()
        );
    };

    const getAllSchedules = () => {
        return members.map(member => ({
            member,
            tasks: getScheduleForMember(member.id)
        }));
    };

    return (
        <div className="member-schedule">
            <header className="section-header">
                <h2>Agenda da Equipe</h2>
                <div className="schedule-filters">
                    <input
                        type="date"
                        value={formatters.formatDateInput(selectedDate)}
                        onChange={e => setSelectedDate(new Date(e.target.value))}
                    />
                    <select
                        value={selectedMember}
                        onChange={e => setSelectedMember(e.target.value)}
                    >
                        <option value="all">Todos os Membros</option>
                        {members.map(member => (
                            <option key={member.id} value={member.id}>
                                {member.name}
                            </option>
                        ))}
                    </select>
                </div>
            </header>

            <div className="schedule-grid">
                {(selectedMember === 'all' ? getAllSchedules() : [{
                    member: members.find(m => m.id === selectedMember),
                    tasks: getScheduleForMember(selectedMember)
                }]).map(({ member, tasks }) => (
                    <div key={member.id} className="member-timeline">
                        <div className="timeline-header">
                            <img src={member.avatar} alt="" className="member-avatar" />
                            <h3>{member.name}</h3>
                        </div>

                        <div className="timeline-content">
                            {tasks.length === 0 ? (
                                <p className="no-tasks">Nenhuma tarefa agendada</p>
                            ) : (
                                tasks.map(task => (
                                    <div key={task.id} className="timeline-task">
                                        <span className="task-time">
                                            {formatters.formatTime(task.startTime)}
                                        </span>
                                        <div className="task-details">
                                            <h4>{task.title}</h4>
                                            <p>{task.description}</p>
                                            {task.caseName && (
                                                <span className="case-tag">
                                                    📁 {task.caseName}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemberSchedule; 