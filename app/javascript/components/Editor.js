/* global sessionStorage, confirm */

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Switch, withRouter } from 'react-router-dom';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

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
    this.deleteHandler = this.deleteHandler.bind(this);
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

  deleteHandler(e, eventId) {
    const sure = confirm('Are you sure?');
    if (sure) {
      const endPoint = `http://localhost:3000/api/v1/events/${eventId}.json`;
      const token = sessionStorage.getItem('jwt');

      axios.delete(endPoint, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status === 204) {
            Alert.success('Event deleted successfully', {
              position: 'top-right',
              effect: 'slide',
              timeout: 3500,
              offset: 45,
            });
            const events = this.state.events.filter(event => event.id !== eventId);
            this.setState({ events });
          }
        })
        .catch((error) => {
          Alert.error('Something went wrong', {
            position: 'top-right',
            effect: 'slide',
            timeout: 3500,
            offset: 45,
          });

          console.log(error);
        });
    } else {
      e.preventDefault();
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
              deleteHandler={this.deleteHandler}
              location={this.props.location}
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
