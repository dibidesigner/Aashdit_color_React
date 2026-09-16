import axios, {
    AxiosError,
    type InternalAxiosRequestConfig,
} from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Keep access token in memory initialized from storage
let accessToken: string | null = localStorage.getItem("AuthToken");

export const setAccessToken = (token: string | null, RefreshToken: string | null) => {
    if (token) {
        localStorage.setItem("AuthToken", token);
    } else {
        localStorage.removeItem("AuthToken");
    }
    if (RefreshToken) {
        localStorage.setItem("RefreshToken", RefreshToken);
    } else {
        localStorage.removeItem("RefreshToken");
    }
    accessToken = token;
};

export const getAccessToken = () => {
    return accessToken || localStorage.getItem("AuthToken");
};

export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("AuthToken") || accessToken;
    return Boolean(token && token !== 'null' && token !== 'undefined');
};

// Request interceptor
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Prevent multiple refresh requests at the same time
let isRefreshing = false;

let refreshSubscribers: Array<(token: string) => void> = [];

const subscribeTokenRefresh = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback);
};

const onRefreshSuccess = (token: string) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
};

const onRefreshFailed = () => {
    refreshSubscribers = [];
};

// Response interceptor
apiClient.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        // Only handle 401
        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        // Don't refresh the refresh endpoint itself
        if (originalRequest.url?.includes('/auth/refresh/')) {
            setAccessToken(null, null);

            return Promise.reject(error);
        }

        // Don't retry the same request again
        if (originalRequest._retry) {
            setAccessToken(null, null);

            return Promise.reject(error);
        }

        originalRequest._retry = true;

        // If another request is already refreshing,
        // wait for that refresh to finish.
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                subscribeTokenRefresh((token: string) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;

                    apiClient(originalRequest)
                        .then(resolve)
                        .catch(reject);
                });
            });
        }

        isRefreshing = true;

        try {
            // Refresh token is automatically sent
            // because it is stored in an HttpOnly cookie.
            const response = await axios.post(
                `${API_URL}/auth/refresh/`,
                {},
                {
                    withCredentials: true,
                }
            );

            const newAccessToken = response.data.access;

            setAccessToken(newAccessToken, response.data.refresh);

            onRefreshSuccess(newAccessToken);

            // Retry original request
            originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;

            return apiClient(originalRequest);

        } catch (refreshError) {
            setAccessToken(null, null);

            onRefreshFailed();

            // Optional: redirect to login
            window.location.href = '/';

            return Promise.reject(refreshError);

        } finally {
            isRefreshing = false;
        }
    }
);

export default apiClient;