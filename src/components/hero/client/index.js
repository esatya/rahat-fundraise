import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import client1 from '../../../images/slider/client1.png'
import client2 from '../../../images/slider/client2.png'
import client3 from '../../../images/slider/client3.png'
import client4 from '../../../images/slider/client4.png'


class Clients extends Component {
    render() {
        var settings = {
            dots: false,
            arrows: false,
            speed: 1000,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            responsive: [
                {
                    breakpoint: 1500,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <div className="wpo-happy-client-img">
                <ul className="wpo-happy-client-slide">
                    <Slider {...settings}>
                        <li><img src={client1} alt=""/></li>
                        <li><img src={client2} alt=""/></li>
                        <li><img src={client3} alt=""/></li>
                        <li><img src={client4} alt=""/></li>
                        <li><img src={client2} alt=""/></li>
                        <li><img src={client1} alt=""/></li>
                        <li><img src={client3} alt=""/></li>
                    </Slider>
                </ul>
            </div>
        );
    }
}

export default Clients;