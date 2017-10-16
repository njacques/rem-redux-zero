import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };

    this.filterEvents = this.filterEvents.bind(this);
  }

  filterEvents() {
    this.setState({ searchTerm: this.searchInput.value });
  }

  match(obj) {
    const {
      id,
      host_multiple,
      speaker_multiple,
      published,
      created_at,
      updated_at,
      ...rest } = obj;

    return Object.values(rest).some(value => (
      value.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) > -1
    ));
  }

  render() {
    const events = this.props.events.filter(el => this.match(el));

    return (
      <section>
        <div className='events-container'>
          <h2>
            Events
            <Link to='/events/new'>New Event</Link>
          </h2>

          <input
            className='search'
            placeholder='Search'
            type='text'
            ref={(input) => { this.searchInput = input; }}
            onKeyUp={this.filterEvents}
          />

          <ul className='events-list'>
            {
              events.map(event => (
                <li
                  key={event.id}
                  className={(this.props.activeId === event.id) ? 'active' : ''}
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
  }
}

EventList.propTypes = {
  activeId: PropTypes.number,
  events: PropTypes.arrayOf(PropTypes.object),
};

EventList.defaultProps = {
  activeId: undefined,
  events: [],
};

export default EventList;
