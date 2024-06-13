import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/redux/store';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const accessToken = localStorage.getItem('accessToken');
  
  return isAuthenticated || accessToken ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
