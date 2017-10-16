import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Event = ({ event }) => (
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

Event.propTypes = {
  event: PropTypes.shape().isRequired,
};

export default Event;
