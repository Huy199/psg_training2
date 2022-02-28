import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { NavLink } from "react-router-dom";
import { Theme, createStyles } from "@material-ui/core/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    color: "inherit",
    textDecoration: "none",
    "&.active > div": {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

export function Sidebar() {
  // const classes = useStyles();

  return (
    <div>
      <List component="nav" aria-label="main mailbox folders">
        <NavLink to="/admin/dashboard">
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>
        <NavLink to="/admin/students">
          <ListItem button>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Student" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
}
