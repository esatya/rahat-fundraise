import { toast } from 'react-toastify';
import React, { Fragment, useContext, useEffect, useState } from 'react';

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
                {campaign?.creator?.id === user?.data?.id && (
                  <Link to={`/fundraise/${id}/edit`} className="theme-btn mb-4">
                    Edit
                  </Link>
                )}
                <div className="wpo-case-details-img d-flex justify-content-center">
                  {campaign?.image && (
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}${campaign?.image}`}
                      alt=""
                      style={{
                        maxHeight: 400,
                        objectFit: 'none',
                        width: 'auto',
                        maxWidth: '100%',
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
