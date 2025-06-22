import { Outlet } from "react-router-dom";
import useUserAuth from "./hooks/useUserAuth";

const ProtectedRoute = () => {
  useUserAuth();

  return <Outlet />;
};

export default ProtectedRoute;
