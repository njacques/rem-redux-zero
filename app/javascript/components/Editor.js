import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Switch, Route, Link, withRouter } from 'react-router-dom';

import NavBar from './NavBar';
import EventList from './EventList';
import Event from './Event';
import NewEvent from './NewEvent';
import EditEvent from './EditEvent';
import PropsRoute from './PropsRoute';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/v1/events.json')
      .then(response => this.setState({ events: response.data }))
      .catch(error => console.log(error));
  }

  render() {
    if (this.state.events === null) return null;

    const event = this.state.events[this.props.match.params.id];

    return (
      <div>
        <NavBar />

        <PropsRoute
          path='/events/:id?'
          component={EventList}
          events={this.state.events}
        />

        <div className='event-container'>
          <Switch>
            <Route path='/events/new' component={NewEvent} />

            <PropsRoute
              exact
              path='/events/:id/edit'
              component={EditEvent}
              event={event}
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
  location: PropTypes.shape(),
};

Editor.defaultProps = {
  location: undefined,
};

export default withRouter(Editor);
