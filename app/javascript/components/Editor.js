import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

import NavBar from './NavBar';
import Event from './Event';
import NewEvent from './NewEvent';
import PropsRoute from './PropsRoute';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      activeItem: null,
    };

    this.toggleActiveItem = this.toggleActiveItem.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/v1/events.json')
      .then((response) => {
        this.setState({ events: response.data });

        // When refreshing the page we need to repopulate activeItem, as otherwise
        // no event prop will be passed to the Event component.
        if (this.state.activeItem === null) {
          const activeItem = Number(this.props.location.pathname.replace('/events/', ''));
          this.setState({ activeItem });
        }
      })
      .catch(error => console.log(error));
  }

  toggleActiveItem(event) {
    this.setState({
      activeItem: event.id,
    });
  }

  render() {
    if (this.state.activeItem === null) return null;

    return (

      <div>
        <NavBar
          currentUser={this.props.currentUser}
          logoutHandler={this.props.logoutHandler}
          activeItemHandler={this.toggleActiveItem}
        />

        <section>
          <div className='events-container'>
            <h2>
              Events
              <Link
                to='/new'
                onClick={() => this.toggleActiveItem(0)}
              >
                New Event
              </Link>
            </h2>

            <input className='search' placeholder='Search' type='text' />

            <ul className='events-list'>
              {
                this.state.events.map(event => (
                  <li
                    key={event.id}
                    className={(this.state.activeItem === event.id) ? 'active' : ''}
                  >
                    <Link
                      to={`/events/${event.id}`}
                      tabIndex='0'
                      onClick={() => this.toggleActiveItem(event)}
                    >
                      {event.event_date} - {event.event_type}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
        </section>
        <div className='event-container'>
          <Route path='/new' component={NewEvent} />
          <PropsRoute
            path='/events/:id'
            component={Event}
            event={this.state.events[this.state.activeItem - 1]}
          />
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  logoutHandler: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired,
  location: PropTypes.shape(),
};

Editor.defaultProps = {
  location: undefined,
};

export default Editor;
