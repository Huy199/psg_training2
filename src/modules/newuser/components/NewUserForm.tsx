import { Input, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import "react-toastify/dist/ReactToastify.css";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";

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
  createUser(data: Inputs): void;
}

export default function NewUserForm(props: Props) {
  const { createUser } = props;
  // const [checkSubmit, setCheckSubmit] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const password = useRef({});
  password.current = watch("password");
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const newData: Inputs = {
      ...data,
      membership_id: data.membership_id === "0" ? "" : data.membership_id,
      forceChangePassword: data.forceChangePassword ? 1 : 0,
      taxExempt: data.taxExempt ? 1 : 0,
    };

    createUser(newData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" pb={2} sx={{ color: "#fff" }}>
          Email & Password
        </Typography>
        <div>
          <div className="mb-3 row m-auto">
            <label
              className="form-label col col-3"
              style={{ textAlign: "right", color: "#fff" }}
            >
              First Name*
            </label>

            <div className="col col-3">
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <p style={{ color: "red", marginTop: "8px" }}>
                  Firstname is required
                </p>
              )}
            </div>
          </div>
          <div className="mb-3 row m-auto">
            <label
              style={{ textAlign: "right", color: "#fff" }}
              className="form-label col col-3"
            >
              Last Name*
            </label>
            <div className="col col-3">
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <p style={{ color: "red", marginTop: "8px" }}>
                  Lastname is required
                </p>
              )}
            </div>
          </div>
          <div className="mb-3 row m-auto">
            <label
              style={{ textAlign: "right", color: "#fff" }}
              className="form-label col col-3"
            >
              Email*
            </label>
            <div className="col col-3">
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && errors.email.type === "required" && (
                <p style={{ color: "red", marginTop: "8px" }}>
                  Email is required
                </p>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <p style={{ color: "red", marginTop: "8px" }}>
                  Email is invalid
                </p>
              )}
            </div>
          </div>
          <div className="mb-3 row m-auto">
            <label
              style={{ textAlign: "right", color: "#fff" }}
              className="form-label col col-3"
            >
              Password*
            </label>
            <div className="col col-3">
              <input
                type="password"
                className="form-control"
                aria-describedby="emailHelp"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && errors.password.type === "required" && (
                <p style={{ color: "red", marginTop: "8px" }}>
                  Password is required
                </p>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <p style={{ color: "red", marginTop: "8px" }}>
                  Password minimum 6 characters
                </p>
              )}
            </div>
          </div>
          <div className="mb-3 row m-auto">
            <label
              style={{ textAlign: "right", color: "#fff" }}
              className="form-label col col-3"
            >
              Confirm password*
            </label>
            <div className="col col-3">
              <input
                type="password"
                className="form-control"
                aria-describedby="emailHelp"
                {...register("confirm_password", {
                  required: true,
                  validate: (value) => value === password.current,
                })}
              />
              {errors.confirm_password &&
                errors.confirm_password.type === "required" && (
                  <p style={{ color: "red", marginTop: "8px" }}>
                    This confirm password is required
                  </p>
                )}
              {errors.confirm_password &&
                errors.confirm_password.type === "validate" && (
                  <p style={{ color: "red", marginTop: "8px" }}>
                    This confirm password not match
                  </p>
                )}
            </div>
          </div>
          <div className="mb-3 row m-auto">
            <label
              style={{ textAlign: "right", color: "#fff" }}
              className="form-label col col-3"
            >
              Type*
            </label>
            <div className="col col-3">
              <select
                className="form-select"
                aria-label="Default select example"
                {...register("paymentRailsType")}
              >
                <option value="individual">Individual</option>
                <option value="business">Business</option>
              </select>
            </div>
          </div>
          <div className="mb-3 row m-auto">
            <label
              style={{ textAlign: "right", color: "#fff" }}
              className="form-label col col-3"
            >
              PaymentRails ID
            </label>
          </div>
        </div>

        <Typography variant="h6" pb={2} sx={{ color: "#fff" }}>
          Access Information
        </Typography>
        <div>
          <div className="mb-3 row m-auto">
            <label
              style={{ textAlign: "right", color: "#fff" }}
              className="form-label col col-3"
            >
              Access level*
            </label>
            <div className="col col-3">
              <select
                className="form-select"
                aria-label="Default select example"
                {...register("access_level", { required: true })}
              >
                <option selected value="10">
                  Vendor
                </option>
                <option value="100">Admin</option>
              </select>
            </div>
          </div>
          <div className="mb-3 row m-auto">
            <label
              style={{ textAlign: "right", color: "#fff" }}
              className="form-label col col-3"
            >
              Member Ship*
            </label>
            <div className="col col-3">
              <select
                className="form-select"
                aria-label="Default select example"
                {...register("membership_id", { required: true })}
              >
                <option value="0">Ignore Membership</option>
                <option value="4">General</option>
              </select>
            </div>
          </div>
          <div className="mb-3 row m-auto" style={{ marginLeft: "-34px" }}>
            <label
              style={{ textAlign: "right", color: "#fff" }}
              className="form-label col col-3"
            >
              Require to change password on next log in
            </label>
            <div className="col col-3">
              <input type="checkbox" {...register("forceChangePassword")} />
            </div>
          </div>
        </div>
        <Typography variant="h6" pb={2} sx={{ color: "#fff" }}>
          Tax Infomation
        </Typography>
        <div>
          <div className="mb-3 row m-auto" style={{ marginLeft: "-34px" }}>
            <label
              style={{ textAlign: "right", color: "#fff" }}
              className="form-label col col-3"
            >
              Tax exempt
            </label>
            <div className="col col-3">
              <input type="checkbox" {...register("taxExempt")} />
            </div>
          </div>
        </div>
        <Box
          component="div"
          width={1}
          sx={{
            backgroundColor: "#323259",
            border: "1px solid #1b1b38",
            boxShadow: "0 0 13px 0 #b18aff",
            position: "sticky",
            bottom: "30px",
            padding: "15px 2.25rem",
            margin: "40px 0",
            borderWidth: "0 0 1px 1px",
            zIndex: 2,
          }}
        >
          <Button
            // disabled={checkSubmit}
            type="submit"
            color="warning"
            variant="contained"
          >
            Create Accont
          </Button>
        </Box>
      </form>
    </div>
  );
}
