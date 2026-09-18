import axios from 'axios';

export interface SaveUserPayload {
    id?: number | string;
    username: string;
    email: string;
    mobileno?: string;
    phone?: string;
    first_name: string;
    last_name: string;
    role?: string;
    status?: string;
    [key: string]: any;
}

export interface SaveUserResponse {
    success?: boolean;
    status?: string | boolean;
    message?: string;
    user?: any;
    data?: any;
    [key: string]: any;
}

export interface BackendUser {
    id: number | string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    [key: string]: any;
}

export interface GetUsersResponse {
    success: boolean;
    users: BackendUser[];
    message?: string;
}

export interface GetSingleUserResponse {
    success: boolean;
    user: BackendUser;
    message?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Service to create a new user.
 * POST /auth/saveuser/
 */
export const saveUser = async (userData: SaveUserPayload): Promise<SaveUserResponse> => {
    console.log("Creating user payload:", userData);
    const response = await axios.post(`${BASE_URL}/auth/saveuser/`, userData);
    console.log("saveUser response:", response.data);
    return response.data;
};

/**
 * Service to fetch all users.
 * GET /auth/saveuser/
 */
export const getUsers = async (): Promise<GetUsersResponse> => {
    const response = await axios.get<GetUsersResponse>(`${BASE_URL}/auth/saveuser/`);
    console.log("getUsers response:", response.data);
    return response.data;
};

/**
 * Service to fetch a single user by ID.
 * GET /auth/saveuser/<id>/
 */
export const getUserById = async (id: number | string): Promise<GetSingleUserResponse> => {
    try {
        const response = await axios.get<GetSingleUserResponse>(`${BASE_URL}/auth/saveuser/${id}/`);
        console.log(`getUserById (${id}) response:`, response.data);
        return response.data;
    } catch (error) {
        const response = await axios.get<GetSingleUserResponse>(`${BASE_URL}/auth/saveuser/?id=${id}`);
        return response.data;
    }
};

/**
 * Service to update an existing user.
 * PUT /auth/saveuser/<id>/
 */
export const updateUser = async (id: number | string, userData: Partial<SaveUserPayload>): Promise<SaveUserResponse> => {
    console.log(`Updating user ${id} payload:`, userData);
    try {
        const response = await axios.put(`${BASE_URL}/auth/saveuser/${id}/`, { ...userData, id });
        console.log("updateUser response:", response.data);
        return response.data;
    } catch (error) {
        const response = await axios.put(`${BASE_URL}/auth/saveuser/`, { ...userData, id });
        return response.data;
    }
};

/**
 * Service to delete a user by ID.
 * DELETE /auth/saveuser/<id>/
 */
export const deleteUser = async (id: number | string): Promise<SaveUserResponse> => {
    console.log(`Deleting user ${id}`);
    try {
        const response = await axios.delete(`${BASE_URL}/auth/saveuser/${id}/`);
        console.log("deleteUser response:", response.data);
        return response.data;
    } catch (error) {
        const response = await axios.delete(`${BASE_URL}/auth/saveuser/`, {
            data: { id },
            params: { id }
        });
        return response.data;
    }
};

export default {
    saveUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};
