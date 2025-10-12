import { Route, Routes } from "react-router-dom";

import NavigationRoutes from "@/features/navigation/model/NavigationRoutes";
// Root
// Authentication
import LoginScreen from "@/features/auth/screens/LoginScreen";
import SignUpScreen from "@/features/auth/screens/SignUpScreen";
// Dashboard

const Navigation: React.FC = () => {
  // Component
  return (
    <Routes>
      {/* Authentication */}
      <Route path={NavigationRoutes.LOGIN}>
        <Route index element={<LoginScreen />} />
        <Route path={NavigationRoutes.SIGN_UP} element={<SignUpScreen />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
