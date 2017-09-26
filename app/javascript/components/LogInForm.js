/* global sessionStorage, alert */

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'jchibbard@gmail.com',
      password: 'password',
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
          this.props.loginHandler(response.data.email);
          sessionStorage.setItem('jwt', response.data.auth_token);
          sessionStorage.setItem('currentUser', response.data.email);
          this.props.history.push('/');
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
  history: PropTypes.shape().isRequired,
  loginHandler: PropTypes.func.isRequired,
};

export default LogInForm;
