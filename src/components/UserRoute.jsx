import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UserRoute = ({ children }) => {
  const { isAuthenticated, isUser, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to admin if user is admin
  if (!isUser()) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default UserRoute;
