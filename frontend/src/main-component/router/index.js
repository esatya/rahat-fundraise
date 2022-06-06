import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Homepage from '../HomePage';
import EventPage from '../EventPage';
import ProjectPage from '../ProjectPage';
import ProfilePage from '../ProfilePage';
import LoginPage from '../LoginPage';
import SignUpPage from '../SignUpPage';
import FundraiseRegisterPage from '../FundraiseRegister';
import SettingSection from '../SettingsPage';
import ErrorPage from '../ErrorPage';
import OtpPage from '../OtpPage';
import UserCampaignsPage from '../UserCampaignsPage';
import EditFundraise from '../EditFundraise/EditFundraise';
import ProtectedRoute from '../../components/common/ProtectedRoute';

const AllRoute = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* Public Routes */}
          <Route exact path="/" component={Homepage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/404" component={ErrorPage} />
          <Route path="/otp" component={OtpPage} />
          <ProtectedRoute
            routeElement={FundraiseRegisterPage}
            path="/campaign/register"
          />
          <ProtectedRoute
            routeElement={UserCampaignsPage}
            path="/myfundraise"
          />
          <ProtectedRoute routeElement={ProfilePage} path="/profile" />
          <ProtectedRoute
            routeElement={SettingSection}
            path="/account/settings"
          />
          <ProtectedRoute
            routeElement={EditFundraise}
            path="/fundraise/:id/edit"
          />
          <Route path="/fundraise/:id" component={ProjectPage} />
          <Route path="/fundraise" component={EventPage} />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default AllRoute;
