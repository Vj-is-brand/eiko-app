import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet} from "react-router-dom";

const ProtectedRoutes = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  return (
    <>
      {!loading && (
          isAuthenticated ? <Outlet/>  : <Navigate  to="/user/login" />
      )}
    </>
  );
};

export default ProtectedRoutes;
