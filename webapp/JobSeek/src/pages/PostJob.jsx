import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';
import JobFormField from '../components/recruiter/JobForm/JobFormField';
import { useJobApi } from '../services/api';

const PostJob = () => {
    const navigate = useNavigate();
    const { createJob } = useJobApi();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const descriptionRef = useRef(null);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        type: 'Full-time',
        description: '',
        salary: '',
        due_date: ''
    });

    // Maintain scroll position while typing
    useEffect(() => {
        if (descriptionRef.current) {
            descriptionRef.current.scrollTop = descriptionRef.current.scrollHeight;
        }
    }, [formData.description]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        // Validate required fields
        for (const key of Object.keys(formData)) {
            if (!formData[key] || (typeof formData[key] === 'string' && formData[key].trim() === '')) {
                setError('Please fill in all required fields.');
                return;
            }
        }
        setIsSubmitting(true);
        try {
            await createJob(formData); // Auth token is handled by useApi
            // Clear form after successful post
            setFormData({
                title: '',
                company: '',
                location: '',
                type: 'Full-time',
                description: '',
                salary: '',
                due_date: ''
            });
            navigate('/recruiter/dashboard');
        } catch (err) {
            setError(err.message || 'Failed to post job. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex items-center mb-8">
                    <Button 
                        variant="icon" 
                        onClick={() => navigate(-1)}
                        className="mr-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                    <JobFormField
                        label="Job Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <JobFormField
                        label="Company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                    />

                    <JobFormField
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Type
                        </label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            ref={descriptionRef}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-md h-64 resize-none overflow-auto"
                            placeholder="Include job details and requirements..."
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                            <JobFormField
                                label="Salary Range"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                placeholder="$50,000 - $70,000"
                            />
                        </div>

                        <div className="relative">
                            <JobFormField
                                label="Application Deadline"
                                name="due_date"
                                type="date"
                                value={formData.due_date}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm font-medium pt-2">{error}</div>
                    )}

                    <div className="flex justify-end gap-4 pt-6">
                        <Button className='p-2'
                            type="button"
                            variant="outline"
                            onClick={() => navigate(-1)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button className='p-2'
                            type="submit"
                            isLoading={isSubmitting}
                            disabled={isSubmitting}
                        >
                            Post Job
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJob;