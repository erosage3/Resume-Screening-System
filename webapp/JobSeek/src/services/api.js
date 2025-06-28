import useApi from '../hooks/useApi';
import { useCallback } from 'react';

// Job-related API functions
export const useJobApi = () => {
    const api = useApi();

    const fetchJobs = useCallback(async () => {
        return await api.get('/jobs/');
    }, [api]);

    const fetchJobById = useCallback(async (jobId) => {
        return await api.get(`/jobs/${jobId}/`);
    }, [api]);

    const createJob = useCallback(async (jobData) => {
        return await api.post('/jobs/', jobData);
    }, [api]);

    const updateJob = useCallback(async (jobId, jobData) => {
        return await api.put(`/jobs/${jobId}/`, jobData);
    }, [api]);

    const deleteJob = useCallback(async (jobId) => {
        return await api.delete(`/jobs/${jobId}/`);
    }, [api]);

    return {
        fetchJobs,
        fetchJobById,
        createJob,
        updateJob,
        deleteJob,
        isLoading: api.isLoading,
        error: api.error,
        clearError: api.clearError
    };
};

// Auth-related API functions
export const useAuthApi = () => {
    const api = useApi();

    const login = async (credentials) => {
        // Use '/auth/login' (no trailing slash) to avoid FastAPI 307 redirect
        return await api.post('/auth/login', credentials);
    };

    const register = async (userData) => {
        return await api.post('/auth/register/', userData);
    };

    return {
        login,
        register,
        isLoading: api.isLoading,
        error: api.error,
        clearError: api.clearError
    };
};