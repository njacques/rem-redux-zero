import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'jchibbard@gmail.com',
      password: 'password',
      loginError: null,
      fireRedirect: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    console.log('Saving ... not!');

    // Save logic here
    this.setState({ fireRedirect: true });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const { from } = this.props.location.state || '/';
    const { fireRedirect } = this.state;

    return (
      <div>
        <h2>
          {this.props.event.event_date} - {this.props.event.event_type}
        </h2>

        <form onSubmit={this.handleLogin}>
          <div>
            <label htmlFor='event_type'><strong>Type:</strong></label>
            <input type='text' id='event_type' defaultValue={this.props.event.event_type} />
          </div>

          <div>
            <label htmlFor='event_date'><strong>Date:</strong></label>
            <input type='text' id='event_date' defaultValue={this.props.event.event_date} />
          </div>

          <div>
            <label htmlFor='title'><strong>Title:</strong></label>
            <textarea cols='30' rows='10' id='title' defaultValue={this.props.event.title} />
          </div>

          <div>
            <label htmlFor='speaker'><strong>Speakers:</strong></label>
            <input type='text' id='speaker' defaultValue={this.props.event.speaker} />
          </div>

          <div>
            <label htmlFor='published'><strong>Hosts:</strong></label>
            <input type='text' id='published' defaultValue={(this.props.event.published) ? 'yes' : 'no'} />
          </div>

          <div className='form-actions'>
            <button type='submit'>Save</button>
            <Link to={`/events/${this.props.event.id}`}>Cancel</Link>

            {fireRedirect && (
              <Redirect to={from || `/events/${this.props.event.id}`} />
            )}
          </div>
        </form>

      </div>
    );
  }
}

EditEvent.propTypes = {
  event: PropTypes.shape().isRequired,
};

export default EditEvent;
