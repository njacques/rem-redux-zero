/* global sessionStorage */

import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <header>
    <nav>
      <span>
        Logged in as: {sessionStorage.getItem('currentUser')}.
        <Link
          to='/login'
          onClick={() => {
            sessionStorage.setItem('jwt', null);
          }}
        >
        Logout</Link>
      </span>

      <h1>
        <Link to='/'>IGSN Calendar Editor</Link>
      </h1>
    </nav>
  </header>
);

export default NavBar;
