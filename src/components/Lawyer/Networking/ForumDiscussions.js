import React, { useState } from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';

const ForumDiscussions = ({ discussions, onDiscussionUpdate }) => {
    const [newDiscussion, setNewDiscussion] = useState({
        title: '',
        content: '',
        tags: []
    });
    const [selectedTag, setSelectedTag] = useState('all');

    const handleCreateDiscussion = async (e) => {
        e.preventDefault();
        try {
            await api.createDiscussion(newDiscussion);
            setNewDiscussion({ title: '', content: '', tags: [] });
            onDiscussionUpdate();
        } catch (error) {
            console.error('Erro ao criar discussão:', error);
        }
    };

    const handleLike = async (discussionId) => {
        try {
            await api.likeDiscussion(discussionId);
            onDiscussionUpdate();
        } catch (error) {
            console.error('Erro ao curtir discussão:', error);
        }
    };

    return (
        <div className="forum-discussions">
            <header className="section-header">
                <h2>Fórum de Discussões</h2>
                <div className="forum-filters">
                    <select
                        value={selectedTag}
                        onChange={e => setSelectedTag(e.target.value)}
                    >
                        <option value="all">Todos os Tópicos</option>
                        <option value="civil">Direito Civil</option>
                        <option value="criminal">Direito Criminal</option>
                        <option value="labor">Direito Trabalhista</option>
                        <option value="tech">Tecnologia Jurídica</option>
                    </select>
                </div>
            </header>

            <form onSubmit={handleCreateDiscussion} className="new-discussion-form">
                <input
                    type="text"
                    placeholder="Título da discussão"
                    value={newDiscussion.title}
                    onChange={e => setNewDiscussion({
                        ...newDiscussion,
                        title: e.target.value
                    })}
                />
                <textarea
                    placeholder="Conteúdo da discussão"
                    value={newDiscussion.content}
                    onChange={e => setNewDiscussion({
                        ...newDiscussion,
                        content: e.target.value
                    })}
                />
                <button type="submit">Criar Discussão</button>
            </form>

            <div className="discussions-list">
                {discussions
                    .filter(d => selectedTag === 'all' || d.tags.includes(selectedTag))
                    .map(discussion => (
                        <div key={discussion.id} className="discussion-card">
                            <div className="discussion-header">
                                <div className="author-info">
                                    <img src={discussion.author.avatar} alt="" />
                                    <span>{discussion.author.name}</span>
                                </div>
                                <span className="timestamp">
                                    {formatters.formatDate(discussion.createdAt)}
                                </span>
                            </div>

                            <h3>{discussion.title}</h3>
                            <p className="discussion-content">{discussion.content}</p>

                            <div className="discussion-tags">
                                {discussion.tags.map(tag => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>

                            <div className="discussion-stats">
                                <button
                                    onClick={() => handleLike(discussion.id)}
                                    className={`like-btn ${discussion.isLiked ? 'liked' : ''}`}
                                >
                                    👍 {discussion.likes}
                                </button>
                                <span>💬 {discussion.comments} comentários</span>
                                <span>👁️ {discussion.views} visualizações</span>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ForumDiscussions; 