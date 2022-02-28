import { lazy, Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import ProtectedRoute from "./modules/common/components/ProtectedRoute";
import { ROUTES } from "./configs/routes";
import PublicRoute from "./modules/common/components/PublicRoute";

const HomePage = lazy(() => import("./modules/home/pages/HomePage"));
const LoginPage = lazy(() => import("./modules/auth/pages/LoginPage"));

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch location={location}>
        <PublicRoute path={ROUTES.home} component={HomePage} />
        <PublicRoute path="/" component={LoginPage}></PublicRoute>
      </Switch>
    </Suspense>
  );
};
