import React from 'react'
import {Link} from 'react-router-dom'
import Causes from '../../api/cause'

const CauseSection = (props) => {
    const ClickHandler = () =>{
        window.scrollTo(10, 0);
     }

    return(

        <div className={`wpo-campaign-area section-padding ${props.CmClass}`}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="wpo-section-title">
                            <span>We Love To Help Poor</span>
                            <h2>Our Featured Campaigns</h2>
                            <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                suffered alteration in some form,</p>
                        </div>
                    </div>
                </div>
                <div className="wpo-campaign-wrap">
                    <div className="row">
                    {Causes.slice(0, 3).map((Cause, citem) => (
                        <div className="col-lg-4 col-md-6 col-12" key={citem}>
                            <div className="wpo-campaign-single">
                                <div className="wpo-campaign-item">
                                    <div className="wpo-campaign-img">
                                        <img src={Cause.cImg} alt=""/>
                                        <span className="thumb">{Cause.thumb}</span>
                                    </div>
                                    <div className="wpo-campaign-content">
                                        <div className="wpo-campaign-text-top">
                                            <h2><Link onClick={ClickHandler} to={`/cause-single/${Cause.id}`}>{Cause.cTitle}</Link></h2>
                                            <div className="progress-section">
                                                <div className="process">
                                                    <div className="progress">
                                                        <div className="progress-bar" style={{width: `${Cause.process}%`}}>
                                                            <div className="progress-value"><span>{Cause.process}</span>%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul>
                                                <li><span>Goal:</span> ${Cause.Goal}</li>
                                                <li><span>Raised:</span> ${Cause.Raised}</li>
                                            </ul>
                                            <div className="campaign-btn">
                                                <ul>
                                                    <li>
                                                        <span><img src={Cause.authorImg} alt=""/></span>
                                                        <span><Link onClick={ClickHandler} to={`/cause-single/${Cause.id}`}>{Cause.authorName}</Link></span>
                                                    </li>
                                                    <li><Link onClick={ClickHandler} className="e-btn" to="/donate">Donate Now</Link></li>
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
    )
}

export default CauseSection;