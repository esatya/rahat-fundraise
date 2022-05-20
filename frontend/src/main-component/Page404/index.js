import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

const Page404 = (props) => {
  return (
    <Grid className="loginWrapper">
      <Grid className="loginForm text-center">
        <div className="fs-5 pb-3">Page Not Found</div>
        <Link to="/">Return Home</Link>
      </Grid>
    </Grid>
  );
};

export default withRouter(Page404);
