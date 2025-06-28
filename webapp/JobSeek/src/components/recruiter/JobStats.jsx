const JobStats = ({ jobs }) => {
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter(job => job.status === 'active').length;
    const closedJobs = totalJobs - activeJobs;

    return (
        <div className="flex gap-4 mt-2">
            <span className="text-sm text-gray-600">
                <span className="font-medium">{totalJobs}</span> Total Jobs
            </span>
            <span className="text-sm text-gray-600">
                <span className="font-medium text-green-600">{activeJobs}</span> Active
            </span>
            <span className="text-sm text-gray-600">
                <span className="font-medium text-gray-600">{closedJobs}</span> Closed
            </span>
        </div>
    );
};

export default JobStats;