import apiClient, { setAccessToken } from './apiClient';

interface LoginResponse {
    access: string;
}

export const login = async (
    username: string,
    password: string
) => {
    const response = await apiClient.post<LoginResponse>(
        '/auth/login/',
        {
            username,
            password,
        }
    );

    setAccessToken(response.data.access);

    return response.data;
};

export const logout = async () => {
    try {
        await apiClient.post('/auth/logout/');
    } finally {
        setAccessToken(null);
    }
};