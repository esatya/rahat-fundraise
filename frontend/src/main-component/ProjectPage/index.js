import { toast } from "react-toastify";
import React, { Fragment, useEffect } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import PageTitle from "../../components/pagetitle";
import Scrollbar from "../../components/scrollbar";
import CauseTabs from "./alltab";
import CauseSidebar from "./sidebar";
import Logo from "../../images/logo.png";

const CauseSinglePage = (props) => {
  const [campaign, setCampaign] = React.useState({});

  const id = props.match.params.id;

  const fetchSingleCampaign = async () => {
    try {
      const resData = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/campaign/get-by-id/${id}`
      ).then((res) => res.json());

      setCampaign(resData.data);
    } catch (error) {
      return toast.error(error.message);
    }
  };

  useEffect(() => fetchSingleCampaign(), []);

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
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}${campaign.image}`}
                    alt=""
                  />
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
