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
import TodoScreen from "../features/todo/TodoScreen";
import ClientsScreen from "@/features/clients/screens/ClientsScreen";
import AddClientScreen from "@/features/clients/screens/AddClientScreen";
import ClientScreen from "@/features/clients/screens/ClientScreen";
import RDVsScreen from "@/features/appointments/screens/RDVsScreen";

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
        <Route path={NavigationRoutes.HELP} element={<TodoScreen />} />
        <Route path={NavigationRoutes.ABOUT} element={<TodoScreen />} />
        <Route path={NavigationRoutes.ACCOUNT} element={<TodoScreen />} />
        <Route path={NavigationRoutes.CLIENTS} element={<ClientsScreen />} />
        <Route path={NavigationRoutes.CLIENT} element={<ClientScreen />} />
        <Route
          path={NavigationRoutes.ADD_CLIENT}
          element={<AddClientScreen />}
        />
        <Route path={NavigationRoutes.ADD_BIKE} element={<TodoScreen />} />
        <Route
          path={NavigationRoutes.TECHNICAL_DOCUMENTS}
          element={<TodoScreen />}
        />
        <Route path={NavigationRoutes.RDV} element={<RDVsScreen />} />
        <Route path={NavigationRoutes.CLIENT_RDV} element={<TodoScreen />} />
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
