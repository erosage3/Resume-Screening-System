import { JobsProvider } from '../contexts/JobsProvider';
import RecruiterDashboardContent from '../components/recruiter/RecruiterDashboardContent';
import RecruiterHeader from '../components/recruiter/RecruiterHeader';

const RecruiterDashboard = () => (
    <JobsProvider>
        <div className="flex flex-col min-h-screen">
            <RecruiterHeader />
            <main className="flex-1 bg-gray-50">
                <RecruiterDashboardContent />
            </main>
        </div>
    </JobsProvider>
);

export default RecruiterDashboard;