/* global sessionStorage */

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

// This component was originally a functional component: https://stackoverflow.com/a/43171515/1136887
// This helped to convert it to class based syntax: https://stackoverflow.com/a/43695765/1136887
//
class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: null,
    };
  }

  componentDidMount() {
    this.isAuthed();
  }

  isAuthed() {
    const token = sessionStorage.getItem('jwt');

    axios.post('http://localhost:3000/users/valid_token', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        this.setState({
          authed: true,
        });
      })
      .catch(() => {
        this.setState({
          authed: false,
        });
      });
  }

  render() {
    if (this.state.authed === null) return null;

    const { component: Component, ...rest } = this.props;

    const renderRoute = (props) => {
      if (this.state.authed) {
        return (
          <Component {...props} />
        );
      }

      const to = {
        pathname: '/login',
        state: { from: props.location },
      };

      return (
        <Redirect to={to} />
      );
    };

    return (
      <Route {...rest} render={renderRoute} />
    );
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func,
};

PrivateRoute.defaultProps = {
  component: undefined,
};

export default PrivateRoute;
