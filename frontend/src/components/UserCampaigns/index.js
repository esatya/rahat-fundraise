import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserContext from '../../context/user-context';
import './style.css';

const UserCampaigns = (props) => {
  const [user, setUser] = useState({});

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const { user: contextUser, refreshLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    if (contextUser?.isLoggedIn && contextUser?.data?.token) {
      fetchUserData();
    }
  }, [contextUser?.data?.token]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/get-my-profile`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${contextUser?.data?.token}`,
          },
        },
      );
      const parsedResponse = await response.json();
      if (!parsedResponse.ok) {
        throw new Error(parsedResponse?.msg);
      }

      setUser(parsedResponse?.data);
      refreshLoggedInUser(parsedResponse?.data);
    } catch (error) {
      console.log(error);
      toast.warning('Could not fetch campaigns.');
    }
  };

  return (
    <>
      <div className={`wpo-campaign-area mt-5  ${props.CmClass}`}>
        <div className="container">
          <div className="row justify-content-end py-4 mb-4">
            <Link to="/campaign/register" className="theme-btn w-fit-content">
              Start a Fundraiser
            </Link>
          </div>
          <div className="wpo-campaign-wrap">
            <div className="row">
              {user.campaigns?.map((Cause, citem) => (
                <div className="col-lg-4 col-md-6 col-12" key={citem}>
                  <div className="wpo-campaign-single">
                    <div className="wpo-campaign-item">
                      <div className="wpo-campaign-img">
                        {Cause.image ? (
                          <img
                            src={`${process.env.REACT_APP_API_BASE_URL}${Cause.image}`}
                            alt=""
                            className="single-campaign-image"
                          />
                        ) : (
                          <div className="single-campaign-image"></div>
                        )}
                        {/* <span className="thumb">{Cause.thumb}</span> */}
                      </div>
                      <div className="wpo-campaign-content">
                        <div className="wpo-campaign-text-top">
                          <h2>
                            <Link
                              onClick={ClickHandler}
                              to={`/fundraise/${Cause.id}`}
                              className="text-break"
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
                                ></div>
                              </div>
                            </div>
                          </div>
                          <ul>
                            <li>
                              <span className="pe-1">Goal: </span> $
                              {Cause.target}
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
                                  <img src={user.image} alt="" />
                                </span>
                                <span>
                                  <Link
                                    onClick={ClickHandler}
                                    to={`/fundraise/${Cause.id}`}
                                    className="text-break"
                                  >
                                    {user.name || user?.alias}
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
