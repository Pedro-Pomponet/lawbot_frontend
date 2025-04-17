import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';

const FeedbackSystem = ({ loading }) => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [services, setServices] = useState([]);
    const [newFeedback, setNewFeedback] = useState({
        serviceId: '',
        rating: 0,
        comment: '',
        type: 'service' // service, communication, general
    });

    useEffect(() => {
        loadFeedbacks();
        loadServices();
    }, []);

    const loadFeedbacks = async () => {
        try {
            const data = await api.getClientFeedbacks();
            setFeedbacks(data);
        } catch (error) {
            console.error('Erro ao carregar feedbacks:', error);
        }
    };

    const loadServices = async () => {
        try {
            const data = await api.getClientServices();
            setServices(data);
        } catch (error) {
            console.error('Erro ao carregar serviços:', error);
        }
    };

    const handleSubmitFeedback = async (e) => {
        e.preventDefault();
        try {
            await api.submitFeedback(newFeedback);
            setNewFeedback({
                serviceId: '',
                rating: 0,
                comment: '',
                type: 'service'
            });
            loadFeedbacks(); // Recarrega a lista
        } catch (error) {
            console.error('Erro ao enviar feedback:', error);
        }
    };

    const renderStars = (rating, interactive = false) => {
        return Array(5).fill(0).map((_, index) => (
            <span
                key={index}
                className={`star ${index < rating ? 'filled' : ''}`}
                onClick={() => interactive && setNewFeedback(prev => ({
                    ...prev,
                    rating: index + 1
                }))}
            >
                ⭐
            </span>
        ));
    };

    if (loading) return <div className="loading">Carregando...</div>;

    return (
        <div className="feedback-system">
            <div className="feedback-header">
                <h2>Feedback e Avaliações</h2>
            </div>

            <div className="feedback-content">
                <div className="feedback-form-section">
                    <h3>Enviar Novo Feedback</h3>
                    <form onSubmit={handleSubmitFeedback} className="feedback-form">
                        <div className="form-group">
                            <label>Tipo de Feedback</label>
                            <select
                                value={newFeedback.type}
                                onChange={e => setNewFeedback(prev => ({
                                    ...prev,
                                    type: e.target.value
                                }))}
                                required
                            >
                                <option value="service">Serviço Prestado</option>
                                <option value="communication">Comunicação</option>
                                <option value="general">Geral</option>
                            </select>
                        </div>

                        {newFeedback.type === 'service' && (
                            <div className="form-group">
                                <label>Serviço</label>
                                <select
                                    value={newFeedback.serviceId}
                                    onChange={e => setNewFeedback(prev => ({
                                        ...prev,
                                        serviceId: e.target.value
                                    }))}
                                    required
                                >
                                    <option value="">Selecione um serviço</option>
                                    {services.map(service => (
                                        <option key={service.id} value={service.id}>
                                            {service.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="form-group">
                            <label>Avaliação</label>
                            <div className="rating-input">
                                {renderStars(newFeedback.rating, true)}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Comentário</label>
                            <textarea
                                value={newFeedback.comment}
                                onChange={e => setNewFeedback(prev => ({
                                    ...prev,
                                    comment: e.target.value
                                }))}
                                placeholder="Compartilhe sua experiência..."
                                required
                            />
                        </div>

                        <button type="submit" className="submit-feedback-btn">
                            Enviar Feedback
                        </button>
                    </form>
                </div>

                <div className="feedback-history">
                    <h3>Histórico de Feedbacks</h3>
                    <div className="feedbacks-list">
                        {feedbacks.map(feedback => (
                            <div key={feedback.id} className="feedback-card">
                                <div className="feedback-header">
                                    <span className="feedback-type">
                                        {feedback.type === 'service' ? '🛠️ Serviço' :
                                         feedback.type === 'communication' ? '💬 Comunicação' : '📝 Geral'}
                                    </span>
                                    <span className="feedback-date">
                                        {formatters.formatDate(feedback.date)}
                                    </span>
                                </div>
                                
                                {feedback.type === 'service' && (
                                    <div className="service-info">
                                        Serviço: {feedback.serviceName}
                                    </div>
                                )}

                                <div className="rating-display">
                                    {renderStars(feedback.rating)}
                                </div>

                                <p className="feedback-comment">
                                    {feedback.comment}
                                </p>

                                {feedback.response && (
                                    <div className="feedback-response">
                                        <strong>Resposta:</strong>
                                        <p>{feedback.response}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackSystem;