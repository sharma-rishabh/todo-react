import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

export const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};