import { Navigate } from "react-router-dom";
import { SITE_URI } from "./Navbar";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = sessionStorage.getItem("userToken");

  return isAuthenticated ? element : <Navigate to={`${SITE_URI}/login`} replace />;
};

export default ProtectedRoute;
