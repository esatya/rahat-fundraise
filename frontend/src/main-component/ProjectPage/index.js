import React, { Fragment, useEffect } from "react";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle";
import Scrollbar from "../../components/scrollbar";
import Causes from "../../api/cause";
import CauseTabs from "./alltab";
import CauseSidebar from "./sidebar";
import Logo from "../../images/logo.png";
import Footer from "../../components/footer";
import { toast } from "react-toastify";

const CauseSinglePage = (props) => {
  const [campaign, setCampaign] = React.useState({});

  const id = props.match.params.id;

  console.log({ id });

  useEffect(async () => {
    try {
      const resData = await fetch(
        `http://localhost:8080/api/campaign/get-by-id/${id}`
      ).then((res) => res.json());

      console.log({ resData });

      setCampaign(resData.data);
    } catch (error) {
      return toast.error(error.message);
    }
  }, []);

  return (
    <Fragment>
      <Navbar Logo={Logo} />
      <PageTitle pageTitle={campaign.title} pagesub={"Case Single"} />
      <div className="wpo-case-details-area section-padding">
        <div className="container">
          <div className="row">
            <div className="col col-lg-8">
              <div className="wpo-case-details-wrap">
                <div className="wpo-case-details-img">
                  <img src={Causes[0].cImgSingle} alt="" />
                </div>
                <CauseTabs campaign={campaign} />
              </div>
            </div>
            <CauseSidebar />
          </div>
        </div>
      </div>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default CauseSinglePage;
