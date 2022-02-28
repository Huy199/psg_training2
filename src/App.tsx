import React, { useCallback, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "./redux/reducer";
import { Action } from "redux";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "./utils/constants";
import { fetchThunk } from "./modules/common/redux/thunk";
import { API_PATHS } from "./configs/api";
import { RESPONSE_STATUS_SUCCESS } from "./utils/httpResponseCode";
import { setUserInfo } from "./modules/auth/redux/authReducer";
import { replace } from "connected-react-router";
import { ROUTES } from "./configs/routes";
import { Routes } from "./Routes";

function App() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { user } = useSelector((state: AppState) => ({
    user: state.profile.user,
  }));

  const getProfile = useCallback(async () => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY);

    if (accessToken && !user) {
      const json = await dispatch(fetchThunk(API_PATHS.userProfile));
      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        if (!json.error) {
          dispatch(setUserInfo({ ...json.data, token: accessToken }));
          dispatch(replace(ROUTES.home));
          return;
        }
      }
    }
  }, [dispatch, user]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);
  return (
    <>
      <Routes />
    </>
  );
}

export default App;
