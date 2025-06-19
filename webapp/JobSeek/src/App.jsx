
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import RecruiterLogin from './pages/RecruiterLogin'
import ProtectedRoute from './ProtectedRoute'
import RecruiterDashboard from './pages/RecruiterDashboard'
import PostJob from './pages/JobPostForm'

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register/>},
  { path: "/login", element: <RecruiterLogin /> },
  {
    path: "/recruiter/dashboard",
    element: (
      <ProtectedRoute>
        <RecruiterDashboard/>
      </ProtectedRoute>
    )
  },
  {
    path: "/recruiter/post-job",
    element: (
      <ProtectedRoute>
        <PostJob/>
      </ProtectedRoute>
      
    )
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;