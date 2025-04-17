import React, { createContext, useContext, useReducer } from 'react';

const ChatContext = createContext();

const initialState = {
    messages: [],
    loading: false,
    error: null
};

const chatReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'ADD_MESSAGE':
            return { 
                ...state, 
                messages: [...state.messages, action.payload] 
            };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'CLEAR_MESSAGES':
            return { ...state, messages: [] };
        default:
            return state;
    }
};

export const ChatProvider = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, initialState);

    return (
        <ChatContext.Provider value={{ state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat deve ser usado dentro de um ChatProvider');
    }
    return context;
};