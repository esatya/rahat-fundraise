import { toast } from 'react-toastify';
import React, { useEffect } from 'react';
import CampaignCard from '../common/CampaignCard';

const EventSection = (props) => {
  const [campaigns, setCampaigns] = React.useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const resData = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/campaign`,
        ).then((res) => res.json());

        setCampaigns(resData.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div className={`wpo-campaign-area section-padding-2 ${props.CmClass}`}>
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
            {campaigns.map((Cause, citem) => (
              <CampaignCard Cause={Cause} citem={citem}  key={citem}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSection;
