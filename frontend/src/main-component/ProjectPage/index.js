import { toast } from 'react-toastify';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import {
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  ViberShareButton,
  FacebookMessengerShareButton,
  EmailShareButton,
  EmailIcon,
} from 'react-share';
import {
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  ViberIcon,
  WhatsappIcon,
} from 'react-share';

import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';
import PageTitle from '../../components/pagetitle';
import UserContext from '../../context/user-context';
import Scrollbar from '../../components/scrollbar';
import CauseTabs from './alltab';
import CauseSidebar from './sidebar';
import Logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

const CauseSinglePage = (props) => {
  const [campaign, setCampaign] = useState({});
  const [donated, setDonated] = useState(false);

  const id = props.match.params.id;

  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchSingleCampaign();
  }, [id]);

  const fetchSingleCampaign = async () => {
    try {
      const resData = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/campaign/get-by-id/${id}`,
      ).then((res) => res.json());

      setCampaign(resData.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Fragment>
      <Navbar Logo={Logo} />
      <PageTitle pageTitle={campaign?.title} pagesub={campaign?.title} />
      <div className="wpo-case-details-area section-padding">
        <div className="container">
          <div className="row">
            <div className="col col-lg-7">
              <div className="wpo-case-details-wrap">
                <div className="d-flex flex-row align-items-center justify-content-end">
                  <FacebookShareButton url={window.location.href}>
                    <FacebookIcon size={32} round={true} className="mx-1" />
                  </FacebookShareButton>
                  <RedditShareButton url={window.location.href}>
                    <RedditIcon size={32} round={true} className="mx-1" />
                  </RedditShareButton>
                  <TwitterShareButton url={window.location.href}>
                    <TwitterIcon size={32} round={true} className="mx-1" />
                  </TwitterShareButton>
                  <LinkedinShareButton url={window.location.href}>
                    <LinkedinIcon size={32} round={true} className="mx-1" />
                  </LinkedinShareButton>
                  <TelegramShareButton url={window.location.href}>
                    <TelegramIcon size={32} round={true} className="mx-1" />
                  </TelegramShareButton>
                  <ViberShareButton url={window.location.href}>
                    <ViberIcon size={32} round={true} className="mx-1" />
                  </ViberShareButton>
                  <FacebookMessengerShareButton url={window.location.href}>
                    <FacebookMessengerIcon
                      size={32}
                      round={true}
                      className="mx-1"
                    />
                  </FacebookMessengerShareButton>
                  <EmailShareButton url={window.location.href}>
                    <EmailIcon size={32} round={true} className="mx-1" />
                  </EmailShareButton>
                </div>
                {campaign?.creator === user?.data?.id && (
                  <Link to={`/fundraise/${id}/edit`} className="theme-btn mb-4">
                    Edit
                  </Link>
                )}
                <div className="wpo-case-details-img">
                  {campaign?.image && (
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}${campaign?.image}`}
                      alt=""
                      style={{
                        maxHeight: 400,
                        objectFit: 'none',
                        width: 'auto',
                      }}
                    />
                  )}
                </div>
                <CauseTabs campaign={campaign} donated={donated} />
              </div>
            </div>
            <CauseSidebar
              campaign={campaign}
              donated={donated}
              setDonated={setDonated}
              refreshData={fetchSingleCampaign}
            />
          </div>
        </div>
      </div>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default CauseSinglePage;
