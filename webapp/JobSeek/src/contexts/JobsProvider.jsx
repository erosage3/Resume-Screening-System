// src/contexts/JobsProvider.jsx
import { JobsContext } from './JobsContext';
import { useJobs } from '../hooks/useJobs';

export const JobsProvider = ({ children }) => {
  const jobsData = useJobs();
  return (
    <JobsContext.Provider value={jobsData}>
      {children}
    </JobsContext.Provider>
  );
};