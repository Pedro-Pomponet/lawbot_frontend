export const API_CONFIG = {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    endpoints: {
        chat: '/api/chat',
        documents: '/api/documents',
        feedback: '/api/feedback'
    }
};

export const CHAT_CONFIG = {
    maxMessageLength: 1000,
    supportedFileTypes: ['pdf', 'doc', 'docx', 'txt'],
    maxFileSize: 5 * 1024 * 1024 // 5MB
}; 