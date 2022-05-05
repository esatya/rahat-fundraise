import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar'
import Hero from '../../components/hero'
import Cta from '../../components/ctaSection'
import Featured from '../../components/FeaturedCampaign'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import Logo from '../../images/logo.png'


const HomePage =() => {
    return(
        <Fragment>
            <Navbar Logo={Logo}/>
            <Hero/>
            <Cta/>
            <Featured/>
            <Scrollbar/>
            <Footer/>
        </Fragment>
    )
};
export default HomePage;