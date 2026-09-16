import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../Api/apiClient';

interface PublicRouteProps {
  children?: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const authed = isAuthenticated();

  if (authed) {
    // Redirect authenticated user to /admin
    return <Navigate to="/admin" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PublicRoute;
