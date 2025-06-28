import { useState, useCallback, useEffect } from 'react';
import { useJobApi } from '../services/api';

export const useJobs = () => {
    // Call useJobApi at the top level (no useMemo)
    const {
        fetchJobs,
        createJob,
        updateJob,
        deleteJob,
        isLoading,
        error
    } = useJobApi();

    const [jobs, setJobs] = useState([]);

    const loadJobs = useCallback(async () => {
        try {
            const data = await fetchJobs();
            setJobs(data);
        } catch (err) {
            console.error('Failed to load jobs:', err);
        }
    }, [fetchJobs]);

    // Only run once on mount to avoid infinite loop
    useEffect(() => {
        loadJobs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addJob = async (jobData) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error('Authentication required. Please login.');
            }

            // Post job and get job_id
            const result = await createJob(jobData);
            // Fetch the full job object from backend using job_id
            if (result && result.job_id) {
                const jobsList = await fetchJobs();
                // Ensure job_id is a number for comparison
                const jobIdNum = Number(result.job_id);
                const newJob = jobsList.find(j => Number(j.id) === jobIdNum);
                if (newJob) {
                    setJobs(prev => [newJob, ...prev]);
                    return newJob;
                }
            }
            // fallback: reload all jobs if not found
            await loadJobs();
            return null;
        } catch (err) {
            console.error('Failed to add job:', err);
            throw new Error(err.message || 'Failed to create job. Please try again.');
        }
    };

    const editJob = async (jobId, jobData) => {
        try {
            const updatedJob = await updateJob(jobId, jobData);
            setJobs(prev => prev.map(job => job.id === jobId ? updatedJob : job));
            return updatedJob;
        } catch (err) {
            console.error('Failed to update job:', err);
            throw err;
        }
    };

    const removeJob = async (jobId) => {
        try {
            // Ensure jobId is a number
            await deleteJob(Number(jobId));
            setJobs(prev => prev.filter(job => Number(job.id) !== Number(jobId)));
        } catch (err) {
            console.error('Failed to delete job:', err);
            throw err;
        }
    };

    return {
        jobs,
        isLoading,
        error,
        loadJobs, // still exported in case manual refresh is needed
        addJob,
        editJob,
        removeJob
    };
};