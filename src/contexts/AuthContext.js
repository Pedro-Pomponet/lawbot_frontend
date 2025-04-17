import React, { createContext, useContext, useState } from 'react';
import { mockUsers } from '../mocks/users';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            // Para o MVP, vamos usar mock de usuário
            const mockLawyer = mockUsers.lawyer;
            if (email === mockLawyer.email) {
                setUser(mockLawyer);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(mockLawyer));
                return mockLawyer;
            }
            
            const mockClient = mockUsers.client;
            if (email === mockClient.email) {
                setUser(mockClient);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(mockClient));
                return mockClient;
            }

            throw new Error('Usuário não encontrado');
        } catch (error) {
            console.error('Erro no login:', error);
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            // Simula registro para MVP
            const newUser = {
                ...userData,
                id: Date.now(),
                createdAt: new Date().toISOString()
            };
            setUser(newUser);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(newUser));
            return newUser;
        } catch (error) {
            console.error('Erro no registro:', error);
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated, 
            loading,
            error,
            login, 
            logout,
            register
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};
