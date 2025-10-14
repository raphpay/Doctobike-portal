import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";
import { Navigate, Route, Routes } from "react-router-dom";
// Routes
import PrivateRoute from "@/features/navigation/components/PrivateRoute";
import PublicRoute from "@/features/navigation/components/PublicRoute";
// Auth
import LoginScreen from "@/features/auth/screens/LoginScreen";
import SignUpScreen from "@/features/auth/screens/SignUpScreen";
// Dashboard
import DashboardScreen from "@/features/dashboard/screens/DashboardScreen";

const Navigation: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicRoute />}>
        <Route path={NavigationRoutes.LOGIN} element={<LoginScreen />} />
        <Route path={NavigationRoutes.SIGN_UP} element={<SignUpScreen />} />
      </Route>

      {/* Private routes */}
      <Route element={<PrivateRoute />}>
        <Route
          path={NavigationRoutes.DASHBOARD}
          element={<DashboardScreen />}
        />
      </Route>

      {/* Default redirect */}
      <Route
        path="*"
        element={<Navigate to={NavigationRoutes.LOGIN} replace />}
      />
    </Routes>
  );
};

export default Navigation;
