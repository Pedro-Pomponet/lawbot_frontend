import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';

const NotificationSystem = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [settings, setSettings] = useState({
        deadlines: true,
        caseUpdates: true,
        teamMessages: true,
        pushEnabled: false
    });

    useEffect(() => {
        loadNotifications();
        initializePushNotifications();
    }, []);

    const loadNotifications = async () => {
        try {
            const data = await api.getNotifications();
            setNotifications(data.notifications);
            setUnreadCount(data.unreadCount);
        } catch (error) {
            console.error('Erro ao carregar notificações:', error);
        }
    };

    const initializePushNotifications = async () => {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                setSettings(prev => ({ ...prev, pushEnabled: true }));
            }
        } catch (error) {
            console.error('Erro ao configurar notificações push:', error);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await api.markNotificationAsRead(notificationId);
            loadNotifications();
        } catch (error) {
            console.error('Erro ao marcar notificação como lida:', error);
        }
    };

    return (
        <div className="notification-system">
            <div className="notification-header">
                <h2>Notificações ({unreadCount})</h2>
                <div className="notification-settings">
                    <button className="settings-btn">⚙️ Configurações</button>
                </div>
            </div>

            <div className="notifications-list">
                {notifications.map(notification => (
                    <div 
                        key={notification.id} 
                        className={`notification-card ${notification.read ? '' : 'unread'}`}
                        onClick={() => markAsRead(notification.id)}
                    >
                        <div className="notification-icon">
                            {notification.type === 'deadline' && '⏰'}
                            {notification.type === 'case' && '⚖️'}
                            {notification.type === 'team' && '👥'}
                        </div>
                        <div className="notification-content">
                            <h4>{notification.title}</h4>
                            <p>{notification.message}</p>
                            <span className="notification-time">
                                {notification.time}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationSystem; 