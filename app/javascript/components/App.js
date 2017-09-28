/* global sessionStorage */

import React from 'react';
import axios from 'axios';
import { Switch, BrowserRouter as Router } from 'react-router-dom';

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
      currentUser: null,
    };

    this.loginHandler = this.loginHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  componentDidMount() {
    this.isAuthed();
  }

  loginHandler(email) {
    this.setState({
      authed: true,
      currentUser: email,
    });
  }

  logoutHandler() {
    this.setState({
      authed: false,
      currentUser: null,
    });

    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('currentUser');
  }

  isAuthed() {
    const token = sessionStorage.getItem('jwt');
    const currentUser = sessionStorage.getItem('currentUser');

    axios.post('http://localhost:3000/users/valid_token', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        this.setState({
          authed: true,
          currentUser,
        });
      })
      .catch(() => {
        this.setState({
          authed: false,
          currentUser: null,
        });
      });
  }

  render() {
    if (this.state.authed === null) return null;

    return (
      <Router>
        <div>
          <Switch>
            <PropsRoute
              path='/login'
              component={LogInForm}
              loginHandler={this.loginHandler}
            />
            <PrivateRoute
              path='/'
              component={Editor}
              authed={this.state.authed}
              currentUser={this.state.currentUser}
              logoutHandler={this.logoutHandler}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
