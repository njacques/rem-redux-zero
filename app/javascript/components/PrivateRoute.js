import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
};

const PrivateRoute = ({ component, authed, ...rest }) => (
  <Route
    {...rest}
    render={
      routeProps => (
        authed === true
          ? renderMergedProps(component, routeProps, rest)
          : <Redirect to={{ pathname: '/login', state: { from: routeProps.location } }} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authed: PropTypes.bool.isRequired,
  location: PropTypes.string,
};

PrivateRoute.defaultProps = {
  location: undefined,
};

export default PrivateRoute;
