import React, { Fragment } from "react";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import Logo from "../../images/logo.png";
import ProfileSection from "../../components/ProfileSection";

const ProfilePage = () => {
  return (
    <Fragment>
      <Navbar Logo={Logo} />
      <PageTitle pageTitle={"Profile Page"} pagesub={"Profile"} />
      <ProfileSection evCLass={"section-padding"} />
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default ProfilePage;
