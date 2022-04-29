import React from 'react'
import {Link} from  'react-router-dom'
import ins1 from '../../images/instragram/1.jpg'
import ins2 from '../../images/instragram/2.jpg'
import ins3 from '../../images/instragram/3.jpg'
import ins4 from '../../images/instragram/4.jpg'
import ins5 from '../../images/instragram/5.jpg'
import ins6 from '../../images/instragram/6.jpg'

import Causes from '../../api/cause'

const CauseSidebar = (props) => {

    const SubmitHandler = (e) => {
        e.preventDefault()
    }

    const ClickHandler = () =>{
        window.scrollTo(10, 0);
     }

    return (
        <div className="col col-lg-4 col-12">
            <div className="blog-sidebar">
                <div className="widget search-widget">
                    <form onSubmit={SubmitHandler}>
                        <div>
                            <input type="text" className="form-control" placeholder="Search Post.."/>
                            <button type="submit"><i className="ti-search"></i></button>
                        </div>
                    </form>
                </div>
                <div className="widget recent-post-widget">
                    <h3>Related Posts</h3>
                    <div className="posts">
                        {Causes.slice(0,4).map((Cause, citem) => (
                            <div className="post" key={citem}>
                                <div className="img-holder">
                                    <img src={Cause.cImg} alt=""/>
                                </div>
                                <div className="details">
                                    <h4><Link onClick={ClickHandler} to={`/cause-single/${Cause.id}`}>{Cause.cTitle}</Link></h4>
                                    <span className="date">19 Jun 2021 </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="widget wpo-instagram-widget">
                    <div className="widget-title">
                        <h3>Projects</h3>
                    </div>
                    <ul className="d-flex">
                        <li><img src={ins1} alt=""/></li>
                        <li><img src={ins2} alt=""/></li>
                        <li><img src={ins3} alt=""/></li>
                        <li><img src={ins4} alt=""/></li>
                        <li><img src={ins5} alt=""/></li>
                        <li><img src={ins6} alt=""/></li>
                    </ul>
                </div>
                <div className="widget tag-widget">
                    <h3>Tags</h3>
                    <ul>
                        <li><Link onClick={ClickHandler} to="/cause-single/1">Charity</Link></li>
                        <li><Link onClick={ClickHandler} to="/cause-single/1">Planning</Link></li>
                        <li><Link onClick={ClickHandler} to="/cause-single/1">Helping</Link></li>
                        <li><Link onClick={ClickHandler} to="/cause-single/1">Education</Link></li>
                        <li><Link onClick={ClickHandler} to="/cause-single/1">Medical</Link></li>
                        <li><Link onClick={ClickHandler} to="/cause-single/1">Wildlife</Link></li>
                        <li><Link onClick={ClickHandler} to="/cause-single/1">Donation</Link></li>
                        <li><Link onClick={ClickHandler} to="/cause-single/1">Help</Link></li>
                        <li><Link onClick={ClickHandler} to="/cause-single/1">World Pandamic</Link></li>
                    </ul>
                </div>
                <div className="wpo-contact-widget widget">
                    <h2>How We Can <br/> Help You!</h2>
                    <p>labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                    <Link to="/contact">Contact Us</Link>
            </div>
            </div>
        </div> 

    )
}

export default CauseSidebar;