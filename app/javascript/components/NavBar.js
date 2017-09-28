import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavBar = ({ currentUser, logoutHandler, activeItemHandler }) => (
  <header>
    <nav>
      <span>
        Logged in as: {currentUser}.
        <Link to='/' onClick={logoutHandler}>Logout</Link>
      </span>
      <h1>
        <Link to='/' onClick={activeItemHandler}>IGSN Calendar Editor</Link>
      </h1>
    </nav>
  </header>
);

NavBar.propTypes = {
  logoutHandler: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired,
  activeItemHandler: PropTypes.func.isRequired,
};

export default NavBar;
