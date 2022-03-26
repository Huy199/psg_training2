import { Button } from "@material-ui/core";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { NavLink } from "react-router-dom";
import NewUserForm from "../components/NewUserForm";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { fetchThunk } from "../../common/redux/thunk";
import { API_PATHS } from "../../../configs/api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../redux/reducer";
import { Action } from "redux";
import { useHistory } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { setLoading, setUserDetail } from "../../common/redux/dataReducer";
import { useParams, useLocation } from "react-router-dom";

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
interface Props {
  url: string;
}
export default function NewUser(props: Props) {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  let history = useHistory();
  const { url } = props;
  const { id } = useParams() as { id: string };
  const { user } = useSelector((state: AppState) => ({
    user: state.data.userDetail,
  }));
  console.log("users: ", user);
  const getUserDetail = useCallback(async () => {
    const json = await dispatch(
      fetchThunk(API_PATHS.profileDetail, "post", { id: `${id}` })
    );
    dispatch(setUserDetail(json.data.info));
    console.log("json.data.info: ", json.data.info);
  }, [dispatch]);
  useEffect(() => {
    if (!id) {
      dispatch(setLoading(true));
      setTimeout(() => dispatch(setLoading(false)), 1000);
    }
    getUserDetail();
  }, []);

  const createUser = useCallback(async (data: Inputs) => {
    dispatch(setLoading(true));
    let json;
    if (id) {
      json = await dispatch(
        fetchThunk(API_PATHS.usersEdit, "post", {
          params: [{ ...data, id: `${id}` }],
        })
      );
      if (json?.success === true) {
        dispatch(setLoading(false));
        toast.success("Update user success!");
        getUserDetail();
      }
    } else {
      json = await dispatch(fetchThunk(API_PATHS.createAdmin, "post", data));
      if (json?.success === true) {
        dispatch(setLoading(false));
        history.push("/pages/users/manage-user");
        toast.success("Create user success!");
      }
    }
  }, []);

  return (
    <Box
      component="div"
      sx={{
        overflow: "auto",
        position: "relative",
        maxHeight: "100vh",
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
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              paddingLeft: "0px",
            }}
          />
        </Button>
      </NavLink>
      <Typography variant="h4" pb={2} sx={{ color: "#fff" }}>
        {id ? "Update" : "Create Profile"}
      </Typography>
      <NewUserForm user={user} createUser={createUser} />
    </Box>
  );
}
