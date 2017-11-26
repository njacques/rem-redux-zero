import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'redux-zero/react';

// This component was originally a functional component: https://stackoverflow.com/a/43171515/1136887
// This helped to convert it to class based syntax: https://stackoverflow.com/a/43695765/1136887
//
const mapToProps = ({ isAuthed }) => ({ isAuthed });

const PrivateRoute = ({ component: Component, isAuthed, ...rest }) => (
  <Route
    {...rest}
    render={(props) => isAuthed === true
      ? <Component {...props} />
      : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  location: PropTypes.shape().isRequired,
};

export default connect(mapToProps)(PrivateRoute);
