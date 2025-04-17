class ContextManager {
    constructor() {
        this.context = {
            currentDocument: null,
            conversation: [],
            userPreferences: {},
            legalArea: null
        };
    }

    updateContext(newData) {
        this.context = {
            ...this.context,
            ...newData
        };
    }

    addToConversation(message) {
        this.context.conversation.push({
            ...message,
            timestamp: new Date()
        });
    }

    getCurrentContext() {
        return this.context;
    }

    clearContext() {
        this.context = {
            currentDocument: null,
            conversation: [],
            userPreferences: this.context.userPreferences,
            legalArea: null
        };
    }
}

export const contextManager = new ContextManager(); 