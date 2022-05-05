import React from "react";
import { Link } from 'react-router-dom'
// import Clients from './client'
import hero1 from '../../images/slider/right-img2.png'
import hero3 from '../../images/slider/right-img.png'




const Hero =() => {
    return (
        <section className="wpo-hero-section-1">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col col-xs-6 col-lg-6">
                        <div className="wpo-hero-section-text">
                            <div className="wpo-hero-title-top">
                                <span>Rahat Crowdfunding Tool</span>
                            </div>
                            <div className="wpo-hero-title">
                                <h2>Uplifting the lives of people in need. </h2>
                            </div>
                            <div className="wpo-hero-subtitle">
                                <p>We help you keep track and stay up-to-date with your crypto and non-crypto donations from all around the world for aid distribution. </p>
                            </div>
                            <div className="btns">
                                <Link to="/login" className="theme-btn">Start a Fundraiser</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="right-vec">
                            <div className="right-items-wrap">
                                <div className="right-item">
                                    <div className="r-img">
                                        <img src={hero1} alt=""/>
                                    </div>
                                </div>
                                <div className="right-item">
                                    <div className="r-img">
                                        <img src={hero3} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}



export default Hero;
