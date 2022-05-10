import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import { Badge } from "react-bootstrap";
import { Form } from "react-bootstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Causes from "../../api/cause";

const CauseTabs = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
  };

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const { id } = useParams();

  return (
    <>
      <div
        className="row d-flex justify-content-center"
        style={{ height: "200px" }}
      >
        <div className="profile-pic">
          <Form.Group className="my-3 text-center">
            <img
              src="https://assets.rumsan.com/rumsan-group/zoonft-adoption-6.jpg"
              alt=""
              style={{
                objectFit: "cover",
                marginTop: -15,
                marginBottom: 20,
                height: 150,
                width: 150,
                borderRadius: "50%",
              }}
            />
          </Form.Group>
          <div className="text-center" style={{ marginTop: "-25px" }}>
            <h2>Test Network</h2>
            <Badge
              className="mb-2"
              bg="warning"
              text="dark"
              style={{ cursor: "pointer" }}
            >
              Wallet Address:12334245
            </Badge>
          </div>
          <p className="text-center">Joined Date: Aug 2022</p>
        </div>
      </div>

      <div className="wpo-case-details-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="wpo-case-details-wrap">
                <div className="wpo-case-details-img">
                  <img src="" alt="" />
                </div>
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
              {Causes.slice(0, 3).map((Cause, citem) => (
                <div className="col-lg-4 col-md-6 col-12" key={citem}>
                  <div className="wpo-campaign-single">
                    <div className="wpo-campaign-item">
                      <div className="wpo-campaign-img">
                        <img src={Cause.cImg} alt="" />
                        <span className="thumb">{Cause.thumb}</span>
                      </div>
                      <div className="wpo-campaign-content">
                        <div className="wpo-campaign-text-top">
                          <h2>
                            <Link
                              onClick={ClickHandler}
                              to={`/cause-single/${Cause.id}`}
                            >
                              {Cause.cTitle}
                            </Link>
                          </h2>
                          <div className="progress-section">
                            <div className="process">
                              <div className="progress">
                                <div
                                  className="progress-bar"
                                  style={{ width: `${Cause.process}%` }}
                                >
                                  <div className="progress-value">
                                    <span>{Cause.process}</span>%
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <ul>
                            <li>
                              <span>Goal:</span> ${Cause.Goal}
                            </li>
                            <li>
                              <span>Raised:</span> ${Cause.Raised}
                            </li>
                          </ul>
                          <div className="campaign-btn">
                            <ul>
                              <li>
                                <span>
                                  <img src={Cause.authorImg} alt="" />
                                </span>
                                <span>
                                  <Link
                                    onClick={ClickHandler}
                                    to={`/cause-single/${Cause.id}`}
                                  >
                                    {Cause.authorName}
                                  </Link>
                                </span>
                              </li>
                              <li>
                                <Link
                                  onClick={ClickHandler}
                                  className="e-btn"
                                  to="/donate"
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
