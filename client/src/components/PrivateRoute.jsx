import { Navigate, Outlet } from "react-router-dom";
import Header from "./header/Header";

const PrivateRoute = ({ isAuthenticated }) => {
  const token = sessionStorage.getItem('accessToken');

  return isAuthenticated && token ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to='/account' />
  );
};

export default PrivateRoute;
