import React from 'react'
import {Link} from  'react-router-dom'
import Projects from '../../api/projects'

import Events from '../../api/event'

const EventSidebar = (props) => {

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
                        {Events.slice(0,3).map((event, eitem) => (
                            <div className="post" key={eitem}>
                                <div className="img-holder">
                                    <img src={event.eImg} alt=""/>
                                </div>
                                <div className="details">
                                    <h4><Link onClick={ClickHandler} to={`/event-single/${event.id}`}>{event.eTitle}</Link></h4>
                                    <span className="date">{event.date}</span>
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
                        {Projects.slice(0,6).map((project, pitem)=>(
                            <li className="grid" key={pitem}>
                                <div className="img-holder">
                                    <Link onClick={ClickHandler} to={`/project-single/${project.id}`}>
                                        <img src={project.projectImg} alt=""/>
                                    </Link>
                                </div>
                            </li>
                        ))}
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

export default EventSidebar;