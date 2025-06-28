import { useState, useCallback } from 'react';

const useApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const API_BASE = 'http://localhost:8000'; // Your API base URL

    const sendRequest = useCallback(async (endpoint, method = 'GET', body = null, customHeaders = {}) => {
    setIsLoading(true);
    setError(null);

    try {
        let token = localStorage.getItem('accessToken');
        if (!token && endpoint !== '/auth/login' && endpoint !== '/auth/register') {
            throw new Error('Authentication required. Please login.');
        }

        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...customHeaders
        };

        const config = {
            method,
            headers
        };

        if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
            config.body = JSON.stringify(body);
        }

        const response = await fetch(`${API_BASE}${endpoint}`, config);

        // Handle 204 No Content
        if (response.status === 204) return null;

        const text = await response.text();
        let data = null;
        try {
            data = text ? JSON.parse(text) : null;
        } catch {
            console.error('Failed to parse JSON:', text);
            setError('Server returned invalid response.');
            throw new Error('Invalid server response');
        }

        if (!response.ok) {
            const errorMsg = data?.detail || data?.message || 'Request failed';
            if (response.status === 401) {
                // Handle token expiration
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
            }
            throw new Error(errorMsg);
        }

        return data;
    } catch (err) {
        setError(err.message || 'Something went wrong!');
        throw err;
    } finally {
        setIsLoading(false);
    }
}, []);

    const get = useCallback((endpoint, headers = {}) => {
        return sendRequest(endpoint, 'GET', null, headers);
    }, [sendRequest]);

    const post = useCallback((endpoint, body, headers = {}) => {
        return sendRequest(endpoint, 'POST', body, headers);
    }, [sendRequest]);

    const put = useCallback((endpoint, body, headers = {}) => {
        return sendRequest(endpoint, 'PUT', body, headers);
    }, [sendRequest]);

    const patch = useCallback((endpoint, body, headers = {}) => {
        return sendRequest(endpoint, 'PATCH', body, headers);
    }, [sendRequest]);

    const del = useCallback((endpoint, headers = {}) => {
        return sendRequest(endpoint, 'DELETE', null, headers);
    }, [sendRequest]);

    return {
        isLoading,
        error,
        clearError: () => setError(null),
        sendRequest,
        get,
        post,
        put,
        patch,
        delete: del
    };
};

export default useApi;