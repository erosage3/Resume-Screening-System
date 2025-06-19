import Sidebar from '../components/Sidebar';

export default function RecruiterDashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome, Recruiter</h1>
        <div className="grid grid-cols-2 gap-6">
          <DashboardCard title="Total Jobs Posted" count={5} />
          <DashboardCard title="Total Applicants" count={34} />
          <DashboardCard title="Pending Reviews" count={12} />
          <DashboardCard title="AI-Shortlisted" count={7} />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, count }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-2xl">{count}</p>
    </div>
  );
}