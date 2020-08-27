import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({
  isAuthenticated,
  component: Component,
  ...rest
}) {
  return isAuthenticated ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to='/login' />
  );
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
