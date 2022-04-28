import React from 'react'
import { Link } from 'react-router-dom'
import shape from '../../images/cta-shape.png'



const CtaSection = (props) => {

    return (
        <div className={`wpo-cta-area ${props.ctClass}`}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="wpo-cta-section">
                            <div className="wpo-cta-content">
                                <h2>{props.cTitle}</h2>
                                <Link to="/volunteer">Become A Volunteer</Link>
                            </div>
                            <div className="volunteer-img">
                                <img src={props.vImg} alt=""/>
                            </div>
                            <div className="shape"><img src={shape} alt=""/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CtaSection;