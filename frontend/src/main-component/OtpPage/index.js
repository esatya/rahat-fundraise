import { toast } from "react-toastify";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const OtpPage = (props) => {
  const [value, setValue] = useState({
    otpNumber: "",
  });

  const handleChange = (e) => {
    setValue({ [e.target.name]: e.target.value });
  };

  const email = props.location?.state?.email;

  const handleOtp = async () => {
    try {
      const resData = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/otp/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otpNumber: parseInt(value.otpNumber),
          }),
        }
      ).then((res) => res.json());

      const token = resData.token;

      sessionStorage.setItem("token", token);

      if (!token) {
        props.history.push("/login");
        return toast.error("Invalid/Expired OTP");
      }

      props.history.push("/profile");
    } catch (error) {
      toast.error(error.message);
    }
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
          <input type="text" name="otpNumber" onChange={handleChange} />
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
