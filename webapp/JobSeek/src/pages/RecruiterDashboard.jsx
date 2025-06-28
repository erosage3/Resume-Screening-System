import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Calendar, Users, X } from 'lucide-react';

export default function RecruiterDashboard() {
    const [jobs, setJobs] = useState([]);
    const [showJobForm, setShowJobForm] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        skills: '',
        due_date: ''
    });
    const [errors, setErrors] = useState({});

    const token = localStorage.getItem('accessToken');
    const API_BASE = 'http://localhost:8000';

    useEffect(() => {
        const fetchInitialJobs = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_BASE}/jobs/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                console.log("Jobs fetched from API:", data);
                setJobs(Array.isArray(data) ? data : data.jobs || []);
            } catch (error) {
                console.error("Failed to load jobs:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInitialJobs();
    }, [token]);

    const closeJobForm = () => {
        setShowJobForm(false);
        setEditingJob(null);
        setErrors({});
        setFormData({
            title: '',
            description: '',
            skills: '',
            due_date: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Job title is required';
        if (!formData.description.trim()) newErrors.description = 'Job description is required';
        if (!formData.skills.trim()) newErrors.skills = 'Skills are required';
        if (!formData.due_date) newErrors.due_date = 'Due date is required';
        if (formData.due_date && new Date(formData.due_date) <= new Date()) {
            newErrors.due_date = 'Due date must be in the future';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsLoading(true);
            const jobPayload = {
                title: formData.title,
                description: formData.description,
                skills: formData.skills,
                due_date: formData.due_date
            };

            try {
                const url = editingJob ? `${API_BASE}/jobs/${editingJob.id}/` : `${API_BASE}/jobs/`;
                const method = editingJob ? 'PUT' : 'POST';

                const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(jobPayload)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`API error: ${response.status} - ${errorText}`);
                }

                const savedJob = await response.json();
                const formattedJob = {
                    ...savedJob,
                    skills: Array.isArray(savedJob.skills)
                        ? savedJob.skills
                        : typeof savedJob.skills === 'string'
                            ? savedJob.skills.split(',').map(skill => skill.trim())
                            : []
                };

                if (editingJob) {
                    setJobs(prev => prev.map(job => job.id === editingJob.id ? formattedJob : job));
                } else {
                    setJobs(prev => [formattedJob, ...prev]);
                }

                closeJobForm();
            } catch (error) {
                console.error('Error submitting job:', error);
                alert(`Failed to submit job: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleEdit = (job) => {
        setEditingJob(job);
        setFormData({
            title: job.title,
            description: job.description,
            skills: Array.isArray(job.skills) ? job.skills.join(', ') : job.skills,
            due_date: job.due_date
        });
        setShowJobForm(true);
    };

    const handleDelete = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job posting?')) {
            try {
                await fetch(`${API_BASE}/jobs/${jobId}/`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setJobs(prev => prev.filter(job => job.id !== jobId));
            } catch (error) {
                console.error('Failed to delete job:', error);
            }
        }
    };

    const filteredJobs = jobs.filter(job => {
        const jobTitle = job.title?.toLowerCase() || '';
        const jobSkills = Array.isArray(job.skills)
            ? job.skills.join(', ').toLowerCase()
            : (job.skills || '').toLowerCase();

        const matchesSearch = jobTitle.includes(searchTerm.toLowerCase()) ||
                              jobSkills.includes(searchTerm.toLowerCase());

        return matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-2xl font-bold mb-4">Recruiter Dashboard</h1>
            <button
                onClick={() => setShowJobForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
            >
                <Plus className="inline w-4 h-4 mr-1" /> Post Job
            </button>

            {showJobForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6">
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Skills (comma-separated)</label>
                        <input
                            type="text"
                            name="skills"
                            value={formData.skills}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                        />
                        {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Due Date</label>
                        <input
                            type="date"
                            name="due_date"
                            value={formData.due_date}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                        />
                        {errors.due_date && <p className="text-red-500 text-sm mt-1">{errors.due_date}</p>}
                    </div>

                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={closeJobForm} className="px-4 py-2 bg-gray-200 rounded">
                            Cancel
                        </button>
                        <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded">
                            {isLoading ? 'Submitting...' : (editingJob ? 'Update Job' : 'Post Job')}
                        </button>
                    </div>
                </form>
            )}

            <div className="grid gap-4">
                {filteredJobs.map((job) => (
                    <div key={job.id} className="p-4 bg-white rounded shadow">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <p>{job.description}</p>
                        <p className="text-sm text-gray-500">
                            Skills: {job.skills
                                ? Array.isArray(job.skills)
                                    ? job.skills.join(', ')
                                    : job.skills
                                : 'N/A'}
                        </p>
                        <p className="text-sm text-gray-500">Due: {job.due_date || 'N/A'}</p>
                        <div className="flex gap-4 mt-2">
                            <button onClick={() => handleEdit(job)} className="text-blue-600 flex items-center gap-1">
                                <Edit className="w-4 h-4" /> Edit
                            </button>
                            <button onClick={() => handleDelete(job.id)} className="text-red-600 flex items-center gap-1">
                                <Trash2 className="w-4 h-4" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
