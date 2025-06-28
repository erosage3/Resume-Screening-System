import { useState } from 'react';
import { Plus, Briefcase } from 'lucide-react';
import { useJobsContext } from '../../hooks/useJobsContext';
import JobList from '../../components/recruiter/JobList';
import SearchBar from '../../components/recruiter/SearchBar';
import EmptyState from '../../components/recruiter/EmptyState';
import JobStats from '../../components/recruiter/JobStats';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const RecruiterDashboardContent = () => {
    const { jobs, isLoading, addJob, editJob, removeJob } = useJobsContext();
    const [editingJob, setEditingJob] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleEdit = (job) => {
        setEditingJob(job);
        // You can implement edit navigation/modal if needed
    };

    const handleDelete = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            await removeJob(jobId);
        }
    };

    const filteredJobs = jobs.filter(job => {
        const searchLower = searchTerm.toLowerCase();
        return (
            (job.title || '').toLowerCase().includes(searchLower) ||
            (Array.isArray(job.skills) ? job.skills.join(', ').toLowerCase() : '').includes(searchLower)
        );
    });

    return (
        <div className="p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            <Briefcase className="inline mr-2 w-6 h-6 text-blue-600" />
                            Recruiter Dashboard
                        </h1>
                        <JobStats jobs={jobs} />
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Button 
                            onClick={() => navigate('/recruiter/post-job')}
                            className="flex items-center gap-2 w-full md:w-auto justify-center p-2"
                        >
                            <Plus className="w-5 h-5" />
                            Post New Job
                        </Button>
                    </div>
                </div>

                <SearchBar value={searchTerm} onChange={setSearchTerm} />

                {isLoading && jobs.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <EmptyState 
                        searchTerm={searchTerm} 
                        onCreateJob={() => navigate('/recruiter/post-job')} 
                    />
                ) : (
                    <JobList 
                        jobs={filteredJobs} 
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </div>
        </div>
    );
};

export default RecruiterDashboardContent;