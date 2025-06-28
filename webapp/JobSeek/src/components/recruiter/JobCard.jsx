import PropTypes from 'prop-types';
import { Edit, Trash2, MapPin, DollarSign, Calendar, Briefcase, Building } from 'lucide-react';
import Button from '../common/Button';

const JobCard = ({ job, onDelete }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            {job.type || 'Full-time'}
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-700 mb-2">
                        <Building className="w-4 h-4" />
                        <span>{job.company}</span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Due: {new Date(job.due_date).toLocaleDateString()}
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-2">
                    <Button
                        variant="icon" 
                        onClick={() => {}}
                        aria-label="Edit job"
                    >
                        <Edit className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="icon" 
                        color="red" 
                        onClick={() => onDelete(job.id)}
                        aria-label="Delete job"
                    >
                        <Trash2 className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

JobCard.propTypes = {
    job: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        salary: PropTypes.string.isRequired,
        due_date: PropTypes.string.isRequired
    }).isRequired,
    onDelete: PropTypes.func.isRequired
};

export default JobCard;