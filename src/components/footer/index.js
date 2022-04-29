import React from 'react'
import {Link}  from 'react-router-dom'

const Footer = (props) =>{

    const ClickHandler = () =>{
        window.scrollTo(10, 0);
     }

  return(
    <footer className="wpo-site-footer">
        <div className="wpo-upper-footer">
            <div className="container">
                <div className="row">
                    <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                        <div className="widget about-widget">
                            <div className="logo widget-title">
                                <img src={'https://assets.rumsan.com/rumsan-group/rumsan-footer-white-logo.png'} alt="Rahat Logo" style={{width:'250px'}}/>
                            </div>
                            <p>Welcome and open yourself to your truest love this year with us! With the Release Process</p>
                            <ul>
                                <li>
                                    <Link to="/">
                                        <i className="ti-facebook"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        <i className="ti-twitter-alt"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        <i className="ti-instagram"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        <i className="ti-google"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                        <div className="widget link-widget">
                            <div className="widget-title">
                                <h3>Navigation </h3>
                            </div>
                            <ul>
                                <li><Link onClick={ClickHandler} to="/#">Home</Link></li>
                                <li><Link onClick={ClickHandler} to="/#">Fundraiser</Link></li>
                                <li><Link onClick={ClickHandler} to="/#">Donate</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                        <div className="widget link-widget">
                            <div className="widget-title">
                                <h3>Resources </h3>
                            </div>
                            <ul>
                                <li><Link onClick={ClickHandler} to="https://rahat.io/">Rahat Website</Link></li>
                                <li><Link onClick={ClickHandler} to="https://docs.rahat.io/">Documentation</Link></li>
                                <li><Link onClick={ClickHandler} to="https://github.com/esatya">GitHub</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                        <div className="widget wpo-service-link-widget">
                            <div className="widget-title">
                                <h3>Contact </h3>
                            </div>
                            <div className="contact-ft">
                                <ul>
                                    <li><i className="fi flaticon-location"></i>Sanepa-02 Lalitpur, Nepal</li>
                                    <li><i className="fi flaticon-phone-call"></i>+977 9801109713</li>
                                    <li><i className="fi flaticon-mail"></i>team@rahat.io</li>
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
                        <p className="copyright"> Copyright &copy; 2022 Rahat. A part of <Link href="https://rumsan.com/">Rumsan Company</Link>. Designed by <Link href='https://tech.rumsan.com/'>Rumsan</Link>.</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
} 

export default Footer;