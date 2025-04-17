import React, { useState, useEffect } from 'react';
import { 
    Notifications, 
    NotificationsActive, 
    NotificationsOff,
    AccessTime,
    Update,
    Person,
    Comment,
    Delete,
    CheckCircle,
    Settings,
    FilterList,
    MarkEmailRead
} from '@mui/icons-material';
import './NotificationSystem.css';

const NotificationSystem = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [notificationSettings, setNotificationSettings] = useState({
        documentUpdates: true,
        deadlineReminders: true,
        commentMentions: true,
        systemUpdates: true,
        emailNotifications: true,
        pushNotifications: false
    });
    const [filterType, setFilterType] = useState('all');
    
    useEffect(() => {
        loadNotifications();
    }, [userId, filterType]);
    
    useEffect(() => {
        loadNotificationSettings();
    }, [userId]);
    
    const loadNotifications = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/notifications?userId=${userId}&type=${filterType}`);
            const data = await response.json();
            setNotifications(data.notifications);
            setUnreadCount(data.notifications.filter(n => !n.read).length);
        } catch (error) {
            console.error('Erro ao carregar notificações:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const loadNotificationSettings = async () => {
        try {
            const response = await fetch(`/api/notifications/settings?userId=${userId}`);
            const data = await response.json();
            setNotificationSettings(data.settings);
        } catch (error) {
            console.error('Erro ao carregar configurações de notificações:', error);
        }
    };
    
    const markAsRead = async (notificationId) => {
        try {
            await fetch(`/api/notifications/${notificationId}/read`, {
                method: 'POST'
            });
            
            // Atualizar estado local
            setNotifications(notifications.map(n => 
                n.id === notificationId ? { ...n, read: true } : n
            ));
            setUnreadCount(prev => prev - 1);
        } catch (error) {
            console.error('Erro ao marcar notificação como lida:', error);
        }
    };
    
    const markAllAsRead = async () => {
        try {
            await fetch(`/api/notifications/mark-all-read`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });
            
            // Atualizar estado local
            setNotifications(notifications.map(n => ({ ...n, read: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error('Erro ao marcar todas notificações como lidas:', error);
        }
    };
    
    const deleteNotification = async (notificationId) => {
        try {
            await fetch(`/api/notifications/${notificationId}`, {
                method: 'DELETE'
            });
            
            // Atualizar estado local
            const updatedNotifications = notifications.filter(n => n.id !== notificationId);
            setNotifications(updatedNotifications);
            setUnreadCount(updatedNotifications.filter(n => !n.read).length);
        } catch (error) {
            console.error('Erro ao excluir notificação:', error);
        }
    };
    
    const updateSettings = async (setting, value) => {
        const updatedSettings = {
            ...notificationSettings,
            [setting]: value
        };
        
        try {
            await fetch(`/api/notifications/settings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    settings: updatedSettings
                })
            });
            
            // Atualizar estado local
            setNotificationSettings(updatedSettings);
        } catch (error) {
            console.error('Erro ao atualizar configurações:', error);
        }
    };
    
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'deadline':
                return <AccessTime className="notification-icon deadline" />;
            case 'update':
                return <Update className="notification-icon update" />;
            case 'mention':
                return <Person className="notification-icon mention" />;
            case 'comment':
                return <Comment className="notification-icon comment" />;
            default:
                return <Notifications className="notification-icon" />;
        }
    };
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);
        
        if (diffMins < 60) {
            return `${diffMins} min atrás`;
        } else if (diffHours < 24) {
            return `${diffHours} h atrás`;
        } else if (diffDays < 7) {
            return `${diffDays} dias atrás`;
        } else {
            return date.toLocaleDateString('pt-BR');
        }
    };
    
    const mockNotifications = [
        {
            id: 1,
            type: 'deadline',
            title: 'Prazo Processual',
            message: 'Prazo para recurso no processo nº 1234.5678 vence em 3 dias',
            date: new Date(Date.now() - 1800000).toISOString(), // 30 minutos atrás
            read: false,
            priority: 'high'
        },
        {
            id: 2,
            type: 'update',
            title: 'Nova Legislação',
            message: 'Lei 14.789/2024 sobre Direito Digital foi adicionada à biblioteca',
            date: new Date(Date.now() - 7200000).toISOString(), // 2 horas atrás
            read: false,
            priority: 'medium'
        },
        {
            id: 3,
            type: 'mention',
            title: 'Menção em Documento',
            message: 'Dr. Silva comentou em "Petição Inicial - Caso João"',
            date: new Date(Date.now() - 86400000).toISOString(), // 1 dia atrás
            read: true,
            priority: 'low'
        },
        {
            id: 4,
            type: 'comment',
            title: 'Novo Comentário',
            message: 'Novo comentário adicionado ao modelo "Contestação Padrão"',
            date: new Date(Date.now() - 172800000).toISOString(), // 2 dias atrás
            read: true,
            priority: 'low'
        }
    ];
    
    return (
        <div className="notifications-container">
            <div className="notifications-header">
                <div className="notifications-title">
                    <NotificationsActive />
                    <h3>Central de Notificações</h3>
                </div>
                <div className="notifications-actions">
                    <select 
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">Todas</option>
                        <option value="unread">Não lidas</option>
                        <option value="read">Lidas</option>
                    </select>
                    <button 
                        className="settings-button"
                        onClick={() => setShowSettings(!showSettings)}
                    >
                        <Settings />
                    </button>
                </div>
            </div>

            <div className="notifications-list">
                {notifications
                    .filter(notif => {
                        if (filterType === 'unread') return !notif.read;
                        if (filterType === 'read') return notif.read;
                        return true;
                    })
                    .map(notification => (
                        <div 
                            key={notification.id} 
                            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                        >
                            <div className="notification-content">
                                <h4>{notification.title}</h4>
                                <p>{notification.message}</p>
                                <span className="notification-date">{formatDate(notification.date)}</span>
                            </div>
                            <div className="notification-actions">
                                {!notification.read && (
                                    <button 
                                        onClick={() => markAsRead(notification.id)}
                                        className="action-button read"
                                    >
                                        <CheckCircle />
                                    </button>
                                )}
                                <button 
                                    onClick={() => deleteNotification(notification.id)}
                                    className="action-button delete"
                                >
                                    <Delete />
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

            {showSettings && (
                <div className="notifications-settings">
                    <h4>Configurações de Notificações</h4>
                    <div className="settings-options">
                        <label>
                            <input type="checkbox" defaultChecked />
                            Notificações por email
                        </label>
                        <label>
                            <input type="checkbox" defaultChecked />
                            Notificações push
                        </label>
                        <label>
                            <input type="checkbox" defaultChecked />
                            Alertas de prazos
                        </label>
                        <label>
                            <input type="checkbox" defaultChecked />
                            Atualizações da biblioteca
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationSystem; 