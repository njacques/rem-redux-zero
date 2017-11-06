import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Event = ({ event, deleteHandler, location }) => (
  <div>
    <h2>
      {event.event_date} - {event.event_type}
      <Link to={`/events/${event.id}/edit`}>Edit</Link>

      <Link
        to={{
          pathname: '/events',
          search: location.search,
        }}
        onClick={e => deleteHandler(e, event.id)}
      >
        Delete
      </Link>
    </h2>

    <ul>
      <li><strong>Type:</strong> {event.event_type}</li>
      <li><strong>Date:</strong> {event.event_date}</li>
      <li><strong>Title:</strong> {event.title}</li>
      <li><strong>Speaker:</strong> {event.speaker}</li>
      <li><strong>Host:</strong> {event.host}</li>
      <li><strong>Published:</strong> {(event.published) ? 'yes' : 'no'}</li>
    </ul>
  </div>
);

Event.propTypes = {
  event: PropTypes.shape().isRequired,
  deleteHandler: PropTypes.func.isRequired,
  location: PropTypes.shape(),
};

Event.defaultProps = {
  location: undefined,
};

export default Event;
