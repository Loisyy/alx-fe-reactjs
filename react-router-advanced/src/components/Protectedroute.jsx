import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute wraps any route that requires authentication.
 * Unauthenticated users are redirected to /login, and the
 * original destination is preserved via location state so the
 * user can be sent there after a successful login.
 */
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;