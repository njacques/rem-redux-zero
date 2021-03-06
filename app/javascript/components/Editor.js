/* global sessionStorage, confirm */

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Switch, withRouter } from 'react-router-dom';

import { success } from '../packs/notifications';
import { handleAjaxError, withQueryString } from '../packs/helpers';
import NavBar from './NavBar';
import EventList from './EventList';
import Event from './Event';
import EventForm from './EventForm';
import PropsRoute from './PropsRoute';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: null,
    };

    const token = sessionStorage.getItem('jwt');

    axios.defaults.baseURL = 'http://localhost:3000/api/v1/';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    this.addEvent = this.addEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  componentDidMount() {
    axios.get('events.json')
      .then(response => this.setState({ events: response.data }))
      .catch(handleAjaxError);
  }

  addEvent(newEvent) {
    axios.post('events.json', newEvent)
      .then((response) => {
        success('New event added');

        const savedEvent = response.data;
        const events = [...this.state.events, savedEvent];

        // Needs to come before history.push, as we are redirecting to new event
        this.setState({ events });
        this.props.history.push(withQueryString(`/events/${savedEvent.id}`));
      })
      .catch(handleAjaxError);
  }

  updateEvent(updatedEvent) {
    axios.put(`events/${updatedEvent.id}.json`, updatedEvent)
      .then(() => {
        success('Event updated');

        const events = [...this.state.events];
        const idx = events.findIndex(event => event.id === updatedEvent.id);
        events[idx] = updatedEvent;

        this.props.history.push(withQueryString(`/events/${updatedEvent.id}`));
        this.setState({ events });
      })
      .catch(handleAjaxError);
  }

  deleteEvent(eventId) {
    const sure = confirm('Are you sure?');
    if (sure) {
      axios.delete(`events/${eventId}.json`)
        .then((response) => {
          if (response.status === 204) {
            success('Event deleted successfully');

            this.props.history.push(withQueryString('/events'));

            const events = this.state.events.filter(event => event.id !== eventId);
            this.setState({ events });
          }
        })
        .catch(handleAjaxError);
    }
  }

  render() {
    if (this.state.events === null) return null;

    const eventId = this.props.match.params.id;
    const event = this.state.events.find(e => e.id === Number(eventId));

    return (
      <div>
        <NavBar />

        <EventList
          events={this.state.events}
          activeId={Number(eventId)}
          location={this.props.location}
        />

        <div className='event-container'>
          <Switch>
            <PropsRoute
              path='/events/new'
              component={EventForm}
              onSubmit={this.addEvent}
            />

            <PropsRoute
              exact
              path='/events/:id/edit'
              component={EventForm}
              event={event}
              onSubmit={this.updateEvent}
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
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

Editor.defaultProps = {
  match: undefined,
};

export default withRouter(Editor);
