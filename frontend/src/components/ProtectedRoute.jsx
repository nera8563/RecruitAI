import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="bg-black min-h-screen text-white mx-40 max-lg:mx-4 max-sm:mx-4">
        <div className="flex max-w-7xl flex-col gap-12 max-sm:mx-4">
          <Navbar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedRoute;
