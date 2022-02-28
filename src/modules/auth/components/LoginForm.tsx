import React from "react";
import { FormattedMessage } from "react-intl";
import { ILoginParams, ILoginValidation } from "../../../models/auth";
import { validateLogin, validLogin } from "../utils";

interface Props {
  onLogin(values: ILoginParams): void;
  loading: boolean;
  errorMessage: string;
}

const LoginForm = (props: Props) => {
  const { onLogin, loading, errorMessage } = props;

  const [formValues, setFormValues] = React.useState<ILoginParams>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [validate, setValidate] = React.useState<ILoginValidation>();

  const onSubmit = () => {
    const validate = validateLogin(formValues);
    setValidate(validate);
    if (!validLogin(validate)) {
      return;
    }

    onLogin(formValues);
  };

  return (
    <form
      style={{ maxWidth: "560px", width: "100%" }}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="row g-3 needs-validation"
    >
      {!!errorMessage && (
        <div
          className="alert alert-danger"
          role="alert"
          style={{ width: "100%" }}
        >
          {errorMessage}
        </div>
      )}
      <div className="col-md-12">
        <h1
          style={{
            color: "#000",
            textAlign: "center",
            fontSize: "1.875rem",
            margin: "0.67em 0",
          }}
        >
          Login
        </h1>
      </div>

      <div className="col-md-12">
        <input
          type="text"
          className="form-control"
          id="inputEmail"
          placeholder="email"
          value={formValues.email}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
        />

        {!!validate?.email && (
          <small className="text-danger">
            <FormattedMessage id={validate?.email} />
          </small>
        )}
      </div>

      <div className="col-md-12">
        <input
          type="password"
          className="form-control"
          id="inputPassword"
          placeholder="password"
          value={formValues.password}
          onChange={(e) =>
            setFormValues({ ...formValues, password: e.target.value })
          }
        />

        {!!validate?.password && (
          <small className="text-danger">
            <FormattedMessage id={validate?.password} />
          </small>
        )}
      </div>
      <div className="col-md-12" style={{ margin: "16px 0" }}>
        <div className="col-md-auto">
          <button
            className="btn btn-success form-control"
            type="submit"
            disabled={loading}
          >
            {loading && (
              <div
                className="spinner-border spinner-border-sm text-light mr-2"
                role="status"
              />
            )}
            <FormattedMessage id="login" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
