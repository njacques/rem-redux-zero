import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: 0,
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

  render() {
    const event = this.props.events[this.state.eventId - 1];

    return (
      <div>
        <h2>
          {event.event_date} - {event.event_type}
          <Link to={`/events/${event.id}/edit`}>Edit</Link>
        </h2>

        <ul>
          <li><strong>Type:</strong> {event.event_type}</li>
          <li><strong>Date:</strong> {event.event_date}</li>
          <li><strong>Title:</strong> {event.event_type}</li>
          <li><strong>Speaker:</strong> {event.title}</li>
          <li><strong>Host:</strong> {event.speaker}</li>
          <li><strong>Published:</strong> {(event.published) ? 'yes' : 'no'}</li>
        </ul>
      </div>
    );
  }
}

Event.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape).isRequired,
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape(),
};

Event.defaultProps = {
  location: undefined,
};

export default Event;
