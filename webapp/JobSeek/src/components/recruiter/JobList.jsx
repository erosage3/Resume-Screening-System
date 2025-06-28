import PropTypes from 'prop-types';
import JobCard from './JobCard';

const JobList = ({ jobs, onEdit, onDelete }) => {
    return (
        <div className="grid gap-6">
            {jobs.map((job) => (
                <JobCard 
                    key={job.id} 
                    job={job} 
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

JobList.propTypes = {
    jobs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        salary: PropTypes.string.isRequired,
        due_date: PropTypes.string.isRequired
    })).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default JobList;