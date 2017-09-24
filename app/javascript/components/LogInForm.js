/* global sessionStorage, alert */

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleLogin() {
    axios.post('http://localhost:3000/users/login', {
      email: this.state.email,
      password: this.state.password,
    })
      .then((response) => {
        if (response.status === 200) {
          this.props.handler();
          sessionStorage.setItem('jwt', response.data.auth_token);
          this.props.history.push('/');
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert('Not Authorized');
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

          <form className='login-form' onSubmit={this.validateUser}>
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

            <button type='button' onClick={this.handleLogin}>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

LogInForm.propTypes = {
  history: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};

export default LogInForm;
