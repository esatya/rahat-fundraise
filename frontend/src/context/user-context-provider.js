import React, { useState, useEffect } from 'react';
import UserContext from './user-context';
import Cookies from 'universal-cookie';
import { COOKIE_VALUES, USER_UPDATE_TYPES } from '../helper/constants';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: true,
    data: {},
  });

  const cookies = new Cookies();

  useEffect(() => {
    const storedToken = cookies.get(COOKIE_VALUES.USER_TOKEN_COOKIE);
    if (storedToken) {
      fetchUserData(storedToken);
    } else {
      setUser({
        isLoggedIn: false,
        data: {},
      });
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/get-my-profile`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const parsedResponse = await response.json();
      if (!parsedResponse.ok) {
        throw new Error(parsedResponse?.msg);
      }

      setUser({
        isLoggedIn: true,
        data: {
          token: token,
          ...parsedResponse?.data,
        },
      });
    } catch (error) {
      console.log(error);
      toast.info('User Session Expired. Please Login again.');
    }
  };

  const updateUser = (type = 'LOG_IN', token = '') => {
    if (type === USER_UPDATE_TYPES.LOG_IN) {
      cookies.set(COOKIE_VALUES.USER_TOKEN_COOKIE, token, {
        path: '/',
        expires: dayjs().add(30, 'days').toDate(),
      });
      fetchUserData(token);
    } else if (type === USER_UPDATE_TYPES.LOG_OUT) {
      cookies.remove(COOKIE_VALUES.USER_TOKEN_COOKIE);
      setUser({ isLoggedIn: false, data: {} });
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
