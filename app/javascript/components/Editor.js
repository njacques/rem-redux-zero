/* global confirm */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, withRouter } from 'react-router-dom';
import { connect } from 'redux-zero/react';

import actions from '../actions';
import NavBar from './NavBar';
import FilteredEventList from './FilteredEventList';
import Event from './Event';
import EventForm from './EventForm';
import PropsRoute from './PropsRoute';

const mapToProps = ({ events, currentUser }) => ({ events, currentUser });

class Editor extends React.Component {
  constructor(props) {
    super(props);

    props.fetchEvents();

    this.deleteEvent = this.deleteEvent.bind(this);
  }

  deleteEvent(eventId) {
    const sure = confirm('Are you sure?');
    if (sure) {
      this.props.deleteEvent(eventId);
    }
  }

  render() {
    if (this.props.events === null) return null;

    const eventId = this.props.match.params.id;
    const event = this.props.events.find(e => e.id === Number(eventId));

    return (
      <div>
        <NavBar currentUser={this.props.currentUser} />

        <FilteredEventList activeId={Number(eventId)} />

        <div className='event-container'>
          <Switch>
            <PropsRoute
              path='/events/new'
              component={EventForm}
              onSubmit={this.props.addEvent}
            />

            <PropsRoute
              exact
              path='/events/:id/edit'
              component={EventForm}
              event={event}
              onSubmit={this.props.updateEvent}
            />

            <PropsRoute
              path='/events/:id'
              component={Event}
              event={event}
              onDelete={this.deleteEvent}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  location: PropTypes.shape().isRequired,
  match: PropTypes.shape(),
  events: PropTypes.arrayOf(PropTypes.shape()),
  fetchEvents: PropTypes.func.isRequired,
  addEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

Editor.defaultProps = {
  match: undefined,
  events: [],
};

export default connect(mapToProps, actions)(withRouter(Editor));
