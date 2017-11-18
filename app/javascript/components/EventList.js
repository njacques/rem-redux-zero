import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import YearFilter from './YearFilter';
import {
  unique,
  getEventYear,
  getSelectedYear,
  withQueryString,
} from '../packs/helpers';

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

  matchSearchTerm(obj) {
    const {
      id,
      published,
      created_at,
      updated_at,
      ...rest } = obj;

    return Object.values(rest).some(value => (
      value.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) > -1
    ));
  }

  matchYear(el) {
    const year = getSelectedYear(this.props.location.search);
    return getEventYear(el).match(year);
  }

  renderEvents() {
    const events = this.props.events
      .filter(el => this.matchYear(el))
      .filter(el => this.matchSearchTerm(el))
      .sort((a, b) => (new Date(b.event_date) - new Date(a.event_date)));

    if (events.length === 0) {
      return (
        <li className='no-results'>No events found!</li>
      );
    }

    return (
      events.map(event => (
        <li
          key={event.id}
          className={(this.props.activeId === event.id) ? 'active' : ''}
        >
          <Link to={withQueryString(`/events/${event.id}`)}>
            {event.event_date} - {event.event_type}
          </Link>
        </li>
      ))
    );
  }

  render() {
    const availableYears = Object.values(this.props.events)
      .map(event => getEventYear(event))
      .filter(unique)
      .reverse();

    return (
      <section>
        <div className='events-container'>
          <h2>
            Events
            <Link to={withQueryString('/events/new')}>New Event</Link>
          </h2>

          <input
            className='search'
            placeholder='Search'
            type='text'
            ref={(input) => { this.searchInput = input; }}
            onKeyUp={this.filterEvents}
          />

          <YearFilter
            years={availableYears}
            selectedYear={getSelectedYear(this.props.location.search)}
          />

          <ul className='events-list'>
            {this.renderEvents()}
          </ul>
        </div>
      </section>
    );
  }
}

EventList.propTypes = {
  activeId: PropTypes.number,
  events: PropTypes.arrayOf(PropTypes.object),
  location: PropTypes.shape().isRequired,
};

EventList.defaultProps = {
  activeId: undefined,
  events: [],
};

export default EventList;
