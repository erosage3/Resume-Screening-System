import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return <Navigate to="\pages\RecruiterLogin.jsx" replace />;
  }

  return children;
};

export default ProtectedRoute;