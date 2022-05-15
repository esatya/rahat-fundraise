import React, { Fragment } from "react";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import Logo from "../../images/logo.png";
import UserCampaigns from "../../components/UserCampaigns";

const UserCampaignsPage = () => {
  return (
    <Fragment>
      <Navbar Logo={Logo} />
      <PageTitle pageTitle={"My Fundraiser"} pagesub={"My Fundraiser"} />
      <UserCampaigns evCLass={"section-padding"} />
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default UserCampaignsPage;
