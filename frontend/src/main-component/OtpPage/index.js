import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Link, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";

const OtpPage = (props) => {
  const handleOtp = () => {
    props.history.push("/");
  };

  return (
    <Grid className="loginWrapper">
      <Grid className="loginForm">
        <h2>Verification</h2>
        <p>
          Enter the verification code that we have just sent you on your email
          address.
        </p>
        <p>
          <input type="text" />
        </p>
        <Grid className="d-flex justify-content-center">
          <Button className="cBtnTheme" onClick={handleOtp}>
            Verify
          </Button>
        </Grid>
        <p className="mt-3">
          If you didn't receive the code, <a href="#">resend</a>.
        </p>
      </Grid>
    </Grid>
  );
};

export default withRouter(OtpPage);
