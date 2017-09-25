/* global sessionStorage, sessionStorage */

import React from 'react';
import PropTypes from 'prop-types';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.clearToken = this.clearToken.bind(this);
  }

  clearToken() {
    sessionStorage.removeItem('jwt');
    this.props.logoutHandler();
  }

  render() {
    return (
      <div>
        <button onClick={this.clearToken}>Logout</button>
      </div>
    );
  }
}

NavBar.propTypes = {
  logoutHandler: PropTypes.func.isRequired,
};

export default NavBar;
