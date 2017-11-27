import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withQueryString } from '../packs/helpers';

const EventList = ({ events, activeId }) => {
  const content =
    events.length === 0 ? (
      <li className='no-results'>No events found!</li>
    ) : (
      events.map(event => (
        <li
          key={event.id}
          className={activeId === event.id ? 'active' : ''}
        >
          <Link to={withQueryString(`/events/${event.id}`)}>
            {event.event_date} - {event.event_type}
          </Link>
        </li>
      ))
    );

  return <ul className='events-list'>{content}</ul>;
};

EventList.propTypes = {
  activeId: PropTypes.number,
  events: PropTypes.arrayOf(PropTypes.object),
};

EventList.defaultProps = {
  activeId: undefined,
  events: [],
};

export default EventList;
