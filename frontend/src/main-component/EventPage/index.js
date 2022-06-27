import React, { Fragment } from "react";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import Logo from "../../images/logo.png";
import EventSection from "../../components/EventSection";

const EventPage = () => {
  return (
    <Fragment>
      <Navbar Logo={Logo} />
      <PageTitle pageTitle={"Donations"} pagesub={"Donations"} />
      <EventSection evCLass={"section-padding"} />
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default EventPage;
