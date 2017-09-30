import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Event = props => (
  <div>
    <h2>
      {props.event.event_date} - {props.event.event_type}
      <Link to={`/events/${props.event.id}/edit`}>Edit</Link>
    </h2>

    <ul>
      <li><strong>Type:</strong> {props.event.event_type}</li>
      <li><strong>Date:</strong> {props.event.event_date}</li>
      <li><strong>Title:</strong> {props.event.event_type}</li>
      <li><strong>Speaker:</strong> {props.event.title}</li>
      <li><strong>Host:</strong> {props.event.speaker}</li>
      <li><strong>Published:</strong> {(props.event.published) ? 'yes' : 'no'}</li>
    </ul>
  </div>
);
Event.propTypes = {
  event: PropTypes.shape().isRequired,
};

export default Event;
