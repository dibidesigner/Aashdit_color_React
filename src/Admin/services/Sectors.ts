import axios from "axios";
import type { Sector } from "../../types/sector";

export interface SectorResponse {
    success?: boolean;
    message?: string;
    sector?: Sector;
    data?: Sector;
    [key: string]: any;
}

export interface GetSectorsResponse {
    success?: boolean;
    sectors?: Sector[];
    data?: Sector[];
    message?: string;
    [key: string]: any;
}

const BASE_URL = import.meta.env.VITE_API_URL;

export const saveSector = async (sectorData: Sector): Promise<Sector> => {
    try {
        console.log("Saving sector payload:", sectorData);
        const response = await axios.post(`${BASE_URL}/sectors/save/`, sectorData);
        console.log("saveSector response:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("saveSector error:", error?.response?.data?.message || error?.message || "Failed to save sector");
        throw error;
    }
};

export const getSectors = async (): Promise<Sector[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/sectors/`);
        console.log("getSectors response:", response.data);
        if (Array.isArray(response.data)) {
            return response.data;
        } else if (response.data && Array.isArray(response.data.sectors)) {
            return response.data.sectors;
        } else if (response.data && Array.isArray(response.data.data)) {
            return response.data.data;
        }
        return [];
    } catch (error: any) {
        console.error("getSectors error:", error?.response?.data?.message || error?.message || "Failed to fetch sectors");
        return [];
    }
};

export const getSectorById = async (id: number | string): Promise<Sector | null> => {
    try {
        const response = await axios.get(`${BASE_URL}/sectors/${id}/`);
        console.log(`getSectorById (${id}) response:`, response.data);
        return response.data?.sector || response.data?.data || response.data;
    } catch (error: any) {
        try {
            const fallback = await axios.get(`${BASE_URL}/sectors/?id=${id}`);
            return fallback.data?.sector || fallback.data?.data || fallback.data;
        } catch (err: any) {
            console.error(`getSectorById (${id}) error:`, err?.message || "Failed to fetch sector");
            return null;
        }
    }
};

export const updateSector = async (id: number | string, sectorData: Partial<Sector>): Promise<Sector> => {
    try {
        console.log(`Updating sector ${id} payload:`, sectorData);
        const response = await axios.put(`${BASE_URL}/sectors/${id}/`, { ...sectorData, id });
        console.log("updateSector response:", response.data);
        return response.data;
    } catch (error: any) {
        try {
            const response = await axios.put(`${BASE_URL}/sectors/`, { ...sectorData, id });
            return response.data;
        } catch (err: any) {
            console.error(`updateSector (${id}) error:`, err?.message || "Failed to update sector");
            throw err;
        }
    }
};

export const deleteSector = async (id: number | string): Promise<SectorResponse> => {
    try {
        console.log(`Deleting sector ${id}`);
        const response = await axios.delete(`${BASE_URL}/sectors/${id}/`);
        console.log("deleteSector response:", response.data);
        return response.data;
    } catch (error: any) {
        try {
            const response = await axios.delete(`${BASE_URL}/sectors/`, {
                data: { id },
                params: { id }
            });
            return response.data;
        } catch (err: any) {
            console.error(`deleteSector (${id}) error:`, err?.message || "Failed to delete sector");
            throw err;
        }
    }
};

export default {
    saveSector,
    getSectors,
    getSectorById,
    updateSector,
    deleteSector,
};
