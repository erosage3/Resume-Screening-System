
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import RecruiterLogin from './pages/RecruiterLogin';

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <RecruiterLogin /> }
], {
//   basename:"/JobSeek-Project"
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;