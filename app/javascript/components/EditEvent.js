import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fireRedirect: false,
      eventId: null,
    };
  }

  componentWillMount() {
    this.setState({ eventId: this.props.match.params.id });
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.setState({ eventId: this.props.match.params.id });
  }

  handleLogin(e) {
    e.preventDefault();
    console.log('Saving ... not! 👽👽👽');

    // Save logic here
    this.setState({ fireRedirect: true });
  }

  render() {
    const { from } = this.props.location.state || '/';
    const { fireRedirect } = this.state;
    const event = this.props.events[this.state.eventId - 1];

    return (
      <div>
        <h2>
          {event.event_date} - {event.event_type}
        </h2>

        <form onSubmit={this.handleLogin}>
          <div>
            <label htmlFor='event_type'><strong>Type:</strong></label>
            <input type='text' id='event_type' defaultValue={event.event_type} />
          </div>

          <div>
            <label htmlFor='event_date'><strong>Date:</strong></label>
            <input type='text' id='event_date' defaultValue={event.event_date} />
          </div>

          <div>
            <label htmlFor='title'><strong>Title:</strong></label>
            <textarea cols='30' rows='10' id='title' defaultValue={event.title} />
          </div>

          <div>
            <label htmlFor='speaker'><strong>Speakers:</strong></label>
            <input type='text' id='speaker' defaultValue={event.speaker} />
          </div>

          <div>
            <label htmlFor='published'><strong>Hosts:</strong></label>
            <input type='text' id='published' defaultValue={(event.published) ? 'yes' : 'no'} />
          </div>

          <div className='form-actions'>
            <button type='submit'>Save</button>
            <Link to={`/events/${event.id}`}>Cancel</Link>

            {fireRedirect && (
              <Redirect to={from || `/events/${event.id}`} />
            )}
          </div>
        </form>
      </div>
    );
  }
}

EditEvent.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape).isRequired,
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape(),
};

EditEvent.defaultProps = {
  location: undefined,
};

export default EditEvent;
