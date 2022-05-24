import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SimpleReactValidator from 'simple-react-validator';

const SignUpPage = (props) => {
  const [value, setValue] = useState({
    email: '',
    alias: '',
    isLoading: false,
  });

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    validator.showMessages();
  };

  const [validator] = React.useState(
    new SimpleReactValidator({
      className: 'errorMessage',
    }),
  );

  const submitForm = async (e) => {
    e.preventDefault();
    setValue((previous) => {
      return {
        ...previous,
        isLoading: true,
      };
    });
    try {
      if (validator.allValid()) {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/user/register`,
          {
            method: 'POST',
            body: JSON.stringify({
              email: value.email?.trim(),
              alias: value.alias?.trim(),
            }),

            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const body = await response.json();

        if (body?.ok) {
          setValue({
            email: '',
            alias: '',
          });
          validator.hideMessages();
          toast.success('Registration Complete successfully!');
          props.history.push('/login');
        } else {
          throw new Error(body?.msg);
        }
      } else {
        validator.showMessages();
        toast.error('Please check all your input fields.');
      }
      setValue((previous) => {
        return {
          ...previous,
          isLoading: false,
        };
      });
    } catch (error) {
      setValue((previous) => {
        return {
          ...previous,
          isLoading: false,
        };
      });
      console.log(error);
      toast.error(error?.message || 'Something went wrong');
    }
  };

  return (
    <Grid className="loginWrapper">
      <Grid className="loginForm">
        <h2>Signup</h2>
        <p>Signup your account</p>
        <form onSubmit={submitForm}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder="Username"
                value={value.alias}
                variant="outlined"
                name="alias"
                label="Username"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
              {validator.message('full name', value.alias, 'required|alpha', {
                className: 'text-danger',
              })}
            </Grid>
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
              {validator.message('email', value.email, 'required|email', {
                className: 'text-danger',
              })}
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder="Password"
                value={value.password}
                variant="outlined"
                name="password"
                label="Password"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
              {validator.message("password", value.password, "required")}
            </Grid> */}
            {/* <Grid item xs={12}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder="Confirm Password"
                value={value.password}
                variant="outlined"
                name="confirm_password"
                label="Confirm Password"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
              {validator.message(
                "confirm password",
                value.confirm_password,
                `in:${value.password}`
              )}
            </Grid> */}
            <Grid item xs={12}>
              <Grid className="formFooter">
                <Button
                  fullWidth
                  className="cBtn cBtnLarge cBtnTheme"
                  type="submit"
                >
                  Sign Up
                </Button>
              </Grid>
              {/* <Grid className="loginWithSocial">
                <Button className="facebook">
                  <i className="fa fa-facebook"></i>
                </Button>
                <Button className="twitter">
                  <i className="fa fa-twitter"></i>
                </Button>
                <Button className="linkedin">
                  <i className="fa fa-linkedin"></i>
                </Button>
              </Grid> */}
              <p className="noteHelp">
                Already have an account?{' '}
                <Link to="/login">Return to Sign In</Link>
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

export default withRouter(SignUpPage);
