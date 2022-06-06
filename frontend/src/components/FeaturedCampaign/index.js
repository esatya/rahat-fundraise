import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import CampaignCard from '../common/CampaignCard';

const CauseSection = (props) => {
  const [featuredCampaigns, setFeaturedCampaigns] = useState([]);

  useEffect(() => {
    const fetchFeatureCampaigns = async () => {
      try {
        const resData = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/campaign`,
        ).then((res) => res.json());

        setFeaturedCampaigns(resData?.data || []);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchFeatureCampaigns();
  }, []);

  return (
    <div className={`wpo-campaign-area ${props.CmClass}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="wpo-section-title">
              <h2>Our Featured Campaigns</h2>
              <p>
                There are various campaigns going on but these are some major
                campaigns that need your immediate attention.
              </p>
            </div>
          </div>
        </div>
        <div className="wpo-campaign-wrap">
          <div className="row">
            {featuredCampaigns?.slice(0, 3).map((Cause, citem) => (
              <CampaignCard Cause={Cause} citem={citem} key={citem}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CauseSection;
