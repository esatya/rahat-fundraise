import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Link, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";

const OtpPage = (props) => {
  const [value, setValue] = useState({
    otpNumber: "",
  });

  const handleChange = (e) => {
    setValue({ [e.target.name]: e.target.value });
  };

  const email = props.location?.state?.email;

  console.log({ props });
  //   console.log({ email });

  const handleOtp = async () => {
    try {
      const resData = await fetch(`http://localhost:8080/api/user/otp/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otpNumber: parseInt(value.otpNumber),
        }),
      }).then((res) => res.json());
    } catch (error) {
      toast.error(error.message);
    }

    // props.history.push("/");
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
