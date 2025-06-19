import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-blue-900 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">JobSeek</h2>
      <nav className="space-y-4">
        <Link to="/recruiter/dashboard" className="block hover:underline">Dashboard</Link>
        <Link to="/recruiter/post-job" className="block hover:underline">Post Job</Link>
        <Link to="/logout" className="block hover:underline">Logout</Link>
      </nav>
    </div>
  );
}