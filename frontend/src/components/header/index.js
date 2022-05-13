import React, { Component } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "../../components/MobileMenu";
import "./header.scss";

const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? "active" : "non-active",
      };
    }}
  />
);

export default class Header extends Component {
  state = {
    isSearchShow: false,
    showpop: false,
  };

  closePop = () => {
    this.state.showpop = false;
  };

  searchHandler = () => {
    this.setState({
      isSearchShow: !this.state.isSearchShow,
    });
  };

  toggleDropdown() {
    console.log("===========");
    this.setState({ showpop: !this.state.showpop });
  }
  handleSignOut() {
    localStorage.clear();
    window.location.replace("/");
  }

  render() {
    const ClickHandler = () => {
      window.scrollTo(10, 0);
    };

    return (
      <header id="header" className={this.props.topbarNone}>
        <div className={`wpo-site-header ${this.props.hclass}`}>
          <nav className="navigation navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-lg-3 col-md-3 col-3 d-lg-none dl-block">
                  <div className="mobail-menu">
                    <MobileMenu />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-6">
                  <div className="navbar-header">
                    <Link
                      onClick={ClickHandler}
                      className="navbar-brand"
                      to="/"
                    >
                      <img
                        src={"https://rahat.io/images/logo.png"}
                        alt="rahat logo"
                        style={{ width: "200px" }}
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6 col-md-1 col-1">
                  <div
                    id="navbar"
                    className="collapse navbar-collapse navigation-holder"
                  >
                    <button className="menu-close">
                      <i className="ti-close"></i>
                    </button>
                    <ul className="nav navbar-nav mb-2 mb-lg-0">
                      <li className="menu-item-has-children">
                        <Link onClick={ClickHandler} to="/">
                          Home
                        </Link>
                      </li>
                      <li className="menu-item-has-children">
                        <Link to="/fundraise">Donate</Link>
                      </li>
                      <li className="menu-item-has-children">
                        <Link to="/">Fundraiser</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-2 col-2">
                  <div className="search-toggle-btn">
                    <div
                      className="cart-search-contact"
                      style={{ textAlign: "right" }}
                    >
                      {localStorage.getItem("isLogIn") ? (
                        <div
                          id="de-click-menu-profile"
                          className="de-menu-profile"
                          onClick={() => this.toggleDropdown()}
                          style={{ marginLeft: "10px" }}
                        >
                          <img
                            src="https://assets.rumsan.com/rumsan-group/new-project-1.png"
                            style={{ width: "50px", height: "50px" }}
                            alt=""
                          />

                          {this.state.showpop && (
                            <div className="popshow">
                              <div className="d-name"></div>

                              <ul className="de-submenu-profile">
                                <li>
                                  <NavLink
                                    to="#"
                                    style={{
                                      background: "none",
                                      boxShadow: "none",
                                      padding: "0px",
                                      margin: "0px",
                                    }}
                                  >
                                    <span>
                                      <i className="fa fa-user"></i> My
                                      Fundraiser
                                    </span>
                                  </NavLink>
                                </li>

                                <li>
                                  <NavLink
                                    to="#"
                                    style={{
                                      background: "none",
                                      boxShadow: "none",
                                      padding: "0px",
                                      margin: "0px",
                                    }}
                                  >
                                    <span>
                                      <i
                                        className="fa fa-pencil fa-sm"
                                        style={{ paddingLeft: "7px" }}
                                      ></i>{" "}
                                      Edit Profile
                                    </span>
                                  </NavLink>
                                </li>
                                <li>
                                  <span
                                    onClick={() => {
                                      this.handleSignOut();
                                    }}
                                  >
                                    <i className="fa fa-sign-out"></i> Sign Out
                                  </span>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          onClick={ClickHandler}
                          className="theme-btn"
                          to="/login"
                        >
                          Sign In
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}
