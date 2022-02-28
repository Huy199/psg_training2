import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import logo from "../../../logo-420-x-108.png";
import { ILoginParams } from "../../../models/auth";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../redux/reducer";
import { Action } from "redux";
import { fetchThunk } from "../../common/redux/thunk";
import { API_PATHS } from "../../../configs/api";
import { RESPONSE_STATUS_SUCCESS } from "../../../utils/httpResponseCode";
import { setUserInfo } from "../redux/authReducer";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "../../../utils/constants";
import { ROUTES } from "../../../configs/routes";
import { replace } from "connected-react-router";
import { getErrorMessageResponse } from "../../../utils";
const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onLogin = async (values: ILoginParams) => {
    setErrorMessage("");
    setLoading(true);

    const json = await dispatch(
      fetchThunk(API_PATHS.signIn, "post", {
        email: values.email,
        password: values.password,
      })
    );

    setLoading(false);

    if (json?.success === true) {
      dispatch(setUserInfo(json.user));
      Cookies.set(ACCESS_TOKEN_KEY, json.user_cookie, {
        expires: values.rememberMe ? 7 : undefined,
      });
      dispatch(replace(ROUTES.home));
      return;
    }

    setErrorMessage(getErrorMessageResponse(json));
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "412px",
        margin: "25vh auto",
        backgroundColor: "#f3f3f3",
        boxShadow: "0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)",
      }}
    >
      <LoginForm
        onLogin={onLogin}
        loading={loading}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default LoginPage;
