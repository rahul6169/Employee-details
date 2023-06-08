import { Navigate } from "react-router-dom";

import { RoutingConstraints } from "./constraints";
import { AppRouting } from ".";

interface PrivateRouteProps {
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to={RoutingConstraints.INDEX} />;
  }
  return <AppRouting />;
};

export { PrivateRoute };
