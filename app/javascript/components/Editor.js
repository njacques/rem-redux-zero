import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Switch, Route, Link, withRouter } from 'react-router-dom';

import NavBar from './NavBar';
import Event from './Event';
import NewEvent from './NewEvent';
import EditEvent from './EditEvent';
import PropsRoute from './PropsRoute';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
      activeItem: 0,
    };
  }

  componentWillMount() {
    this.setActiveItem();
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/v1/events.json')
      .then((response) => {
        this.setState({ events: response.data });
      })
      .catch(error => console.log(error));
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.setActiveItem();
  }

  setActiveItem() {
    const path = this.props.location.pathname;

    if (path.match(/^\/events/)) {
      const rx = /\/events\/(\d+)(\/.*?)?/;
      const item = Number(rx.exec(this.props.location.pathname)[1]);
      this.setState({ activeItem: item });
    } else {
      this.setState({ activeItem: 0 });
    }
  }

  render() {
    if (this.state.events === null) return null;

    return (

      <div>
        <NavBar />

        <section>
          <div className='events-container'>
            <h2>
              Events
              <Link to='/new'>New Event</Link>
            </h2>

            <input className='search' placeholder='Search' type='text' />

            <ul className='events-list'>
              {
                this.state.events.map(event => (
                  <li
                    key={event.id}
                    className={(this.state.activeItem === event.id) ? 'active' : ''}
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
        <div className='event-container'>
          <Switch>
            <Route path='/new' component={NewEvent} />
            <PropsRoute
              path='/events/:id/edit'
              component={EditEvent}
              events={this.state.events}
            />

            <PropsRoute
              path='/events/:id'
              component={Event}
              events={this.state.events}
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
