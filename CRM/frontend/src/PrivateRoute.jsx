import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("authToken");

  if (!isAuthenticated) {
    alert("Please login first!"); // optional alert
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
