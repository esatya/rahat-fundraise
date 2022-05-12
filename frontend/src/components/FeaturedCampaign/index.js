import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Causes from "../../api/cause";

const CauseSection = (props) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const [featuredCampaigns, setFeaturedCampaigns] = React.useState([]);

  useEffect(async () => {
    try {
      const resData = await fetch("http://localhost:8080/api/campaign").then(
        (res) => res.json()
      );

      setFeaturedCampaigns(resData.data);
    } catch (error) {
      return toast.error(error.message);
    }
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
            {featuredCampaigns.slice(0, 3).map((Cause, citem) => (
              <div className="col-lg-4 col-md-6 col-12" key={citem}>
                <div className="wpo-campaign-single">
                  <div className="wpo-campaign-item">
                    <div className="wpo-campaign-img">
                      <img src={Causes[0].cImg} alt="" />
                      {/* <span className="thumb">{Cause.thumb}</span> */}
                    </div>
                    <div className="wpo-campaign-content">
                      <div className="wpo-campaign-text-top">
                        <h2>
                          <Link to={`/cause-single/${Cause.id}`}>
                            {Cause.title}
                          </Link>
                        </h2>
                        <div className="progress-section">
                          <div className="process">
                            <div className="progress">
                              <div
                                className="progress-bar"
                                style={{
                                  width: `${(
                                    (Cause.amount / Cause.target) *
                                    100
                                  ).toFixed(2)}%`,
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
                            <span>Goal:</span> ${Cause.target}
                          </li>
                          <li>
                            <span>Raised:</span> ${Cause.amount}
                          </li>
                        </ul>
                        <div className="campaign-btn">
                          <ul>
                            <li>
                              <span>
                                <img
                                  width={45}
                                  height={45}
                                  src={`http://localhost:8080${Cause.creator.image}`}
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

export default CauseSection;
