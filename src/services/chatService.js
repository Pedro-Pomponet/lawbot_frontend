import api from '../utils/api';

export const chatService = {
    async sendMessage(message, options = {}) {
        try {
            const response = await api.post('/chat', {
                message,
                type: options.type || 'legal_advice',
                context: {
                    area: options.area || 'direito_geral',
                    language: options.language || 'pt-BR',
                    userType: options.userType || 'lawyer',
                    caseId: options.caseId,
                    ...options.context
                }
            });

            // Verifica se a resposta está no formato esperado
            if (!response.data || !response.data.response) {
                throw new Error('Resposta inválida do servidor');
            }

            return {
                content: response.data.response,
                metadata: response.data.metadata || {},
                suggestions: response.data.suggestions || [],
                references: response.data.references || [],
                caseUpdate: response.data.caseUpdate // Para atualizações do caso
            };
        } catch (error) {
            console.error('Erro detalhado:', error.response || error);
            throw new Error('Falha ao enviar mensagem: ' + (error.response?.data?.message || error.message));
        }
    },

    async generateReport(conversation, type = 'legal_analysis') {
        try {
            const response = await api.post('/chat/report', {
                conversation,
                type
            });

            return response.data;
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            throw new Error('Falha ao gerar relatório');
        }
    },

    async getChatHistory(options = {}) {
        try {
            const response = await api.get('/chat/history', { params: options });
            return response.data;
        } catch (error) {
            console.error('Erro ao carregar histórico:', error);
            throw new Error('Falha ao carregar histórico do chat');
        }
    }
};