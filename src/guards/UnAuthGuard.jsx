import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ADMIN_ROUTES } from '@/constants/routes';

export default function UnAuthGuard() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate replace to={ADMIN_ROUTES.DASHBOARD} /> : <Outlet />;
}
