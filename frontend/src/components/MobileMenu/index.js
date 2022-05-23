import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/user-context';
import './style.css';

const menus = [
  {
    id: 1,
    title: 'Home',
    link: '/',
    requiresUser: false,
  },
  {
    id: 2,
    title: 'Donate',
    link: '/fundraise',
    requiresUser: false,
  },
  {
    id: 3,
    title: 'Fundraiser',
    link: '/myfundraise',
    requiresUser: true,
  },
];

const MobileMenu = () => {
  const [state, setState] = useState({
    isMenuShow: false,
  });

  const { user } = useContext(UserContext);

  const menuHandler = () => {
    setState((previous) => {
      return {
        ...previous,
        isMenuShow: !previous?.isMenuShow,
      };
    });
  };

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const { isMenuShow } = state;

  return (
    <div>
      <div className={`mobileMenu ${isMenuShow ? 'show' : ''}`}>
        <div className="menu-close">
          <div className="clox" onClick={menuHandler}>
            <i className="ti-close"></i>
          </div>
        </div>

        <ul className="responsivemenu">
          {menus.map((item) => {
            const link = (
              <li key={item.id}>
                <Link onClick={ClickHandler} to={item.link}>
                  {item.title}
                </Link>
              </li>
            );
            if (item?.requiresUser) {
              if (!user?.isLoggedIn) {
                return null;
              }
            }

            return link;
          })}
        </ul>
      </div>

      <div className="showmenu" onClick={menuHandler}>
        <button type="button" className="navbar-toggler open-btn">
          <span className="icon-bar first-angle"></span>
          <span className="icon-bar middle-angle"></span>
          <span className="icon-bar last-angle"></span>
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
