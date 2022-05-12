import React, { Fragment } from "react";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import Logo from "../../images/logo.png";
import SettingSection from "../../components/SettingSection";

const SettingPage = () => {
  return (
    <Fragment>
      <Navbar Logo={Logo} />
      <PageTitle pageTitle={"Settings Page"} pagesub={"Settings /Account"} />
      <SettingSection evCLass={"section-padding"} />
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default SettingPage;
