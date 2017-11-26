import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavBar = ({ currentUser }) => (
  <header>
    <nav>
      <span>
        Logged in as: {currentUser}.
        <Link to='/logout'>Logout</Link>
      </span>

      <h1>
        <Link to='/events'>IGSN Calendar Editor</Link>
      </h1>
    </nav>
  </header>
);

NavBar.propTypes = {
  currentUser: PropTypes.string.isRequired,
};

export default NavBar;
