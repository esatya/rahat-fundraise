import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="wpo-hero-section-1">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col col-xs-6 col-lg-6">
            <div className="wpo-hero-section-text">
              <div className="wpo-hero-title-top">
                <span> Rahat Crowdfunding Platform</span>
              </div>
              <div className="wpo-hero-title">
                <h2>Uplifting the lives of people in need. </h2>
              </div>
              <div className="wpo-hero-subtitle">
                <p>
                  We help you keep track and stay up-to-date with your crypto
                  and non-crypto donations from all around the world for aid
                  distribution.
                </p>
              </div>
              <div className="btns">
                <Link
                  to={
                    sessionStorage.getItem('token')
                      ? '/campaign/register'
                      : '/login'
                  }
                  className="theme-btn"
                >
                  Start a Fundraiser
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="right-vec">
              <div className="right-items-wrap">
                <div className="right-item">
                  <div className="r-img">
                    <img
                      src="https://assets.rumsan.com/rumsan-group/crowd-funding-homepage-1.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="right-item">
                  <div className="r-img">
                    <img
                      src="https://assets.rumsan.com/rumsan-group/crowd-funding-homepage-2.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
