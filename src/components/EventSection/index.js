import React from 'react'
import {Link} from 'react-router-dom'
import Causes from '../../api/cause'

const EventSection = (props) => {
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
                        git re
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventSection;