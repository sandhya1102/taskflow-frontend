import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { user ,loading } = useSelector((store) => store.auth);

if(loading) return <div>Loading...</div>
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;
