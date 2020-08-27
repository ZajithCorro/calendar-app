import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function PublicRoute({
	isAuthenticated,
	component: Component,
	...rest
}) {
	return !isAuthenticated ? (
		<Route {...rest} component={Component} />
	) : (
		<Redirect to='/' />
	);
}

PublicRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired,
};
