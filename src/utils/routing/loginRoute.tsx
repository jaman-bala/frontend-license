import React from 'react';
import { Navigate } from 'react-router-dom';

interface LoginRouteProps {
  component: React.ComponentType<any>;
}

const LoginRoute: React.FC<LoginRouteProps> = ({ component: Component }) => {
  const accessToken = localStorage.getItem('accessToken');

  return accessToken ? <Navigate to="/" /> : <Component />;
};

export default LoginRoute;
