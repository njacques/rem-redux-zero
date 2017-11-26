import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'redux-zero/react';

import actions from '../actions';

const mapToProps = ({ loginError }) => ({ loginError });

class LogInForm extends React.Component {
  constructor() {
    super();
    this.state = {
      redirectToReferrer: false,
      email: 'user@example.com',
      password: 'user',
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/events' } };
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
              {this.props.loginError}
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
  loginError: PropTypes.string,
};

LogInForm.defaultProps = {
  location: undefined,
  loginError: null,
};

export default connect(mapToProps, actions)(LogInForm);
