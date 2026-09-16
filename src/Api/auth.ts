import { setAccessToken } from './apiClient';
import axios from "axios"

interface LoginResponse {
    access: string;
    refresh: string;
    status: string;
}

export const login = async (
    username: string,
    password: string
) => {
    const response = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_API_URL}/auth/login/`,
        {
            username,
            password,
        }
    );

    setAccessToken(response.data.access, response.data.refresh);

    return response.data;
};

export const logout = async () => {
    try {
        await axios.post(`${import.meta.env.VITE_API_URL || ''}/auth/logout/`);
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        setAccessToken(null, null);
    }
};