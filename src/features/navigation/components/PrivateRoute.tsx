import useAuth from "@/features/auth/hooks/useAuth";
import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";
import SimplifiedAppContainer from "@/shared/components/SimplifiedAppContainer";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <SimplifiedAppContainer>Chargement...</SimplifiedAppContainer>;
  }

  return user ? <Outlet /> : <Navigate to={NavigationRoutes.LOGIN} replace />;
}
