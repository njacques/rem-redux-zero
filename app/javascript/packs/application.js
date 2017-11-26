/* global document */

import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';

import history from '../customHistory';
import App from '../components/App';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Router history={history}>
      <App />
    </Router>
    , document.querySelector('#root'));
});
