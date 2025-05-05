import { Navigate } from "react-router-dom";
import { SITE_URI } from "./Navbar";

const PublicRoute = ({ element }) => {
  const isAuthenticated = sessionStorage.getItem("userToken");

  return isAuthenticated ?  <Navigate to={`${SITE_URI}/login`} /> : element;
};

export default PublicRoute;
