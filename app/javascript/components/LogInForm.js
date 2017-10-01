/* global sessionStorage */

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class LogInForm extends React.Component {
  constructor() {
    super();
    this.state = {
      redirectToReferrer: false,
      email: 'user@example.com',
      password: 'user',
      loginError: null,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();

    axios.post('http://localhost:3000/users/login', {
      email: this.state.email,
      password: this.state.password,
    })
      .then((response) => {
        if (response.status === 200) {
          sessionStorage.setItem('jwt', response.data.auth_token);
          sessionStorage.setItem('currentUser', response.data.email);
          this.setState({ redirectToReferrer: true });
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.setState({ loginError: 'Invalid username or password' });
        }
      });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div className='flex-container'>
        <div className='row'>
          <h1>Please Login</h1>

          <div className='formErrors'>
            <p>
              {this.state.loginError}
            </p>
          </div>

          <form className='login-form' onSubmit={this.handleLogin}>
            <input
              type='email'
              placeholder='Username'
              value={this.state.email}
              onChange={this.handleEmailChange}
            />

            <input
              type='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />

            <button type='submit'>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

LogInForm.propTypes = {
  location: PropTypes.shape(),
};

LogInForm.defaultProps = {
  location: undefined,
};

export default LogInForm;
