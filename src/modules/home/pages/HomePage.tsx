import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
  Container,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { NavLink } from "react-router-dom";
import { Theme, createStyles } from "@material-ui/core/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { ExpandMoreOutlined } from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import { Route, Switch } from "react-router-dom";
import ProductList from "../../productList/pages/ProductList";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@mui/material/AppBar";
import NewUser from "../../newuser/pages/NewUser";
const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          open={open}
          sx={{ height: "100vh", position: "fixed", width: "300px" }}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />

          {/* <Sidebar /> */}
          <List component="nav">
            <NavLink
              to="/home/user-list"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem button>
                <ListItemIcon>
                  <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText primary="User" />
              </ListItem>
            </NavLink>

            <NavLink
              to="/home/product-list"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <ListItem button>
                <ListItemIcon>
                  <ProductionQuantityLimitsIcon />
                </ListItemIcon>
                <ListItemText primary="Product" />
              </ListItem>
            </NavLink>
          </List>
        </Drawer>
        {/* <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,

            padding: "2.25rem 2.25rem 0.75rem",
            marginTop: "65px",
            marginLeft: "240px",
          }}
        >
          <Switch>
            <Route path="/home/user-list">
              <UserList />
            </Route>
            <Route path="/home/new-user">
              <NewUser />
            </Route>
            <Route path="/home/product-list">
              <ProductList />
            </Route>
          </Switch>
        </Box> */}
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default function HomePage() {
  return <DashboardContent />;
}
