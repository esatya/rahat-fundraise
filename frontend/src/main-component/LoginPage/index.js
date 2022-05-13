import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, withRouter } from "react-router-dom";

import "./style.scss";

const LoginPage = (props) => {
  const [value, setValue] = useState({
    email: "",
    remember: false,
  });

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    validator.showMessages();
  };

  const rememberHandler = () => {
    setValue({ ...value, remember: !value.remember });
  };

  const [validator] = React.useState(
    new SimpleReactValidator({
      className: "errorMessage",
    })
  );

  const submitForm = async (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      try {
        const resData = await fetch("http://localhost:8080/api/user/login", {
          method: "POST",
          body: JSON.stringify({
            email: value.email,
          }),

          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());

        console.log({ resData });

        if (resData.data.email) {
          const email = resData.data.email;

          const otpRes = await fetch("http://localhost:8080/api/user/otp", {
            method: "POST",
            body: JSON.stringify({
              email: email,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => res.json());

          if (otpRes.ok) {
            toast.success("OTP has been sent to your email");
          }
        }
      } catch (error) {
        toast.error(error.message);
      }

      setValue({
        email: "",
        password: "",
        remember: false,
      });
      validator.hideMessages();

      props.history.push("/otp", { email: value.email });
    } else {
      validator.showMessages();
      toast.error("Empty field is not allowed!");
    }
  };
  return (
    <Grid className="loginWrapper">
      <Grid className="loginForm">
        <h2>Sign In</h2>
        <p>Sign in to your account</p>
        <form onSubmit={submitForm}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder="E-mail"
                value={value.email}
                variant="outlined"
                name="email"
                label="E-mail"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
              {validator.message("email", value.email, "required|email")}
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder="Password"
                value={value.password}
                variant="outlined"
                name="password"
                type="password"
                label="Password"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
              {validator.message("password", value.password, "required")}
            </Grid> */}
            <Grid item xs={12}>
              <Grid className="formAction">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={value.remember}
                      onChange={rememberHandler}
                    />
                  }
                  label="Remember Me"
                />
                <Link to="/forgot-password">Forgot Password?</Link>
              </Grid>
              <Grid className="formFooter">
                <Button fullWidth className="cBtnTheme" type="submit">
                  Login
                </Button>
              </Grid>
              {/* <Grid className="loginWithSocial">
                <Button className="google">
                  <i className="fa fa-google mr-4"></i> Sign up using google
                </Button>
              </Grid> */}
              <p className="noteHelp">
                Don't have an account?{" "}
                <Link to="/signup">Create free account</Link>
              </p>
            </Grid>
          </Grid>
        </form>
        <div className="shape-img">
          <i className="fi flaticon-honeycomb"></i>
        </div>
      </Grid>
    </Grid>
  );
};

export default withRouter(LoginPage);
