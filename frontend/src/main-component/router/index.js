import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "../HomePage";
import EventPage from "../EventPage";
import ProjectPage from "../ProjectPage";
import ProfilePage from "../ProfilePage";
import LoginPage from "../LoginPage";
import SignUpPage from "../SignUpPage";
import FundraiseRegisterPage from "../FundraiseRegister";
import SettingSection from "../SettingsPage";
import ErrorPage from "../ErrorPage";
import OtpPage from "../OtpPage";
import UserCampaignsPage from "../UserCampaignsPage";
import EditFundraise from "../EditFundraise/EditFundraise";

const AllRoute = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/fundraise/:id/edit" component={EditFundraise} />
          <Route path="/fundraise/:id" component={ProjectPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/account/settings" component={SettingSection} />
          <Route path="/fundraise" component={EventPage} />
          <Route path="/myfundraise" component={UserCampaignsPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/campaign/register" component={FundraiseRegisterPage} />
          <Route path="/404" component={ErrorPage} />
          <Route path="/otp" component={OtpPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default AllRoute;
