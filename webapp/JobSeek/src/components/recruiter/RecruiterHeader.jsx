// src/components/common/Header.jsx
import { LogOut, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecruiterHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-50">
  <div 
    className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
    onClick={() => navigate('/')}
  >
    <h1 className="text-xl font-bold text-gray-800">JobSeek</h1>
  </div>
  <div className="flex items-center gap-4">
    <button 
      onClick={() => navigate('/profile')} // Change this to your profile/login route
      className="flex items-center gap-1 text-gray-600 hover:text-blue-600 p-2 rounded-md hover:bg-gray-50"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
        />
      </svg>
      <span className="hidden sm:inline">Profile</span>
    </button>
  </div>
</header>
  );
};

export default RecruiterHeader;