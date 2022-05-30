import { toast } from 'react-toastify';
import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import UserContext from '../../context/user-context';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { USER_UPDATE_TYPES } from '../../helper/constants';

const OtpPage = (props) => {
  const [value, setValue] = useState({
    otpNumber: '',
    isLoading: false,
    isOTPSending: false,
  });

  const { updateUser } = useContext(UserContext);

  const handleChange = (e) => {
    setValue({ [e.target.name]: e.target.value });
  };

  const email = props.location?.state?.email;

  const handleOtp = async () => {
    try {
      setValue((previous) => {
        return {
          ...previous,
          isLoading: true,
        };
      });
      const resData = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/otp/verify`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            otpNumber: parseInt(value.otpNumber),
          }),
        },
      ).then((res) => res.json());

      const token = resData.token;

      if (!token) {
        props.history.push('/login');
        throw new Error('Invalid/Expired OTP');
      }
      updateUser(USER_UPDATE_TYPES.LOG_IN, token);

      props.history.push('/');
    } catch (error) {
      toast.error(error.message);
      setValue((previous) => {
        return {
          ...previous,
          isLoading: false,
        };
      });
    }
  };

  const resendOTP = async (e) => {
    try {
      e.preventDefault();
      if (value?.isOTPSending) {
        toast.info('OTP already queued.');
        return;
      }
      setValue((previous) => {
        return {
          ...previous,
          isOTPSending: true,
        };
      });
      const otpResult = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/otp`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: email,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const otpRes = await otpResult.json();

      if (otpRes?.ok) {
        setValue((previous) => {
          return {
            ...previous,
            isOTPSending: false,
          };
        });
        toast.success('OTP has been sent to your email');
      } else {
        throw new Error('Failed to send OTP.');
      }
    } catch (error) {
      toast.error(error?.message);
      setValue((previous) => {
        return {
          ...previous,
          isOTPSending: false,
        };
      });
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
          <Button
            className="cBtnTheme"
            onClick={handleOtp}
            disabled={value?.isLoading}
          >
            Verify
          </Button>
        </Grid>
        <p className="mt-3">
          If you didn't receive the code,{' '}
          <span onClick={resendOTP} className="c-p text-primary">
            resend
          </span>
          .
        </p>
      </Grid>
    </Grid>
  );
};

export default withRouter(OtpPage);
