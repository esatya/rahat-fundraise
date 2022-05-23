import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

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
              <div className="col-lg-4 col-md-6 col-12" key={citem}>
                <div className="wpo-campaign-single">
                  <div className="wpo-campaign-item">
                    <div className="wpo-campaign-img">
                      <img
                        height={175}
                        src={`${process.env.REACT_APP_API_BASE_URL}${Cause.image}`}
                        alt=""
                      />
                      {/* <span className="thumb">{Cause.thumb}</span> */}
                    </div>
                    <div className="wpo-campaign-content">
                      <div className="wpo-campaign-text-top">
                        <h2>
                          <Link to={`/fundraise/${Cause.id}`}>
                            {Cause.title}
                          </Link>
                        </h2>
                        <div className="progress-section">
                          <div className="process">
                            <div className="progress">
                              <div
                                className="progress-bar"
                                style={{
                                  width: `${
                                    (Cause.amount / Cause.target) * 100
                                  }%`,
                                }}
                              >
                                <div className="progress-value">
                                  <span>
                                    {(
                                      (Cause.amount / Cause.target) *
                                      100
                                    ).toFixed(2)}
                                  </span>
                                  %
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <ul>
                          <li>
                            <span className="pe-1">Goal: </span> ${Cause.target}
                          </li>
                          <li>
                            <span className="pe-1">Raised: </span> $
                            {Cause.amount}
                          </li>
                        </ul>
                        <div className="campaign-btn">
                          <ul>
                            <li>
                              <span>
                                <img
                                  width={45}
                                  height={45}
                                  src={`${process.env.REACT_APP_API_BASE_URL}${Cause.creator.image}`}
                                  alt=""
                                />
                              </span>
                              <span>
                                <Link to={`/fundraise/${Cause.id}`}>
                                  {Cause.creator.name}
                                </Link>
                              </span>
                            </li>
                            <li>
                              <Link
                                className="e-btn"
                                to={`/fundraise/${Cause.id}`}
                              >
                                Donate Now
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSection;
