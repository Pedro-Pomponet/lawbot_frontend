import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';

const CaseNotes = ({ caseId }) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({
        content: '',
        type: 'general', // general, strategy, client, internal
        priority: 'normal' // low, normal, high
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNotes();
    }, [caseId]);

    const loadNotes = async () => {
        try {
            const data = await api.getCaseNotes(caseId);
            setNotes(data);
        } catch (error) {
            console.error('Erro ao carregar notas:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNote = async (e) => {
        e.preventDefault();
        try {
            const addedNote = await api.addCaseNote(caseId, {
                ...newNote,
                timestamp: new Date()
            });
            setNotes(prev => [addedNote, ...prev]);
            setNewNote({ content: '', type: 'general', priority: 'normal' });
        } catch (error) {
            console.error('Erro ao adicionar nota:', error);
        }
    };

    const handleDeleteNote = async (noteId) => {
        try {
            await api.deleteCaseNote(caseId, noteId);
            setNotes(prev => prev.filter(note => note.id !== noteId));
        } catch (error) {
            console.error('Erro ao deletar nota:', error);
        }
    };

    return (
        <div className="case-notes">
            <div className="notes-header">
                <h2>Notas e Observações</h2>
                <form onSubmit={handleAddNote} className="add-note-form">
                    <textarea
                        value={newNote.content}
                        onChange={e => setNewNote(prev => ({
                            ...prev,
                            content: e.target.value
                        }))}
                        placeholder="Adicionar nova nota..."
                        required
                    />
                    <div className="note-controls">
                        <select
                            value={newNote.type}
                            onChange={e => setNewNote(prev => ({
                                ...prev,
                                type: e.target.value
                            }))}
                        >
                            <option value="general">Geral</option>
                            <option value="strategy">Estratégia</option>
                            <option value="client">Cliente</option>
                            <option value="internal">Interna</option>
                        </select>
                        <select
                            value={newNote.priority}
                            onChange={e => setNewNote(prev => ({
                                ...prev,
                                priority: e.target.value
                            }))}
                        >
                            <option value="low">Baixa</option>
                            <option value="normal">Normal</option>
                            <option value="high">Alta</option>
                        </select>
                        <button type="submit">Adicionar</button>
                    </div>
                </form>
            </div>

            <div className="notes-list">
                {notes.map(note => (
                    <div 
                        key={note.id} 
                        className={`note-card ${note.type} ${note.priority}`}
                    >
                        <div className="note-header">
                            <span className="note-type">{note.type}</span>
                            <span className="note-timestamp">
                                {formatters.formatDateTime(note.timestamp)}
                            </span>
                            <button 
                                onClick={() => handleDeleteNote(note.id)}
                                className="delete-note"
                            >
                                🗑️
                            </button>
                        </div>
                        <div className="note-content">
                            {note.content}
                        </div>
                        <div className="note-footer">
                            <span className="note-author">{note.author}</span>
                            {note.attachments && note.attachments.length > 0 && (
                                <div className="note-attachments">
                                    {note.attachments.map((attachment, index) => (
                                        <a 
                                            key={index}
                                            href={attachment.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            📎 {attachment.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CaseNotes; 