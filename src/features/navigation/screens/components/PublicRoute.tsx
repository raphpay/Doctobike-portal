import useAuth from "@/features/auth/hooks/useAuth";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return !user ? (
    <Outlet />
  ) : (
    <Navigate to={NavigationRoutes.DASHBOARD} replace />
  );
}
