export const formatters = {
    // Formata data para exibição
    formatDate(date) {
        return new Date(date).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    // Formata tamanho de arquivo
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    }
};

export const validators = {
    // Valida tipo de arquivo
    isValidFileType(file, allowedTypes) {
        const fileType = file.name.split('.').pop().toLowerCase();
        return allowedTypes.includes(fileType);
    },

    // Valida tamanho do arquivo
    isValidFileSize(file, maxSize) {
        return file.size <= maxSize;
    },

    // Valida comprimento da mensagem
    isValidMessageLength(message, maxLength) {
        return message.length <= maxLength && message.trim().length > 0;
    }
};

export const documentProcessors = {
    // Extrai texto de diferentes tipos de documentos
    async extractText(file) {
        const reader = new FileReader();
        
        return new Promise((resolve, reject) => {
            reader.onload = (e) => {
                try {
                    const text = e.target.result;
                    resolve(text);
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    },

    // Processa documentos jurídicos
    processLegalDocument(text) {
        // Identificar partes do documento
        const parts = {
            header: text.match(/^(.+?\n\n)/s)?.[1] || '',
            body: text.match(/\n\n(.+)\n\n/s)?.[1] || '',
            footer: text.match(/\n\n(.+)$/s)?.[1] || ''
        };

        return {
            parts,
            wordCount: text.split(/\s+/).length,
            hasSignature: /assinatura|signature/i.test(text),
            dateMatches: text.match(/\d{2}\/\d{2}\/\d{4}/g) || []
        };
    }
};

export const errorHandlers = {
    // Trata erros comuns
    handleApiError(error) {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    return 'Não autorizado. Por favor, faça login novamente.';
                case 403:
                    return 'Você não tem permissão para realizar esta ação.';
                case 404:
                    return 'Recurso não encontrado.';
                case 429:
                    return 'Muitas requisições. Por favor, aguarde um momento.';
                default:
                    return 'Erro no servidor. Tente novamente mais tarde.';
            }
        }
        return 'Erro de conexão. Verifique sua internet.';
    },

    // Trata erros de upload
    handleUploadError(error) {
        if (error.code === 'FILE_TOO_LARGE') {
            return 'Arquivo muito grande. Tamanho máximo permitido é 5MB.';
        }
        if (error.code === 'INVALID_TYPE') {
            return 'Tipo de arquivo não suportado.';
        }
        return 'Erro no upload do arquivo. Tente novamente.';
    }
}; 