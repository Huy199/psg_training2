import { Button } from "@material-ui/core";
import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { push } from "connected-react-router";
import { NavLink } from "react-router-dom";
import UserEmail from "../components/UserEmail";
import AccessInfo from "../components/AccessInfo";

export default function NewUser() {
  return (
    <div>
      <NavLink
        to="/home/user-list"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Button
          sx={{
            marginLeft: "-17px",
            marginBottom: "16px",
          }}
        >
          {" "}
          <KeyboardBackspaceIcon
            sx={{
              backgroundColor: "#fff",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              paddingLeft: "0px",
            }}
          />
        </Button>
      </NavLink>
      <h3>Create Profile</h3>
      <UserEmail />
    </div>
  );
}
