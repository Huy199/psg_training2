import { lazy, Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import ProtectedRoute from "./modules/common/components/ProtectedRoute";
import { ROUTES } from "./configs/routes";
import PublicRoute from "./modules/common/components/PublicRoute";

const Pages = lazy(() => import("./modules/common/pages/Pages"));
const LoginPage = lazy(() => import("./modules/auth/pages/LoginPage"));

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<p>...Loading</p>}>
      <Switch location={location}>
        <ProtectedRoute path={ROUTES.pages} component={Pages} />
        <PublicRoute path="/" component={LoginPage}></PublicRoute>
      </Switch>
    </Suspense>
  );
};
