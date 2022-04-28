import React, { Fragment } from 'react';
import Navbar from '../../components/Navbar'
import PageTitle from '../../components/pagetitle'
import Scrollbar from '../../components/scrollbar'
import Events from '../../api/event'
import EventTabs from './alltab'
import EventSidebar from './sidebar'
import Logo from '../../images/logo.png'
import Footer from '../../components/footer';



const ProjectPage = (props) => {

    const id = props.match.params.id;

    const eventDetails = Events.find(item => item.id === id)

    return (
        <Fragment>
            <Navbar Logo={Logo} />
            <PageTitle pageTitle={eventDetails.eTitle} pagesub={'Event Single'} />
            <div className="wpo-event-details-area section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-8">
                            <div className="wpo-event-item">
                                <div className="wpo-event-img">
                                    <img src={eventDetails.eImg} alt="" />
                                </div>
                                <div className="wpo-event-details-text">
                                    <h2>{eventDetails.eTitle}</h2>
                                    <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.</p>
                                </div>
                                <EventTabs />
                            </div>
                        </div>
                        <EventSidebar />
                    </div>
                </div>
            </div>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default ProjectPage;
