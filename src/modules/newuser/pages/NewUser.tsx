import { Button } from "@material-ui/core";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { push } from "connected-react-router";
import { NavLink } from "react-router-dom";
import NewUserForm from "../components/NewUserForm";
import AccessInfo from "../components/AccessInfo";
import Loading from "../../common/components/loading/index";
import React, { useRef, useState, useEffect } from "react";
import { fetchThunk } from "../../common/redux/thunk";
import { API_PATHS } from "../../../configs/api";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../redux/reducer";
import { Action } from "redux";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";

interface Inputs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirm_password: string;
  membership_id: string;
  forceChangePassword: number;
  taxExempt: number;
  paymentRailsType: string;
  access_level: number;
}
export default function NewUser() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  const createUser = async (data: Inputs) => {
    setLoading(true);
    const json = await dispatch(
      fetchThunk(API_PATHS.createAdmin, "post", data)
    );
    if (json?.success === true) {
      setLoading(false);
      history.push("/pages/users/manage-user");
      toast.success("Wow so easy!");
    }
  };

  return (
    <Box
      component="div"
      sx={{
        overflow: "auto",
        position: "relative",
        maxHeight: "95vh",
        maxWidth: 1,
        "&::-webkit-scrollbar": {
          height: "10px",
          width: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#b18aff",
          borderRadius: "3px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#13132b",
          borderRadius: "3px",
        },
      }}
      p={4}
    >
      <NavLink
        to="/pages/users/manage-user"
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
      <NewUserForm createUser={createUser} />
      {loading && <Loading isStudent />}
    </Box>
  );
}
