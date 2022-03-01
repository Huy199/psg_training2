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
    <Suspense
      fallback={
        <Box
          sx={{
            width: "100%",
            height: "100%",
            marginLeft: "50%",
            marginTop: "20%",
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      <Switch location={location}>
        <PublicRoute path={ROUTES.home} component={HomePage} />
        <PublicRoute path="/" component={LoginPage}></PublicRoute>
      </Switch>
    </Suspense>
  );
};
