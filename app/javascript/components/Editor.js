/* global sessionStorage */

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Switch, withRouter } from 'react-router-dom';

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
  }

  componentDidMount() {
    axios.get('events.json')
      .then(response => this.setState({ events: response.data }))
      .catch(error => console.log(error));
  }

  addEvent(newEvent) {
    axios.post('events.json', newEvent)
      .then((response) => {
        const savedEvent = response.data;
        const events = [...this.state.events, savedEvent];
        this.setState({ events });

        this.props.history.push(`/events/${savedEvent.id}`);
      })
      .catch(error => console.log(error));
  }

  updateEvent(updatedEvent) {
    axios.put(`events/${updatedEvent.id}.json`, updatedEvent)
      .then(() => {
        const events = [...this.state.events];
        const idx = events.findIndex(event => event.id === updatedEvent.id);
        events[idx] = updatedEvent;

        this.setState({ events });

        this.props.history.push(`/events/${updatedEvent.id}`);
      })
      .catch(error => console.log(error));
  }

  render() {
    if (this.state.events === null) return null;

    const eventId = this.props.match.params.id;
    const event = this.state.events[eventId - 1];

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
