import { connect } from 'redux-zero/react';

import { getEventsByYear, getAvailableYears } from '../packs/helpers';
import actions from '../actions';
import Sidebar from './Sidebar';

const mapToProps = ({ events, selectedYear, searchTerm }) => ({
  events: getEventsByYear(events, selectedYear, searchTerm),
  availableYears: getAvailableYears(events),
  selectedYear,
  searchTerm,
});

export default connect(mapToProps, actions)(Sidebar);
