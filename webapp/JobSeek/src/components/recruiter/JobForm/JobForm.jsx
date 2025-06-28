import { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../../common/Button';
import JobFormField from './JobFormField';

const JobFormModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
    const [formData, setFormData] = useState(initialData || {
        title: '',
        company: '',
        location: '',
        type: 'Full-time',
        description: '',
        salary: '',
        due_date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {initialData ? 'Edit Job' : 'Create New Job'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                            required
                        >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>
                    <JobFormField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        type="textarea"
                        required
                    />
                    <JobFormField
                        label="Salary Range"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="$50,000 - $70,000"
                        required
                    />
                    <JobFormField
                        label="Application Deadline"
                        name="due_date"
                        type="date"
                        value={formData.due_date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                    />
                    <div className="flex justify-end gap-4 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            isLoading={isLoading}
                        >
                            {initialData ? 'Update Job' : 'Create Job'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobFormModal;