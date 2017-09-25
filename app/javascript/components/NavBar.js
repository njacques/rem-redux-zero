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
      <header>
        <span>
          Logged in as: {this.props.currentUser}
          <button className='logoutButton' onClick={this.clearToken}>Logout</button>
        </span>
        <h1>IGSN Calendar Editor</h1>
      </header>
    );
  }
}

NavBar.propTypes = {
  logoutHandler: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default NavBar;
