// src/routes/PrivateRoutes.tsx
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica si el token existe

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
