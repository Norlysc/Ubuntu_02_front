import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { USER_ROUTES } from '@/constants/routes';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthGuard() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate replace to={USER_ROUTES.LOGIN} state={{ from: location }} />
  );
}
