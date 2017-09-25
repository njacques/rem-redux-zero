/* global sessionStorage */

import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Editor from './Editor';
import LogInForm from './LogInForm';
import PrivateRoute from './PrivateRoute';
import PropsRoute from './PropsRoute';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: null,
    };

    this.loginHandler = this.loginHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  componentDidMount() {
    this.isAuthed();
  }

  loginHandler() {
    this.setState({
      authed: true,
    });
  }

  logoutHandler() {
    this.setState({
      authed: false,
    });
  }

  isAuthed() {
    const token = sessionStorage.getItem('jwt');

    axios.get('http://localhost:3000/api/v1/events/1.json', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        this.setState({ authed: true });
      })
      .catch(() => {
        this.setState({ authed: false });
      });
  }

  render() {
    if (this.state.authed === null) return null;

    return (
      <Router>
        <div>
          <PropsRoute
            path='/login'
            component={LogInForm}
            loginHandler={this.loginHandler}
          />

          <PrivateRoute
            path='/'
            exact
            component={Editor}
            authed={this.state.authed}
            logoutHandler={this.logoutHandler}
          />
        </div>
      </Router>
    );
  }
}

export default App;
