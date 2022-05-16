import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const UserCampaigns = (props) => {
  const [user, setUser] = useState({});

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resData = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/user/get-my-profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        ).then((res) => res.json());

        setUser(resData.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <div className="wpo-case-details-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="wpo-case-details-wrap">
                <div className="wpo-case-details-img">
                  <img src="" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`wpo-campaign-area mt-5  ${props.CmClass}`}>
        <div className="container">
          <div className="wpo-campaign-wrap">
            <div className="row">
              {user.campaigns?.map((Cause, citem) => (
                <div className="col-lg-4 col-md-6 col-12" key={citem}>
                  <div className="wpo-campaign-single">
                    <div className="wpo-campaign-item">
                      <div className="wpo-campaign-img">
                        <img
                          src={`${process.env.REACT_APP_API_BASE_URL}${Cause.image}`}
                          alt=""
                        />
                        {/* <span className="thumb">{Cause.thumb}</span> */}
                      </div>
                      <div className="wpo-campaign-content">
                        <div className="wpo-campaign-text-top">
                          <h2>
                            <Link
                              onClick={ClickHandler}
                              to={`/fundraise/${Cause.id}`}
                            >
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
                                  <img src={user.image} alt="" />
                                </span>
                                <span>
                                  <Link
                                    onClick={ClickHandler}
                                    to={`/fundraise/${Cause.id}`}
                                  >
                                    {user.name}
                                  </Link>
                                </span>
                              </li>
                              <li>
                                <Link
                                  onClick={ClickHandler}
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
    </>
  );
};

export default UserCampaigns;
