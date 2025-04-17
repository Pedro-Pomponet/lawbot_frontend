import React, { useState, useEffect, useRef } from 'react';
import { 
    People, 
    Comment, 
    Share, 
    Lock, 
    LockOpen,
    History,
    Add,
    Close,
    Edit
} from '@mui/icons-material';
import './CollaborationSystem.css';

const CollaborationSystem = ({ documentId }) => {
    const [collaborators, setCollaborators] = useState([]);
    const [comments, setComments] = useState([]);
    const [selectedText, setSelectedText] = useState('');
    const [newComment, setNewComment] = useState('');
    const [showCollaborators, setShowCollaborators] = useState(false);
    const [permissions, setPermissions] = useState({
        canEdit: false,
        canComment: true,
        canShare: true
    });

    const editorRef = useRef(null);
    const ws = useRef(null);

    useEffect(() => {
        // Inicializar WebSocket para edição em tempo real
        ws.current = new WebSocket(`ws://localhost:8080/documents/${documentId}`);
        
        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            handleCollaborationEvent(data);
        };

        // Carregar colaboradores e comentários iniciais
        loadCollaborators();
        loadComments();

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [documentId]);

    const loadCollaborators = async () => {
        try {
            const response = await fetch(`/api/documents/${documentId}/collaborators`);
            const data = await response.json();
            setCollaborators(data.collaborators);
        } catch (error) {
            console.error('Erro ao carregar colaboradores:', error);
        }
    };

    const loadComments = async () => {
        try {
            const response = await fetch(`/api/documents/${documentId}/comments`);
            const data = await response.json();
            setComments(data.comments);
        } catch (error) {
            console.error('Erro ao carregar comentários:', error);
        }
    };

    const handleCollaborationEvent = (event) => {
        switch (event.type) {
            case 'edit':
                handleDocumentEdit(event.data);
                break;
            case 'comment':
                handleNewComment(event.data);
                break;
            case 'presence':
                handlePresenceUpdate(event.data);
                break;
            default:
                console.log('Evento desconhecido:', event);
        }
    };

    const addCollaborator = async (email) => {
        try {
            const response = await fetch(`/api/documents/${documentId}/collaborators`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, permissions })
            });
            const data = await response.json();
            setCollaborators([...collaborators, data.collaborator]);
        } catch (error) {
            console.error('Erro ao adicionar colaborador:', error);
        }
    };

    const addComment = async () => {
        if (!newComment.trim()) return;

        try {
            const comment = {
                text: newComment,
                selection: selectedText,
                position: getSelectionPosition(),
                timestamp: new Date().toISOString()
            };

            const response = await fetch(`/api/documents/${documentId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(comment)
            });

            const data = await response.json();
            setComments([...comments, data.comment]);
            setNewComment('');
            setSelectedText('');
        } catch (error) {
            console.error('Erro ao adicionar comentário:', error);
        }
    };

    const getSelectionPosition = () => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return null;

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const editorRect = editorRef.current.getBoundingClientRect();

        return {
            top: rect.top - editorRect.top,
            left: rect.left - editorRect.left
        };
    };

    return (
        <div className="collaboration-container">
            <div className="collaboration-header">
                <h3>
                    <People />
                    Colaboração
                </h3>
                <div className="collaboration-actions">
                    <button 
                        onClick={() => setShowCollaborators(!showCollaborators)}
                        className="collaborators-toggle"
                    >
                        {showCollaborators ? 'Ocultar' : 'Mostrar'} Colaboradores
                    </button>
                    <button className="share-button">
                        <Share />
                        Compartilhar
                    </button>
                </div>
            </div>

            {showCollaborators && (
                <div className="collaborators-panel">
                    <h4>Colaboradores</h4>
                    <div className="collaborators-list">
                        {collaborators.map(collaborator => (
                            <div key={collaborator.id} className="collaborator-item">
                                <div className="collaborator-info">
                                    <span className={`status ${collaborator.online ? 'online' : ''}`} />
                                    <span>{collaborator.name}</span>
                                    <small>{collaborator.email}</small>
                                </div>
                                <div className="collaborator-permissions">
                                    <button 
                                        className={collaborator.canEdit ? 'active' : ''}
                                        title="Permissão de edição"
                                    >
                                        <Edit />
                                    </button>
                                    <button 
                                        className={collaborator.canComment ? 'active' : ''}
                                        title="Permissão de comentário"
                                    >
                                        <Comment />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="add-collaborator">
                        <input
                            type="email"
                            placeholder="Email do colaborador"
                            className="collaborator-input"
                        />
                        <button className="add-button">
                            <Add />
                            Adicionar
                        </button>
                    </div>
                </div>
            )}

            <div className="comments-section">
                <h4>Comentários</h4>
                <div className="comments-list">
                    {comments.map(comment => (
                        <div 
                            key={comment.id} 
                            className="comment-item"
                            style={comment.position && {
                                top: `${comment.position.top}px`,
                                left: `${comment.position.left}px`
                            }}
                        >
                            <div className="comment-header">
                                <span className="comment-author">{comment.author}</span>
                                <span className="comment-time">
                                    {new Date(comment.timestamp).toLocaleString()}
                                </span>
                            </div>
                            <div className="comment-content">{comment.text}</div>
                            <div className="comment-actions">
                                <button onClick={() => handleReply(comment.id)}>
                                    Responder
                                </button>
                                <button onClick={() => handleDeleteComment(comment.id)}>
                                    <Close />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="add-comment">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Adicionar comentário..."
                        className="comment-input"
                    />
                    <button 
                        onClick={addComment}
                        disabled={!newComment.trim()}
                        className="add-comment-button"
                    >
                        <Comment />
                        Comentar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CollaborationSystem; 