import { lazy, Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import ProtectedRoute from "./modules/common/components/ProtectedRoute";
import { ROUTES } from "./configs/routes";
import PublicRoute from "./modules/common/components/PublicRoute";
import { Box, CircularProgress } from "@material-ui/core";

const HomePage = lazy(() => import("./modules/home/pages/HomePage"));
const LoginPage = lazy(() => import("./modules/auth/pages/LoginPage"));

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<p>...Loading</p>}>
      <Switch location={location}>
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <PublicRoute path="/" component={LoginPage}></PublicRoute>
      </Switch>
    </Suspense>
  );
};
