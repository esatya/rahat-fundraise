import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ routeElement, path }) => {
  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      toast.info('Please login first.');
    }
  }, []);
  return sessionStorage.getItem('token') ? (
    <Route path={path} component={routeElement} />
  ) : (
    <Redirect to="/" />
  );
};

export default ProtectedRoute;
