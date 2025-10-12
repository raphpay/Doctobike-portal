import type { IToken } from "@/features/auth/model/IToken";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  token: IToken | null;
  redirectPath?: string;
  adminOnly?: boolean;
  isAdmin?: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { token, redirectPath = "/", adminOnly, isAdmin } = props;

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
