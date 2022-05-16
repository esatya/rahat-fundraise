import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { Badge } from "react-bootstrap";
import { Form } from "react-bootstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CauseTabs = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const [user, setUser] = React.useState({
    alias: "alias",
    campaigns: [],
    email: "email",
  });

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  console.log("token", sessionStorage.getItem("token"));

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
      <div
        className="row d-flex justify-content-center"
        style={{ height: "150px" }}
      >
        <div className="profile-pic">
          <Form.Group className="my-3 text-center">
            <img
              src="https://assets.rumsan.com/rumsan-group/zoonft-adoption-6.jpg"
              alt=""
              style={{
                objectFit: "cover",
                marginTop: -10,
                marginBottom: 20,
                height: 150,
                width: 150,
                borderRadius: "50%",
              }}
            />
          </Form.Group>
          <div className="text-center" style={{ marginTop: "-25px" }}>
            <h2>{user.name}</h2>
            <Badge
              className="mb-2"
              bg="warning"
              text="dark"
              style={{ cursor: "pointer" }}
            >
              Wallet Address:12334245
            </Badge>
          </div>
          <p className="text-center">Joined Date: {user.createdDate}</p>
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
                          className={classnames({ active: activeTab === "1" })}
                          onClick={() => {
                            toggle("1");
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

export default CauseTabs;
