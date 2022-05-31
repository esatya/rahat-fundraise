import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/user-context';

const Footer = (props) => {
  const { user } = useContext(UserContext);
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <footer className="wpo-site-footer">
      <div className="wpo-upper-footer">
        <div className="container">
          <div className="row">
            <div className="col col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="widget about-widget">
                <div className="logo widget-title">
                  <img
                    src={
                      'https://assets.rumsan.com/rumsan-group/rumsan-footer-white-logo.png'
                    }
                    alt="Rahat Logo"
                    style={{ width: '250px' }}
                  />
                </div>
                <p>
                  Rumsan is a blockchain-focused digital innovation company. We
                  envision creating societal impact through frontier
                  technologies. We support and invest in promising ideas and
                  innovators to make a bigger impact.
                </p>

                <div className="company-logo">
                  <a href="https://hamrolifebank.com/" target="_blank">
                      <img src="https://assets.rumsan.com/esatya/hlb-blk-rumsan.png" />
                  </a>
                  <a href="https://askbhunte.com/"  target="_blank"> 
                      <img
                        src="https://assets.rumsan.com/askbhunte/assets/askbhunte-sq.png"
                        alt=""
                      />
                  </a>
                  <a href="https://agriclear.io/"  target="_blank">
                      <img
                        src="https://assets.rumsan.com/esatya/agriclear-sq.png"
                        alt=""
                      />
                  </a>
                  <a href="https://esatya.io/"  target="_blank">
                      <img
                        src="https://assets.rumsan.com/esatya/esatya-square-logo-500x500.png"
                        alt=""
                      />
                  </a>
                  <a href="https://lonetreenepal.com/"  target="_blank">
                      <img
                        src="https://assets.rumsan.com/rumsan-test/lonetree-100x100.png"
                        alt=""
                      />
                  </a>
                </div>
              </div>
            </div>
            <div className="col col-lg-2 col-md-6 col-sm-12 col-12">
              <div className="widget link-widget">
                <div className="widget-title">
                  <h3>Navigation </h3>
                </div>
                <ul>
                  <li>
                    <Link onClick={ClickHandler} to="/">
                      Home
                    </Link>
                  </li>
                  {user?.isLoggedIn && (
                    <li>
                      <Link onClick={ClickHandler} to="/fundraise">
                        Fundraiser
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link onClick={ClickHandler} to="/fundraise">
                      Donate
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col col-lg-2 col-md-6 col-sm-12 col-12">
              <div className="widget link-widget">
                <div className="widget-title">
                  <h3>Resources </h3>
                </div>
                <ul>
                  <li>
                    <a href="https://rahat.io/" target="_blank">
                      Rahat Website
                    </a>
                  </li>
                  <li>
                    <a href="https://docs.rahat.io/" target="_blank">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/esatya" target="_blank">
                      {' '}
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="widget wpo-service-link-widget">
                <div className="widget-title">
                  <h3>Contact </h3>
                </div>
                <div className="contact-ft">
                  <ul>
                    <li>
                      <i className="fi flaticon-location"></i>Sanepa-02
                      Lalitpur, Nepal
                    </li>
                    <li>
                      <i className="fi flaticon-phone-call"></i>+977 9801109713
                    </li>
                    <li>
                      <i className="fi flaticon-mail"></i>team@rahat.io
                    </li>
                  </ul>
                </div>
                <div className="widget about-widget">
                  <ul>
                    <li>
                      <Link to="https://www.linkedin.com/company/esatya/">
                        <i className="ti-linkedin"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="https://twitter.com/rahataid">
                        <i className="ti-twitter-alt"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="https://discord.com/invite/yxefF8pwxv">
                        <i className="ti-themify-favicon"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wpo-lower-footer">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <p className="copyright">
                Copyright &copy; 2022 Rahat. A part of{' '}
                <a href="https://rumsan.com/">Rumsan Company</a>. Designed by{' '}
                <a href="https://tech.rumsan.com/">Rumsan</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
