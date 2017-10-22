import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';

import NavBar from './NavBar';
import EventList from './EventList';
import Event from './Event';
import NewEvent from './NewEvent';
import EditEvent from './EditEvent';
import EventForm from './EventForm';
import PropsRoute from './PropsRoute';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: null,
    };

    this.saveEvent = this.saveEvent.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/v1/events.json')
      .then(response => this.setState({ events: response.data }))
      .catch(error => console.log(error));
  }

  saveEvent(updatedEvent) {
    console.log('saveEvent called', updatedEvent);

    const events = [...this.state.events];
    events[updatedEvent.id - 1] = updatedEvent;
    this.setState({ events });

    this.props.history.push(`/events/${updatedEvent.id}`);
  }

  render() {
    if (this.state.events === null) return null;

    const eventId = this.props.match.params.id;
    const event = this.state.events[eventId - 1];

    return (
      <div>
        <NavBar />

        <EventList events={this.state.events} activeId={Number(eventId)} />

        <div className='event-container'>
          <Switch>
            <PropsRoute
              path='/events/new'
              component={EventForm}
              onSubmit={this.saveEvent}
            />

            <PropsRoute
              exact
              path='/events/:id/edit'
              component={EventForm}
              event={event}
              onSubmit={this.saveEvent}
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
  match: PropTypes.shape(),
};

Editor.defaultProps = {
  match: undefined,
};

export default withRouter(Editor);
