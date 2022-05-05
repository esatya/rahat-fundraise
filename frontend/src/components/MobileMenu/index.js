import React, { Component } from 'react'
import { Collapse, CardBody, Card } from 'reactstrap';
import { Link } from 'react-router-dom'
import './style.css';

const menus = [
    {
        id: 1,
        title: 'Home',
        link: '/home',
        submenu: [
            {
                id: 11,
                title: 'Home Charity',
                link: '/home'
            },
            {
                id: 12,
                title: 'Home Education',
                link: '/home2'
            },
            {
                id: 13,
                title: 'Home Wildlife',
                link: '/home3'
            },
            {
                id: 14,
                title: 'Home Ocean Polution',
                link: '/home4'
            },
            {
                id: 15,
                title: 'Home World Pandemic',
                link: '/home5'
            },
            {
                id: 16,
                title: 'Home Nature',
                link: '/home6'
            },
            {
                id: 17,
                title: 'Home Nature S2',
                link: '/home7'
            },
        ]
    },

    {
        id: 2,
        title: 'Cause',
        link: '/cause',
        submenu: [
            {
                id: 21,
                title: 'Cause',
                link: '/cause'
            },
            {
                id: 22,
                title: 'Cause Single',
                link: '/cause-single/1'
            }
        ]
    },
    {
        id: 4,
        title: 'Event',
        link: '/event',
        submenu: [
            {
                id: 41,
                title: 'Event',
                link: '/event'
            },
            {
                id: 42,
                title: 'Event S2',
                link: '/event-s2'
            },
            {
                id: 43,
                title: 'Event Single',
                link: '/event-single/1'
            }
        ]
    },

{
    id: 3,
        title: 'Pages',
        link: '/',
        submenu: [
            {
                id: 31,
                title: 'About',
                link: '/about'
            },
            {
                id: 32,
                title: 'Service',
                link: '/service'
            },
            {
                id: 33,
                title: 'Service Single',
                link: '/service-single/1'
            },
            {
                id: 37,
                title: 'Project',
                link: '/project'
            },
            {
                id: 38,
                title: 'Project Single',
                link: '/project-single/1'
            },
            {
                id: 39,
                title: 'Donate',
                link: '/donate'
            },
            {
                id: 391,
                title: 'Volunteer',
                link: '/volunteer'
            },
            {
                id: 392,
                title: 'Testimonial',
                link: '/testimonial'
            },
            {
                id: 34,
                title: '404 Error',
                link: '/404'
            },
            {
                id: 35,
                title: 'Login',
                link: '/login'
            },
            {
                id: 36,
                title: 'Register',
                link: '/register'
            },
        ]
    },
    {
        id: 5,
        title: 'Blog',
        link: '/blog',
        submenu: [
            {
                id: 51,
                title: 'Blog',
                link: '/blog'
            },
            {
                id: 52,
                title: 'Blog Left sidebar',
                link: '/blog-left'
            },
            {
                id: 53,
                title: 'Blog full width',
                link: '/blog-fullwidth'
            },
            {
                id: 54,
                title: 'Blog single',
                link: '/blog-single/1'
            },
            {
                id: 55,
                title: 'Blog single Left sidebar',
                link: '/blog-single-left-sidebar/1'
            },
            {
                id: 56,
                title: 'Blog single Left sidebar',
                link: '/blog-single-fullwidth/1'
            },
        ]
    },
    {
        id: 88,
        title: 'Contact',
        link: '/contact',
    }
    
    
]


export default class MobileMenu extends Component {

    state = {
        isMenuShow: false,
        isOpen: 0,
    }

    menuHandler = () => {
        this.setState({
            isMenuShow: !this.state.isMenuShow
        })
    }

    setIsOpen = id => () => {
        this.setState({
            isOpen: id === this.state.isOpen ? 0 : id
        })
    }

    render() {

        const { isMenuShow, isOpen } = this.state;

        const ClickHandler = () =>{
            window.scrollTo(10, 0);
         }

        return (
            <div>
                <div className={`mobileMenu ${isMenuShow ? 'show' : ''}`}>
                    <div className="menu-close">
                         <div className="clox" onClick={this.menuHandler}><i className="ti-close"></i></div>
                    </div>

                    <ul className="responsivemenu">
                        {menus.map(item => {
                            return (
                                <li key={item.id}>
                                    {item.submenu ? <p onClick={this.setIsOpen(item.id)}>
                                        {item.title}
                                        {item.submenu ? <i className="fa fa-angle-right" aria-hidden="true"></i> : ''}
                                    </p> : <Link onClick={ClickHandler} to={item.link}>{item.title}</Link>}
                                    {item.submenu ?
                                    <Collapse isOpen={item.id === isOpen}>
                                        <Card>
                                            <CardBody>
                                                <ul>
                                                    {item.submenu.map(submenu => (
                                                        <li key={submenu.id}><Link onClick={ClickHandler} className="active" to={submenu.link}>{submenu.title}</Link></li>
                                                    ))}
                                                </ul>
                                            </CardBody>
                                        </Card>
                                    </Collapse>
                                    : ''}
                                </li>
                            )
                        })}
                    </ul>

                </div>

                <div className="showmenu" onClick={this.menuHandler}>
                    <button type="button" className="navbar-toggler open-btn">
                            <span className="icon-bar first-angle"></span>
                            <span className="icon-bar middle-angle"></span>
                            <span className="icon-bar last-angle"></span>
                    </button>
                </div>
            </div>
        )
    }
}
