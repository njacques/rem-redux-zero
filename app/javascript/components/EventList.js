import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const EventList = props => (
  <section>
    <div className='events-container'>
      <h2>
        Events
        <Link to='/new'>New Event</Link>
      </h2>

      <input className='search' placeholder='Search' type='text' />

      <ul className='events-list'>
        {
          props.events.map(event => (
            <li
              key={event.id}
              className={(props.activeItem === event.id) ? 'active' : ''}
            >
              <Link to={`/events/${event.id}`}>
                {event.event_date} - {event.event_type}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  </section>
);

EventList.propTypes = {
  activeItem: PropTypes.number,
  events: PropTypes.arrayOf(PropTypes.object),
};

EventList.defaultProps = {
  activeItem: undefined,
  events: [],
};

export default EventList;
