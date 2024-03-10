import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated && token ? <Outlet /> : <Navigate replace to='/account' />;
};

export default PrivateRoute;
