import React, { useContext, useEffect } from 'react';
import { useHistory, Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserContext from '../../context/user-context';

const ProtectedRoute = ({ routeElement, path }) => {
  const { user } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    if (!user?.isLoggedIn) {
      toast.info('Please login first.');
      history.push('/');
    }
  }, [user?.isLoggedIn]);
  return <Route path={path} component={routeElement} />;
};

export default ProtectedRoute;
