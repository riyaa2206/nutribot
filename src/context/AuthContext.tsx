import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
    isAuthenticated: boolean | null;
    login: (accessToken: string, refreshToken: string, userId: string, userName: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    const checkAuthStatus = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            setIsAuthenticated(!!token);
        } catch (error) {
            console.error('Error checking auth status:', error);
            setIsAuthenticated(false);
        }
    };

    const login = async (accessToken: string, refreshToken: string, userId: string, userName: string) => {
        try {
            await AsyncStorage.setItem('access_token', accessToken);
            await AsyncStorage.setItem('refresh_token', refreshToken);
            await AsyncStorage.setItem('user_id', userId);
            await AsyncStorage.setItem('user_name', userName);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error storing auth data:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.clear();
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error during logout:', error);
            throw error;
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};
