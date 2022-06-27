import React, { useContext, useEffect, useState } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Badge } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import UserContext from '../../context/user-context';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import CampaignCard from '../common/CampaignCard';

const CauseTabs = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const [user, setUser] = useState({
    alias: '',
    campaigns: [],
    email: '',
  });

  const { user: contextUser, refreshLoggedInUser } = useContext(UserContext);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

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
      toast.warning('Could not fetch profile data.');
    }
  };

  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="profile-pic">
          <Form.Group className="my-3 text-center">
            <img
              src={
                user?.image
                  ? `${process.env.REACT_APP_API_BASE_URL}${user.image}`
                  : 'https://assets.rumsan.com/rumsan-group/zoonft-adoption-6.jpg'
              }
              alt=""
              style={{
                objectFit: 'cover',
                marginTop: -10,
                marginBottom: 20,
                height: 150,
                width: 150,
                borderRadius: '50%',
              }}
            />
          </Form.Group>
          <div className="text-center" style={{ marginTop: '-25px' }}>
            <h2>{user?.name || user?.alias}</h2>
            <Badge
              className="mb-2"
              bg="warning"
              text="dark"
              style={{ cursor: 'pointer' }}
            >
              Wallet Address:12334245
            </Badge>
          </div>
          <p className="text-center mb-0">
            Username: <span className="fw-bold">{user?.alias}</span>
          </p>
          <p className="text-center mb-0">
            Email: <span className="fw-bold">{user?.email}</span>
          </p>
          <p className="text-center mb-0">
            Email Verification:{' '}
            {user?.emailVerified ? (
              <span className="fw-bold text-success">Verfied</span>
            ) : (
              <span className="fw-bold text-warning">Not Verfied</span>
            )}
          </p>

          <p className="text-center">
            Joined Date:{' '}
            <span className="fw-bold">
              {user?.createdDate
                ? dayjs(user?.createdDate).format('MMMM DD, YYYY')
                : ''}
            </span>
          </p>

          <Link
            onClick={ClickHandler}
            to="/account/settings"
            className="theme-btn mx-auto d-flex w-fit-content"
          >
            Edit My Profile
          </Link>
        </div>
      </div>

      <div className="wpo-case-details-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="wpo-case-details-wrap">
                <div>
                  <div className="wpo-case-details-tab">
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === '1' })}
                          onClick={() => {
                            toggle('1');
                          }}
                        >
                          My Fundraiser
                        </NavLink>
                      </NavItem>
                      {/* <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === "2" })}
                          onClick={() => {
                            toggle("2");
                          }}
                        >
                          Donations
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === "3" })}
                          onClick={() => {
                            toggle("3");
                          }}
                        >
                          Comments
                        </NavLink>
                      </NavItem> */}
                    </Nav>
                  </div>
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
              {user.campaigns.map((Cause, citem) => (
                <CampaignCard Cause={Cause} citem={citem} key={citem}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CauseTabs;
