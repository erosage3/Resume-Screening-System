// src/hooks/useJobsContext.js
import { useContext } from 'react';
import { JobsContext } from '../contexts/JobsContext';

export const useJobsContext = () => {
  const context = useContext(JobsContext);
  if (!context) throw new Error('useJobsContext must be used within JobsProvider');
  return context;
};