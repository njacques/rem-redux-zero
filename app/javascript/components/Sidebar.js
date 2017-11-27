import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import YearFilter from './YearFilter';
import EventList from './EventList';

const Sidebar = props => (
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
        onKeyUp={e => props.setSearchTerm(e.target.value)}
      />

      <YearFilter
        years={props.availableYears}
        selectedYear={props.selectedYear}
      />

      <EventList events={props.events} activeId={props.activeId} />
    </div>
  </section>
);

Sidebar.propTypes = {
  activeId: PropTypes.number,
  events: PropTypes.arrayOf(PropTypes.object),
  availableYears: PropTypes.arrayOf(PropTypes.string),
  selectedYear: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  activeId: undefined,
  events: [],
  availableYears: [],
};

export default Sidebar;
