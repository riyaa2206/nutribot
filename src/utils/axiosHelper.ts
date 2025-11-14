import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// For Android emulator, use 10.0.2.2 to access localhost
const LOCAL_URL = 'http://192.168.1.3:8080/con';
const PRODUCTION_URL = 'https://uo5exhg7ej.execute-api.ap-south-1.amazonaws.com/main/con';

const ENV = process.env.NODE_ENV || 'development';
export const BASE_URL = ENV === 'production' ? PRODUCTION_URL : LOCAL_URL;

const Raxios = axios.create({ baseURL: PRODUCTION_URL });

Raxios.interceptors.request.use(
    async (config) => {
        if (config.headers.Authorization) return config;
        const token = await AsyncStorage.getItem('access_token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const logout_user = async () => {
    await AsyncStorage.clear();
    // Navigation should be handled by the calling component using React Navigation
    // Example: navigation.navigate('Login');
};

const refreshFaxiosAccessToken = async () => {
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    try {
        let response = await axios.post(`${BASE_URL}/refresh`,
            { action: 'refresh' }, {
            headers: { Authorization: `Bearer ${refreshToken}` }
        });
        if (response.status !== 200) await logout_user();
        const newAccessToken = response.data.data.access_token;
        await AsyncStorage.setItem('access_token', newAccessToken);
        return newAccessToken;
    } catch (error) {
        await logout_user();
    }
};

Raxios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refreshFaxiosAccessToken();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return Raxios(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default Raxios;