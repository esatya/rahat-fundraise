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
                                <h3>Decentralized and Transparent Crowdfunding Platform</h3>
                                <div className="volunteer-img"></div>
                                <Link to="/volunteer">Donate Here</Link>
                            </div>
                            <div className="shape"><img src={shape} alt="" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CtaSection;