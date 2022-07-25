import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserContext from '../../context/user-context';
import CampaignCard from '../common/CampaignCard';
import './style.css';

const UserCampaigns = (props) => {
  const [user, setUser] = useState({});

  // const ClickHandler = () => {
  //   window.scrollTo(10, 0);
  // };

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
                <CampaignCard Cause={Cause} citem={citem} key={citem}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCampaigns;
